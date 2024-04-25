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


export async function findOrCreateUser(email: string) {
  const prisma = new PrismaClient()

  const user = await prisma.users.findUnique({where : { email } });
  if (user) {
    console.log(user);
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
