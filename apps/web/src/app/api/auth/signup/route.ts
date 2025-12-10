import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { redis } from '@/lib/redis';
import { sendOTPEmail } from '@/lib/email';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name } = signupSchema.parse(body);

        // Check if user already exists
        const existing = await prisma.user.findUnique({
            where: { email },
        });

        if (existing) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user (unverified)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                emailVerified: false,
            },
        });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP in Redis with 10-minute expiry
        await redis.setex(`otp:signup:${email}`, 600, otp);

        // Send OTP email
        await sendOTPEmail(email, otp, 'signup');

        return NextResponse.json({
            success: true,
            message: 'Verification code sent to your email',
            userId: user.id,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Failed to create account' },
            { status: 500 }
        );
    }
}
