import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getFileUrl, uploadFile } from '@/app/helpers/supabaseStorage'

export async function GET() {
  try {
    const projects = await prisma.projects.findMany({
      include: {
        images: true,
        tags: { include: { tag: true } },
        links: { include: { link: true } },
      },
      orderBy: { year: 'desc' },
    })

    const result = projects.map((p: any) => ({
      id: p.id,
      name: p.name,
      year: p.year,
      description: p.description,
      project_logo_url: p.project_logo_url,
      created_at: p.created_at,
      updated_at: p.updated_at,
      images: p.images.map((img: any) => ({ 
        id: img.id, 
        image_url: img.image_url 
      })),
      tags: p.tags.map((pt: any) => ({ 
        id: pt.tag.id, 
        name: pt.tag.name 
      })),
      links: p.links.map((pl: any) => ({ 
        id: pl.link.id, 
        name: pl.link.name, 
        url: pl.url 
      })),
    }))

    return NextResponse.json(result)
  } catch (err) {
    console.error('Error fetching projects:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = formData.get('name')?.toString() || ''
    const yearRaw = formData.get('year')?.toString() || ''
    const description = formData.get('description')?.toString() || null

    if (!name || !yearRaw) {
      return new NextResponse('Missing required fields (name, year)', { status: 400 })
    }

    const year = parseInt(yearRaw, 10)
    if (isNaN(year)) {
      return new NextResponse('Year must be a number', { status: 400 })
    }

    // Get all images from formData
    const imageFiles = formData.getAll('images') as File[]

    const project = await prisma.projects.create({
      data: {
        name,
        year,
        description,
      },
      include: {
        images: true,
      },
    })
    
    const imageUrls: string[] = []
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        await uploadFile(file, `projects/${project.id}/${file.name}`);
        const publicUrl = await getFileUrl(`projects/${project.id}/${file.name}`);
        imageUrls.push(publicUrl);
      }
    }

    const projectLogoUrl = formData.get('project_logo') as File | null
    if (projectLogoUrl && projectLogoUrl.size > 0) {
      await uploadFile(projectLogoUrl, `projects/${project.id}/logo-${projectLogoUrl.name}`);
      const logoUrl = await getFileUrl(`projects/${project.id}/logo-${projectLogoUrl.name}`);
      // update project with logo url
      await prisma.projects.update({
        where: { id: project.id },
        data: { project_logo_url: logoUrl },
      })
    }

    // update project with images
    await prisma.projects.update({
      where: { id: project.id },
      data: {
        images: {
          create: imageUrls.map((url) => ({ image_url: url })),
        },
      },
    })

    return NextResponse.json(project)
  } catch (err) {
    console.error('Error creating project:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
