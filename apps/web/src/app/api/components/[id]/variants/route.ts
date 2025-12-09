import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const variantSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    code: z.string().min(1),
    props: z.record(z.any(), z.any()).optional(),
    isDefault: z.boolean().optional(),
});

// GET all variants for a component
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const variants = await prisma.componentVariant.findMany({
        where: { componentId: id },
        orderBy: [
            { isDefault: 'desc' },
            { createdAt: 'asc' },
        ],
    });

    return NextResponse.json(variants);
}

// POST create a new variant
export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json();

    try {
        const data = variantSchema.parse(body);

        // If this is set as default, unset other defaults
        if (data.isDefault) {
            await prisma.componentVariant.updateMany({
                where: { componentId: id, isDefault: true },
                data: { isDefault: false },
            });
        }

        const variant = await prisma.componentVariant.create({
            data: {
                ...data,
                componentId: id,
                props: data.props,
            },
        });

        return NextResponse.json(variant);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create variant' }, { status: 500 });
    }
}
