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

const prisma = new PrismaClient()

export async function createDocument(owner: number) {

  const result = await prisma.documents.create({ data: { 
    owner,
    contentLocation: "Hello there",
    name: "untitled doc",
    imagePath: '/activity_default.jpg',
  }})
  return result.docId;
}

export async function saveDoc({docId, content, name, imagePath, isPublic}: 
  { docId: number, content?: string, name?: string, isPublic?: boolean, imagePath?: string}) {
  return await prisma.documents.update({where : { docId }, data : {contentLocation: content, name, isPublic, imagePath}});
}

export async function getDoc(docId: number) {
  return await prisma.documents.findFirstOrThrow({where : { docId } });
}

export async function getDocEditorData(docId: number) {
  // TODO - delete, just massaging to make old client happy
  let doc = await prisma.documents.findFirstOrThrow({where : { docId } });
  return {
    success: true,
    activity: {
        type:"activity",
        label: doc.name,
        imagePath: doc.imagePath,
        content: doc.contentLocation,
        isSinglePage: true,
        isPublic: doc.isPublic,
        version: '',
        learningOutcomes: []
    },
    courseId: null
  };
}

export async function listUserDocs(owner: number) {
  let ret = await prisma.documents.findMany({where : { owner } });
  // TODO - delete, just massaging to make old client happy
  let massaged = ret.map((doc) => {
    return {...doc, doenetId: doc.docId,
      label: doc.name, content: [doc.docId]}
  });
  //console.log(ret);
  return massaged;
}

export async function findOrCreateUser(email: string) {
  const user = await prisma.users.findUnique({where : { email } });
  if (user) {
    return user.userId;
  } else {
    return createUser(email);
  }
}

export async function createUser(email: string) {
  const result = await prisma.users.create({ data: { email }})
  return result.userId;
}
