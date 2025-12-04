import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ projectId: string; tagId: string }> }
) {
  try {
    const { projectId, tagId } = await params

    // Verify project_tag exists and belongs to this project
    const projectTag = await prisma.project_tags.findFirst({
      where: {
        id: tagId,
        project_id: projectId,
      },
    })

    if (!projectTag) {
      return new NextResponse('Project tag not found', { status: 404 })
    }

    await prisma.project_tags.delete({
      where: { id: tagId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('Error removing tag from project:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
