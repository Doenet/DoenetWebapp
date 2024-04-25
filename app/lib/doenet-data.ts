import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { PrismaClient } from '@prisma/client'

import { unstable_noStore as noStore } from 'next/cache';

export async function createDocument(owner: number) {
  const prisma = new PrismaClient()

  const result = await prisma.documents.create({ data: { 
    owner,
    name: "untitled doc"
  }})
  return result.docId;
}

export async function listUserDocs(owner: number) {
  const prisma = new PrismaClient()

  let ret = await prisma.documents.findMany({where : { owner } });
  // TODO - delete, just massaging to make old client happy
  let massaged = ret.map((doc) => {
    return {...doc, label: doc.name, imagePath: '/activity_default.jpg', content: []}
  });
  console.log(ret);
  return massaged;
}

export async function findOrCreateUser(email: string) {
  const prisma = new PrismaClient()

  const user = await prisma.users.findUnique({where : { email } });
  if (user) {
    return user.userId;
  } else {
    return createUser(email);
  }
}

export async function createUser(email: string) {

  const prisma = new PrismaClient()
  const result = await prisma.users.create({ data: { email }})
  return result.userId;
}
