import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getFileUrl, uploadFile } from '@/app/helpers/supabaseStorage'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const project = await prisma.projects.findUnique({
      where: { id: projectId },
      include: {
        images: true,
        tags: { include: { tag: true } },
        links: { include: { link: true } },
      },
    })

    if (!project) {
      return new NextResponse('Project not found', { status: 404 })
    }

    const result = {
      id: project.id,
      name: project.name,
      year: project.year,
      description: project.description,
      created_at: project.created_at,
      updated_at: project.updated_at,
      images: project.images.map((img: any) => ({ 
        id: img.id, 
        image_url: img.image_url 
      })),
      tags: project.tags.map((pt: any) => ({ 
        id: pt.tag.id, 
        name: pt.tag.name 
      })),
      links: project.links.map((pl: any) => ({ 
        id: pl.link.id, 
        name: pl.link.name, 
        url: pl.url 
      })),
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('Error fetching project:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const formData = await req.formData()
    
    const name = formData.get('name')?.toString() || ''
    const yearRaw = formData.get('year')?.toString() || ''
    const description = formData.get('description')?.toString() || null

    if (!name || !yearRaw) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const year = parseInt(yearRaw, 10)
    if (isNaN(year)) {
      return new NextResponse('Year must be a number', { status: 400 })
    }

    // Handle project logo upload
    const projectLogoFile = formData.get('project_logo') as File | null
    let projectLogoUrl: string | undefined

    if (projectLogoFile && projectLogoFile.size > 0) {
      await uploadFile(projectLogoFile, `projects/${projectId}/logo-${projectLogoFile.name}`)
      projectLogoUrl = await getFileUrl(`projects/${projectId}/logo-${projectLogoFile.name}`)
    }

    const updated = await prisma.projects.update({
      where: { id: projectId },
      data: {
        name,
        year,
        description,
        ...(projectLogoUrl && { project_logo_url: projectLogoUrl }),
      },
    })

    return NextResponse.json(updated)
  } catch (err) {
    console.error('Error updating project:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    
    // The cascading deletes defined in the schema will handle
    // deleting related images, tags, and links
    await prisma.projects.delete({
      where: { id: projectId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('Error deleting project:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
