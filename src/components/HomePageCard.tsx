import { Button, Card, Image } from "@nextui-org/react";
import { Prisma } from "@prisma/client"
import Link from "next/link";

interface Props{
    property:Prisma.PropertyGetPayload<{
        select:{
            id:true,
            name:true,
            price:true,
            images:{
                select:{
                    url:true;
                }
            },
            location:{
                select:{
                    city:true,
                    state:true,
                }
            }
        }
    }> 
}
   

export default function HomePageCard({property}:Props) {
  return (
   <Card className="w-72  flex flex-col  hover:scale-105 " shadow="md">
    <Image src={property.images[0].url} className="w-96 h-36 object-fill" />
    <div className="p-4">
        <p className="text-primary-600 hover:underline text-md font-semibold capitalize">{property.name}</p>
        <p className="text-xs text-slate-600">{property.location?.state},{property.location?.city}</p>
    </div>
    <div className=" bg-gradient-to-br from-slate-50 to-slate-200 p-2 px-4 flex items-center justify-between text-xs">
    <p className="hover:underline text-base text-green-600">$  {property.price.toLocaleString()}</p>
      <Button size="sm" className="bg-primary-500 hover:bg-primary-600">
      
      <Link href={`/user/property/${property.id}`} className='font-md text-xs text-white transition-colors'>
        View Details
        </Link>
      </Button>
     
    </div>
   </Card>
  )
}
