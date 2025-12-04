import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const links = await prisma.links.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(links.map((l) => ({
      id: l.id,
      name: l.name,
    })))
  } catch (err) {
    console.error('Error fetching links:', err)
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
    const existing = await prisma.links.findUnique({
      where: { name },
    })
    if (existing) {
      return new NextResponse('Link type already exists', { status: 400 })
    }

    const created = await prisma.links.create({
      data: { name },
    })

    return NextResponse.json({
      id: created.id,
      name: created.name,
    })
  } catch (err) {
    console.error('Error creating link type:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
