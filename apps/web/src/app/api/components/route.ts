import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// Schema for component creation
const componentSchema = z.object({
  name: z.string().min(3),
  code: z.string().min(10),
  description: z.string().optional(),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const tagsParam = searchParams.get("tags");
    const tags = tagsParam ? tagsParam.split(",") : [];

    const where: Prisma.ComponentWhereInput = {
      isPublic: true,
    };

    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { code: { contains: query, mode: "insensitive" } },
      ];
    }

    if (tags.length > 0) {
      where.tags = {
        hasSome: tags,
      };
    }

    const components = await prisma.component.findMany({
      where,
      take: 50,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(components);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to fetch components" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // mock user ID from session (replace with actual auth)
    const userId = "temp-user-id"; 
    
    const body = await req.json();
    const data = componentSchema.parse(body);

    const component = await prisma.component.create({
      data: {
        ...data,
        userId,
      },
    });

    return NextResponse.json(component);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
