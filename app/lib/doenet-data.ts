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

export async function createUser(email: string) {

  const prisma = new PrismaClient()
  await prisma.users.create({ data: { email }})
}
