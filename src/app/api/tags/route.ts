import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const tags = await prisma.tags.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(tags.map((t) => ({
      id: t.id,
      name: t.name,
    })))
  } catch (err) {
    console.error('Error fetching tags:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name } = body

    if (!name) {
      return new NextResponse('name is required', { status: 400 })
    }

    // Check if already exists
    const existing = await prisma.tags.findUnique({
      where: { name },
    })
    if (existing) {
      return new NextResponse('Tag already exists', { status: 400 })
    }

    const created = await prisma.tags.create({
      data: { name },
    })

    return NextResponse.json({
      id: created.id,
      name: created.name,
    })
  } catch (err) {
    console.error('Error creating tag:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
