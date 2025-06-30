import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient()

import { importFaqs } from "../src/data/faqs"



async function main() {


  await prisma.category.createMany({
    data: [
      { name: 'Quick Start Guite', slug: 'quick-start', },
      { name: 'User Manual', slug: 'user-manual' },
      { name: 'FAQs', slug: 'faqs' },
      { name: 'Solutions', slug: 'solutions' },
      { name: 'Version History', slug: 'version-history' },
      { name: 'Useful Links', slug: 'useful-links' },
    ]
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
