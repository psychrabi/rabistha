import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient()

import {importFaqs} from "../src/data/faqs"



async function main() {

  await prisma.user.create({
    data: {
      email: 'psychrabi@gmail.com',
      password: await hash('admin123', 10),
      firstName: "Rabi",
      lastName: "Shrestha",
      role: 'ADMIN'
    }
  })

  await prisma.user.create({
    data: {
      email: 'rabi.stha@live.com',
      password: await hash('user1234', 10),
      firstName: "Rabi",
      lastName: "Shrestha",
      role: 'USER'
    }
  })

  await prisma.product.createMany({
    data: [
      { name: 'ASTER Pro-2', description: 'ASTER Pro license for 2 workplaces', price: 45.99, seats: 2 },
      { name: 'ASTER Pro-3', description: 'ASTER Pro license for 3 workplaces', price: 57.99, seats: 3 },
      { name: 'ASTER Pro-6', description: 'ASTER Pro license for 6 workplaces', price: 109.99, seats: 6 },
      { name: 'ASTER Annual-2', description: 'ASTER Annual license for 2 workplaces', price: 14.99, seats: 2 },
      { name: 'ASTER Annual-3', description: 'ASTER Annual license for 3 workplaces', price: 19.99, seats: 3 },
      { name: 'ASTER Annual-6', description: 'ASTER Annual license for 6 workplaces', price: 36.99, seats: 6 }
    ]
  })

  await prisma.faq.createMany({data: importFaqs})
  console.log('Seed data created')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
