import prisma from "@/lib/prisma"
import AddPropertyForm from "../../add/_components/AddPropertyPage"
import { notFound, redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"


interface Props{
    params:{
        id:string
    }
}

export default async function EditPropertyPage({params}:Props) {

const[propertyTypes , propertyStatuses , propertyes] = 
await Promise.all([prisma.propertyType.findMany() ,prisma.propertyStatus.findMany() 
    ,prisma.property.findUnique({
        where:{
            id: +params.id,
        },
    
        include:{
            location:true,
            contact:true,
            images:true,
            feature:true
        }
    })
])

const{getUser} = getKindeServerSession();
const user = await getUser();

if(!propertyes) return notFound();
if(!user || propertyes.userId !== user.id) return redirect('/unauthorized')

  return (
    <div>
        <AddPropertyForm types={propertyTypes} statuses={propertyStatuses} property={propertyes} 
        isEdit={true}  />
    </div>
  )
}
