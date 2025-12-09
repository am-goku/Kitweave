import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const variantUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    code: z.string().min(1).optional(),
    props: z.record(z.any(), z.any()).optional(),
    isDefault: z.boolean().optional(),
});

// PATCH update a variant
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string; variantId: string }> }
) {
    const { id, variantId } = await params;
    const body = await req.json();

    try {
        const data = variantUpdateSchema.parse(body);

        // If setting as default, unset other defaults
        if (data.isDefault) {
            await prisma.componentVariant.updateMany({
                where: { componentId: id, isDefault: true, id: { not: variantId } },
                data: { isDefault: false },
            });
        }

        const variant = await prisma.componentVariant.update({
            where: { id: variantId },
            data,
        });

        return NextResponse.json(variant);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to update variant' }, { status: 500 });
    }
}

// DELETE a variant
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ variantId: string }> }
) {
    const { variantId } = await params;

    try {
        await prisma.componentVariant.delete({
            where: { id: variantId },
        });

        return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete variant' }, { status: 500 });
    }
}
