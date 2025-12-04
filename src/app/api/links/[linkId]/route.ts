import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ linkId: string }> }
) {
  try {
    const { linkId } = await params

    const link = await prisma.links.findUnique({
      where: { id: linkId },
    })

    if (!link) {
      return new NextResponse('Link type not found', { status: 404 })
    }

    return NextResponse.json({
      id: link.id,
      name: link.name,
    })
  } catch (err) {
    console.error('Error fetching link type:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ linkId: string }> }
) {
  try {
    const { linkId } = await params
    const body = await req.json()
    const { name } = body

    if (!name) {
      return new NextResponse('name is required', { status: 400 })
    }

    // Check if link exists
    const existing = await prisma.links.findUnique({
      where: { id: linkId },
    })
    if (!existing) {
      return new NextResponse('Link type not found', { status: 404 })
    }

    // Check if name is already taken by another link
    const duplicate = await prisma.links.findFirst({
      where: {
        name,
        id: { not: linkId },
      },
    })
    if (duplicate) {
      return new NextResponse('Link type name already exists', { status: 400 })
    }

    const updated = await prisma.links.update({
      where: { id: linkId },
      data: { name },
    })

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
    })
  } catch (err) {
    console.error('Error updating link type:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ linkId: string }> }
) {
  try {
    const { linkId } = await params

    // Check if link exists
    const existing = await prisma.links.findUnique({
      where: { id: linkId },
    })
    if (!existing) {
      return new NextResponse('Link type not found', { status: 404 })
    }

    // Delete link (cascade will remove project_links entries)
    await prisma.links.delete({
      where: { id: linkId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('Error deleting link type:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
