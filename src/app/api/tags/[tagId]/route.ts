import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ tagId: string }> }
) {
  try {
    const { tagId } = await params

    const tag = await prisma.tags.findUnique({
      where: { id: tagId },
    })

    if (!tag) {
      return new NextResponse('Tag not found', { status: 404 })
    }

    return NextResponse.json({
      id: tag.id,
      name: tag.name,
    })
  } catch (err) {
    console.error('Error fetching tag:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ tagId: string }> }
) {
  try {
    const { tagId } = await params
    const body = await req.json()
    const { name } = body

    if (!name) {
      return new NextResponse('name is required', { status: 400 })
    }

    // Check if tag exists
    const existing = await prisma.tags.findUnique({
      where: { id: tagId },
    })
    if (!existing) {
      return new NextResponse('Tag not found', { status: 404 })
    }

    // Check if name is already taken by another tag
    const duplicate = await prisma.tags.findFirst({
      where: {
        name,
        id: { not: tagId },
      },
    })
    if (duplicate) {
      return new NextResponse('Tag name already exists', { status: 400 })
    }

    const updated = await prisma.tags.update({
      where: { id: tagId },
      data: { name },
    })

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
    })
  } catch (err) {
    console.error('Error updating tag:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ tagId: string }> }
) {
  try {
    const { tagId } = await params

    // Check if tag exists
    const existing = await prisma.tags.findUnique({
      where: { id: tagId },
    })
    if (!existing) {
      return new NextResponse('Tag not found', { status: 404 })
    }

    // Delete tag (cascade will remove project_tags entries)
    await prisma.tags.delete({
      where: { id: tagId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('Error deleting tag:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
