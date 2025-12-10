import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { redis } from '@/lib/redis';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const resetSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    newPassword: z.string().min(8),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, otp, newPassword } = resetSchema.parse(body);

        // Get OTP from Redis
        const storedOtp = await redis.get(`otp:reset:${email}`);

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

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        // Delete OTP from Redis
        await redis.del(`otp:reset:${email}`);

        return NextResponse.json({
            success: true,
            message: 'Password reset successfully',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        console.error('Reset password error:', error);
        return NextResponse.json(
            { error: 'Password reset failed' },
            { status: 500 }
        );
    }
}
