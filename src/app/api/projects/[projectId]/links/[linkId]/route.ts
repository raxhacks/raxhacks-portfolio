import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ projectId: string; linkId: string }> }
) {
  try {
    const { projectId, linkId } = await params

    // Verify project_link exists and belongs to this project
    const projectLink = await prisma.project_links.findFirst({
      where: {
        id: linkId,
        project_id: projectId,
      },
    })

    if (!projectLink) {
      return new NextResponse('Project link not found', { status: 404 })
    }

    await prisma.project_links.delete({
      where: { id: linkId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('Error removing link from project:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
