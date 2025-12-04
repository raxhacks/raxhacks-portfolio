import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ experienceId: string }> }
) {
  try {
    const { experienceId } = await params
    const experience = await prisma.experiences.findUnique({
      where: { id: experienceId },
    })

    if (!experience) {
      return new NextResponse('Experience not found', { status: 404 })
    }

    return NextResponse.json(experience)
  } catch (err) {
    console.error('Error fetching experience:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ experienceId: string }> }
) {
  try {
    const { experienceId } = await params
    const formData = await req.formData()
    
    const company_name = formData.get('company_name')?.toString()
    const role = formData.get('role')?.toString()
    const description = formData.get('description')?.toString() || null
    const start_date_raw = formData.get('start_date')?.toString()
    const end_date_raw = formData.get('end_date')?.toString()
    const company_logo_url = formData.get('company_logo_url')?.toString() || null

    if (!company_name || !role || !start_date_raw) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const start_date = new Date(start_date_raw)
    const end_date = end_date_raw ? new Date(end_date_raw) : null

    const updated = await prisma.experiences.update({
      where: { id: experienceId },
      data: {
        company_name,
        role,
        description,
        start_date,
        end_date,
        company_logo_url,
      },
    })

    return NextResponse.json(updated)
  } catch (err) {
    console.error('Error updating experience:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ experienceId: string }> }
) {
  try {
    const { experienceId } = await params
    await prisma.experiences.delete({
      where: { id: experienceId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('Error deleting experience:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
