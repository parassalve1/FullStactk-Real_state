import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Propertiestable from "./_components/Propertiestable";

interface Props{
  searchParams:{[key:string]:string | string[] | undefined  };
}
const PAGE_SIZE = 5;
export default async function PropertiesPage( {searchParams}:Props) {
  const{getUser} = await getKindeServerSession();
  const user = await getUser();
 
const pagenum = searchParams.pagenum ?? 0;
  
 const propertyPromise  = await prisma.property.findMany({
  where:{
    userId:user?.id
  },
  include:{
    type:true,
    status:true
  },
  skip: +pagenum * PAGE_SIZE,
  take: PAGE_SIZE
});

  const totalPropertyPromise = await prisma.property.count({
    where:{
      userId:user?.id,
    }
  })

  const[properties, totalProperties] = await Promise.all([propertyPromise , totalPropertyPromise])
  
  const totalPages = Math.floor(totalProperties/PAGE_SIZE)
    return (
      <div>
          <Propertiestable properties={properties} totalPages={totalPages} currentPage={+pagenum} />
      </div>
    )
  }
  