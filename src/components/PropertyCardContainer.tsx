import React, { PropsWithChildren } from 'react'
import PaginationComponent from './PaginationComponent';

type Props = PropsWithChildren<{
  totalpages:number;
  currentpages:number;
}>

export default function PropertyCardContainer({children ,totalpages ,currentpages}:Props) {
  return (
    <div className=' p-5 flex flex-col items-center gap-10'>
        <div className='flex flex-wrap justify-center gap-6'>{children}</div>

        <PaginationComponent totalPages={totalpages} currentPage={currentpages} />
    </div>
  )
}
