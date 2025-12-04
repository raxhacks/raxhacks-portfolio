import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getFileUrl, uploadFile } from '@/app/helpers/supabaseStorage'

export async function GET() {
  try {
    const experiences = await prisma.experiences.findMany({
      orderBy: { start_date: 'desc' },
    })

    return NextResponse.json(experiences)
  } catch (err) {
    console.error('Error fetching experiences:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const company_name = formData.get('company_name')?.toString() || ''
    const role = formData.get('role')?.toString() || ''
    const description = formData.get('description')?.toString() || null
    const start_date_raw = formData.get('start_date')?.toString() || null
    const end_date_raw = formData.get('end_date')?.toString() || null

    // validate required
    if (!company_name || !role || !start_date_raw) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const start_date = new Date(start_date_raw)
    const end_date = end_date_raw ? new Date(end_date_raw) : null

    let company_logo_url: string | null = null

    const file = formData.get('company_logo') as File | null
    if (file && file.size > 0) {
      const filename = file.name || ''
      if (!filename.toLowerCase().endsWith('.svg') && file.type !== 'image/svg+xml') {
        return new NextResponse('Only SVG files are allowed', { status: 400 })
      }
      await uploadFile(file, `experiences/logos/${filename}`);
      const fileUrl = await getFileUrl(`experiences/logos/${filename}`);
      company_logo_url = fileUrl;
    }

    const created = await prisma.experiences.create({
      data: {
        company_logo_url,
        company_name,
        start_date,
        end_date,
        role,
        description,
      },
    })

    return NextResponse.json(created)
  } catch (err) {
    console.error('Error creating experience:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
