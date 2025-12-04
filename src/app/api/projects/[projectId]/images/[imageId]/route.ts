import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ projectId: string; imageId: string }> }
) {
  try {
    const { projectId, imageId } = await params

    // Verify image belongs to this project
    const image = await prisma.images.findFirst({
      where: {
        id: imageId,
        project_id: projectId,
      },
    })

    if (!image) {
      return new NextResponse('Image not found', { status: 404 })
    }

    // In production, also delete from GCS here

    await prisma.images.delete({
      where: { id: imageId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('Error deleting image:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
