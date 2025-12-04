import prisma from '../src/lib/db'

async function main() {
  // Create tags
  const tagWeb = await prisma.tags.upsert({
    where: { name: 'web' },
    update: {},
    create: { name: 'web' },
  })

  const tagMobile = await prisma.tags.upsert({
    where: { name: 'mobile' },
    update: {},
    create: { name: 'mobile' },
  })

  const tagReact = await prisma.tags.upsert({
    where: { name: 'react' },
    update: {},
    create: { name: 'react' },
  })

  const tagNextjs = await prisma.tags.upsert({
    where: { name: 'nextjs' },
    update: {},
    create: { name: 'nextjs' },
  })

  // Create links
  const linkGithub = await prisma.links.upsert({
    where: { name: 'github' },
    update: {},
    create: { name: 'github' },
  })

  const linkLive = await prisma.links.upsert({
    where: { name: 'live_demo' },
    update: {},
    create: { name: 'live_demo' },
  })

  // Create a project with relations
  const project = await prisma.projects.create({
    data: {
      name: 'Portfolio Site',
      year: 2025,
      description: 'Personal portfolio built with Next.js and Prisma',
      images: {
        create: [
          { image_url: 'https://example.com/preview1.png' },
          { image_url: 'https://example.com/preview2.png' },
        ],
      },
      tags: {
        create: [
          { tag: { connect: { id: tagWeb.id } } },
          { tag: { connect: { id: tagReact.id } } },
          { tag: { connect: { id: tagNextjs.id } } },
        ],
      },
      links: {
        create: [
          { link: { connect: { id: linkGithub.id } }, url: 'https://github.com/raxhacks/portfolio' },
          { link: { connect: { id: linkLive.id } }, url: 'https://raxhacks.dev' },
        ],
      },
    },
  })

  // Create another project
  const project2 = await prisma.projects.create({
    data: {
      name: 'Mobile App',
      year: 2024,
      description: 'Cross-platform mobile application',
      images: {
        create: [
          { image_url: 'https://example.com/mobile1.png' },
        ],
      },
      tags: {
        create: [
          { tag: { connect: { id: tagMobile.id } } },
          { tag: { connect: { id: tagReact.id } } },
        ],
      },
      links: {
        create: [
          { link: { connect: { id: linkGithub.id } }, url: 'https://github.com/raxhacks/mobile-app' },
        ],
      },
    },
  })

  // Create experience
  await prisma.experiences.create({
    data: {
      company_logo_url: 'https://example.com/oracle-logo.png',
      company_name: 'Oracle',
      start_date: new Date('2023-06-01'),
      end_date: null,
      role: 'Software Engineer',
      description: 'Worked on cloud infrastructure and enterprise applications.',
    },
  })

  await prisma.experiences.create({
    data: {
      company_logo_url: 'https://example.com/microsoft-logo.png',
      company_name: 'Microsoft',
      start_date: new Date('2022-01-01'),
      end_date: new Date('2023-05-31'),
      role: 'Software Engineer Intern',
      description: 'Contributed to Azure services and internal tooling.',
    },
  })

  // Create session
  const sess = await prisma.session.create({
    data: {
      refresh_token: 'test-refresh-token-' + Date.now(),
      exp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    },
  })

  // Create user with session
  await prisma.user.create({
    data: {
      email: 'admin@raxhacks.dev',
      session: { connect: { id: sess.id } },
    },
  })

  console.log('Seed complete:', { 
    project1: project.id,
    project2: project2.id,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
