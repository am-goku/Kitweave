import { prisma } from '@/lib/db'
import { Component } from '@prisma/client';
import 'dotenv/config'


async function main() {

  console.log('Seeding components...')

  // Create a dummy user first
  const user = await prisma.user.upsert({
    where: { email: 'demo@kitweaver.ai' },
    update: {},
    create: {
      email: 'demo@kitweaver.ai',
      name: 'Demo User',
      role: 'PRO',
      stripeCustomerId: 'cus_mock123',
    },
  })

  const components = [
    {
      name: 'Gradient Button',
      description: 'A beautiful button with a gradient background and hover effect.',
      code: '<button className="bg-linear-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">Click Me</button>',
      isPublic: true,
      tags: ['Button', 'Gradient', 'Animation'],
      userId: user.id,
    },
    {
      name: 'Glassmorphism Card',
      description: 'A modern card component with glass effect backdrop blur.',
      code: '<div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-xl">\n  <h3 className="text-xl font-bold text-white">Glass Card</h3>\n  <p className="text-gray-300 mt-2">This is a glassmorphism effect.</p>\n</div>',
      isPublic: true,
      tags: ['Card', 'Layout', 'Glassmorphism'],
      userId: user.id,
    },
    {
      name: 'Animated Input',
      description: 'Input field with floating label animation.',
      code: '<div className="relative group">\n  <input type="text" className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2 focus:ring-2 ring-indigo-500 outline-none peer"/>\n  <label className="absolute left-4 top-2 text-zinc-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 bg-black px-1">Email</label>\n</div>',
      isPublic: true,
      tags: ['Input', 'Form', 'Animation'],
      userId: user.id,
    },
    {
      name: 'Sidebar Layout',
      description: 'Responsive sidebar layout with collapsible menu.',
      code: '<div className="flex h-screen">\n <aside className="w-64 bg-zinc-900 border-r border-zinc-800">Sidebar</aside>\n <main className="flex-1 p-8">Content</main>\n</div>',
      isPublic: true,
      tags: ['Layout', 'Navigation'],
      userId: user.id
    }
  ]

  const promises: Promise<Component>[] = [];

  for (const component of components) {
    const p = prisma.component.create({
      data: component,
    })
    promises.push(p)
  }

  await Promise.all(promises)

  console.log(`Seeded ${components.length} components`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
