
import { cn } from '@/lib/utils'
import React from 'react'

export default function Tittle({tittle , className}:{tittle:string , className?:string}) {
  return (
   <div className={cn('p-5', className)}>
    <h2 className='font-bold text-xl text-slate-700'>{tittle}</h2>
    <hr className='border-solid border border-slate-300' />
   </div>
  )
}
