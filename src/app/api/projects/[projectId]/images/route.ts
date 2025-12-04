import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getFileUrl, uploadFile } from '@/app/helpers/supabaseStorage'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params

    const images = await prisma.images.findMany({
      where: { project_id: projectId },
      orderBy: { created_at: 'asc' },
    })

    return NextResponse.json(images.map((img) => ({
      id: img.id,
      image_url: img.image_url,
    })))
  } catch (err) {
    console.error('Error fetching project images:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params

    // Check project exists
    const project = await prisma.projects.findUnique({
      where: { id: projectId },
    })
    if (!project) {
      return new NextResponse('Project not found', { status: 404 })
    }

    const formData = await req.formData()
    const imageFiles = formData.getAll('images') as File[]

    if (imageFiles.length === 0) {
      return new NextResponse('No images provided', { status: 400 })
    }

    const imageUrls: string[] = []
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        await uploadFile(file, `projects/${projectId}/${file.name}`);
        const publicUrl = await getFileUrl(`projects/${projectId}/${file.name}`);
        imageUrls.push(publicUrl);
      }
    }

    const createdImages = await prisma.images.createManyAndReturn({
      data: imageUrls.map((url) => ({
        project_id: projectId,
        image_url: url,
      })),
    })

    return NextResponse.json(createdImages.map((img) => ({
      id: img.id,
      image_url: img.image_url,
    })))
  } catch (err) {
    console.error('Error uploading project images:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
