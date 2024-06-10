'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { cn, Input } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import {useDebouncedCallback} from 'use-debounce'
import { titleCase } from "title-case";

export default function Search() {
const searchParams = useSearchParams();
const pathname = usePathname();
const router = useRouter();



// function capitalizeFirstLetter(str:string) {
//     return `${str[0].toUpperCase()}${str.slice(1)}`;
//   }

const handleChange =   useDebouncedCallback(
(query:string) =>{
    const params = new URLSearchParams(searchParams);
    if(query) params.set('query' , query);
    else params.delete('query')

    router.replace(`${pathname}?${params.toString()}`)
},1000);


  return (
    <div className='p-4 flex items-center justify-center bg-gradient-to-br from-sky-300 to-indigo-500'>
        <Input onChange={(e) => handleChange(titleCase(e.target.value))} className='w-1/3 shadow  ' label={'Search'} endContent={
            <MagnifyingGlassIcon className='w-8 text-slate-400 flex items-center justify-center '/>} 
            defaultValue={searchParams.get('query') ?? ""}
            />
    </div>
  )
}
