import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params

    const projectTags = await prisma.project_tags.findMany({
      where: { project_id: projectId },
      include: { tag: true },
    })

    return NextResponse.json(projectTags.map((pt) => ({
      id: pt.id,
      tag_id: pt.tag_id,
      name: pt.tag.name,
    })))
  } catch (err) {
    console.error('Error fetching project tags:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const body = await req.json()
    const { tag_id } = body

    if (!tag_id) {
      return new NextResponse('tag_id is required', { status: 400 })
    }

    // Check project exists
    const project = await prisma.projects.findUnique({
      where: { id: projectId },
    })
    if (!project) {
      return new NextResponse('Project not found', { status: 404 })
    }

    // Check tag exists
    const tag = await prisma.tags.findUnique({
      where: { id: tag_id },
    })
    if (!tag) {
      return new NextResponse('Tag not found', { status: 404 })
    }

    // Check if already assigned
    const existing = await prisma.project_tags.findFirst({
      where: { project_id: projectId, tag_id },
    })
    if (existing) {
      return new NextResponse('Tag already assigned to project', { status: 400 })
    }

    const created = await prisma.project_tags.create({
      data: {
        project_id: projectId,
        tag_id,
      },
      include: { tag: true },
    })

    return NextResponse.json({
      id: created.id,
      tag_id: created.tag_id,
      name: created.tag.name,
    })
  } catch (err) {
    console.error('Error adding tag to project:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
