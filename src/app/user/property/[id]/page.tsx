import Attribute from "@/components/Attribute";

import PageTitle from "@/components/pageTittle";
import Tittle from "@/components/tittle";
import { ImagesSlider } from "@/components/ui/images-slider";
import prisma from "@/lib/prisma"
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation"

interface Props{
  params:{
    id:string
  }
}

export default async function PropertyPage({params}:Props) {

    const property = await prisma.property.findUnique({
        where:{
            id:+params.id
        },
        include:{
            status:true,
            type:true,
            location:true,
            contact:true,
            feature:true,
            images:true
        }
    })
    if(!property) return notFound();
  return (
    <div>
        <PageTitle title="Property Page" href="/" linkCaption="Back to Properties" />
        <div className="">
            <h1 className="text-2xl my-5 text-primary-300 uppercase p-4 font-bold">{property.name}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-2">
                    <ImagesSlider images={property.images.map((img) => img.url)} />
                        <h2 className="font-bold text-2xl text-gray-500 mt-1 mx-5">
                            ${property.price} / {property.status.value}
                        </h2>
                        <p className="text-sm text-slate-600 mt-7">{property.description}</p>
                </div>
                <Card className="p-5">
                <Tittle tittle="Features" />
                <Attribute label="Bedrooms" value={property.feature?.bedrooms} />
                <Attribute label="Bathrooms" value={property.feature?.bathrooms} />
                <Attribute label="Parking spots" value={property.feature?.parkingSpots} />
                <Attribute label="Area" value={property.feature?.area} />

                <Tittle tittle="Address" className="" />
                <Attribute label="City" value={property.location?.city} />
                <Attribute label="Landmark" value={property.location?.landmark} />
                <Attribute label="Zip/code" value={property.location?.zip} />
                <Attribute label="Streetaddress" value={property.location?.streetAddress} />

                <Tittle tittle="Owner Details" className="" />
                <Attribute label="Owner Name" value={property.contact?.name} />
                <Attribute label="Email" value={property.contact?.email} />
                <Attribute label="Phone" value={property.contact?.phone} />
                </Card>

               
            </div>
        </div>
    </div>
  )
}
