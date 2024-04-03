import { Metadata } from 'next';
import Table from '@/app/ui/customers/table';
import { AddCustomer } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import Pagination from '@/app/ui/customers/pagination';

export const metadata: Metadata = {
    title: 'Customers',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query);

    return(
        <div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
           </div>
        </div>
    )
}