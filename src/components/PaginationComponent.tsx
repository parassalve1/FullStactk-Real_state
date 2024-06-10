'use client'
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Props{
    totalPages:number;
    currentPage:number;
    route?:string
}

export default function PaginationComponent({totalPages , currentPage , route ='/'}:Props) {
const router = useRouter();

  return (
   <Pagination total={totalPages} initialPage={1} page={currentPage}
   onChange={page =>router.push(`${route}?pagenum=${page}`) } />
  )
}
