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
    contentLocation: "Hello there",
    name: "untitled doc"
  }})
  return result.docId;
}

export async function saveDoc(docId: number, content: string) {
  const prisma = new PrismaClient()

  return await prisma.documents.update({where : { docId }, data : {contentLocation: content}});
}

export async function getDoc(docId: number) {
  const prisma = new PrismaClient()

  return await prisma.documents.findFirstOrThrow({where : { docId } });
}

export async function getDocEditorData(docId: number) {

  const prisma = new PrismaClient()

  // TODO - delete, just massaging to make old client happy
  let doc = await prisma.documents.findFirstOrThrow({where : { docId } });
  return {
    success: true,
    activity: {
        type:"activity",
        label: doc.name,
        imagePath: '/activity_default.jpg',
        content: doc.contentLocation,
        isSinglePage: true,
        isPublic: true, // TODO - add DB field for this
        version: '',
        learningOutcomes: []
    },
    courseId: null
  };
}

export async function listUserDocs(owner: number) {
  const prisma = new PrismaClient()

  let ret = await prisma.documents.findMany({where : { owner } });
  // TODO - delete, just massaging to make old client happy
  let massaged = ret.map((doc) => {
    return {...doc, doenetId: doc.docId,
      label: doc.name, imagePath: '/activity_default.jpg', content: [doc.docId]}
  });
  //console.log(ret);
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
