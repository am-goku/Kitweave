import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { redis } from '@/lib/redis';
import { sendOTPEmail } from '@/lib/email';
import { z } from 'zod';

const forgotSchema = z.object({
    email: z.string().email(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = forgotSchema.parse(body);

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Don't reveal if user exists or not (security)
        if (!user) {
            return NextResponse.json({
                success: true,
                message: 'If an account exists, a reset code has been sent',
            });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP in Redis with 10-minute expiry
        await redis.setex(`otp:reset:${email}`, 600, otp);

        // Send OTP email
        await sendOTPEmail(email, otp, 'reset');

        return NextResponse.json({
            success: true,
            message: 'If an account exists, a reset code has been sent',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { error: 'Request failed' },
            { status: 500 }
        );
    }
}
