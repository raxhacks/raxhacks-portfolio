import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params

    const projectLinks = await prisma.project_links.findMany({
      where: { project_id: projectId },
      include: { link: true },
    })

    return NextResponse.json(projectLinks.map((pl) => ({
      id: pl.id,
      link_id: pl.link_id,
      name: pl.link.name,
      url: pl.url,
    })))
  } catch (err) {
    console.error('Error fetching project links:', err)
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
    const { link_id, url } = body

    if (!link_id || !url) {
      return new NextResponse('link_id and url are required', { status: 400 })
    }

    // Check project exists
    const project = await prisma.projects.findUnique({
      where: { id: projectId },
    })
    if (!project) {
      return new NextResponse('Project not found', { status: 404 })
    }

    // Check link type exists
    const link = await prisma.links.findUnique({
      where: { id: link_id },
    })
    if (!link) {
      return new NextResponse('Link type not found', { status: 404 })
    }

    // Check if already assigned
    const existing = await prisma.project_links.findFirst({
      where: { project_id: projectId, link_id },
    })
    if (existing) {
      return new NextResponse('Link type already assigned to project', { status: 400 })
    }

    const created = await prisma.project_links.create({
      data: {
        project_id: projectId,
        link_id,
        url,
      },
      include: { link: true },
    })

    return NextResponse.json({
      id: created.id,
      link_id: created.link_id,
      name: created.link.name,
      url: created.url,
    })
  } catch (err) {
    console.error('Error adding link to project:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
