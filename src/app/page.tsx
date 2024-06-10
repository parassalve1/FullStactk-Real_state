import HomePageCard from "@/components/HomePageCard";
import PropertyCardContainer from "@/components/PropertyCardContainer";
import Search from "@/components/Search";
import prisma from "@/lib/prisma";

const PAGE_SIZE = 8;
interface Props{
  searchParams:{
    [key:string]:string |
    string[] |
    undefined
  }
}


export default async function Home({searchParams}:Props) {

  const pagenum = searchParams.pagenum ?? 0;
  const query = searchParams.query ?? '';

  const propertiesPromise = prisma.property.findMany({
    select:{
      id:true,
      name:true,
      price:true,
      images:{
        select:{
          url:true,
        }
      },
      location:{
        select:{
          city:true,
          state:true
        }
      }
    },
    ...(!!query && {
      where:{
        name:{
          contains: String(query)
        }
      }
    }),
    
    skip:+pagenum*PAGE_SIZE,
    take:PAGE_SIZE
  })

  
  const totalPropertiesPromise = prisma.property.count({
    ...(!!query && {
      where:{
        name:{
          contains:String(query),
        },
      }, 
    }
  )
  });

  const[properties , totalProperties] = await Promise.all([propertiesPromise ,totalPropertiesPromise])

  const totalPages = Math.floor(totalProperties/PAGE_SIZE)
  return (
   <div>
    <Search />
    <PropertyCardContainer totalpages={totalPages} currentpages={+pagenum}>
  {properties.map((propertyItems) => <HomePageCard property={propertyItems} key={propertyItems.id}  /> )}
  </PropertyCardContainer>
   </div>
  );
}
