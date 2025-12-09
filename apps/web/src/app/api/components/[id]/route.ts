import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const component = await prisma.component.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!component) {
            return NextResponse.json({ error: 'Component not found' }, { status: 404 });
        }

        return NextResponse.json(component);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch component' }, { status: 500 });
    }
}
