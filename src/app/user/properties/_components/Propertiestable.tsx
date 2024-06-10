'use client'
import {  PencilIcon, TrashIcon, ViewfinderCircleIcon } from "@heroicons/react/16/solid"
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { Prisma } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Props{
    properties:Prisma.PropertyGetPayload<{
        include:{
            type:true,
            status:true,
        }
    }>[], 
    totalPages:number;
    currentPage:number
}

export default function Propertiestable({properties , totalPages ,currentPage}:Props) {
const router = useRouter();
    
  return (
    <div className="flex flex-col items-center gap-8">
        <Table  >
            <TableHeader >
                <TableColumn>NAME</TableColumn>
                <TableColumn>PRICE</TableColumn>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody  >
               
               {properties.map(item => (<TableRow >
              <TableCell className="font-medium text-lg text-primary-600 hover:underline">
              <Link href={`property/${item.id}`}>{item.name}</Link></TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.type.value}</TableCell>
                    <TableCell>{item.status.value}</TableCell>
                    <TableCell className="flex gap-x-8">
                       
                        <Tooltip color="primary" content='Details'>
                        <Link href={`property/${item.id}`}>
                        <div>
                        <ViewfinderCircleIcon className="w-5 text-sky-500" />
                        <p className="text-[10px] text-slate-400">View</p>

                        </div>
                        </Link>
                        
                        </Tooltip>
                        <Tooltip color="warning" content='Edit Property'>
                        <Link href={`properties/${item.id}/edit`}>
                       <div>
                       <PencilIcon className="w-5 text-yellow-600" />
                       <p className="text-[10px] text-slate-400">Edit</p>
                       </div>
                        </Link>
                        
                        </Tooltip>
                        
                        <Tooltip color="danger" content='Delete Property'>
                       
                        <Link href={`properties/${item.id}/delete`}>
                        <div>
                        <TrashIcon className="w-5 text-red-300" />
                       <p className="text-[10px] text-slate-400">Delete</p>
                        </div>
                        </Link>
                        
                        </Tooltip>
                        </TableCell>

                </TableRow>))
                }
              
            </TableBody>
        </Table>
       {totalPages >= 1 && 
        <Pagination variant="light" color="primary"  total={totalPages}   initialPage={1} page={currentPage}  
        onChange={page => router.push(`/user/properties?pagenum=${page}`)}
        />
       }
    </div>
  )
}
