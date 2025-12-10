import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { redis } from '@/lib/redis';
import { z } from 'zod';

const verifySchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, otp } = verifySchema.parse(body);

        // Get OTP from Redis
        const storedOtp = await redis.get(`otp:signup:${email}`);

        if (!storedOtp) {
            return NextResponse.json(
                { error: 'OTP expired or invalid' },
                { status: 400 }
            );
        }

        if (storedOtp !== otp) {
            return NextResponse.json(
                { error: 'Invalid OTP code' },
                { status: 400 }
            );
        }

        // Mark user as verified
        await prisma.user.update({
            where: { email },
            data: { emailVerified: true },
        });

        // Delete OTP from Redis
        await redis.del(`otp:signup:${email}`);

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        console.error('Verify error:', error);
        return NextResponse.json(
            { error: 'Verification failed' },
            { status: 500 }
        );
    }
}
