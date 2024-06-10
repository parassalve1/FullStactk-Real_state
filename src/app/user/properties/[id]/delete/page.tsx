import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { deleteProperty } from "@/lib/actions/property";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";



interface Props{
    params:{
        id:string;
    }
}

export default async function DeletePropertypage({params}:Props) {

const{getUser} = getKindeServerSession();

const propertyPromise = prisma.property.findUnique({
    where:{
        id:+params.id,
    },
    
});

const [properties , user] = await Promise.all([propertyPromise , getUser()]);

if(!properties) return notFound();

if(!user || properties.userId !== user.id) redirect('/unauthorized')

    const deleteAction = async() =>{
        'use server'
        try {
            await deleteProperty(+params.id);
            redirect('/user/properties')
        } catch (error) {
            throw error;
        }
    }

  return (
    
      
      <div className="h-[70vh] flex flex-col items-center justify-center">
        
        <AlertDialog >
    <AlertDialogTrigger asChild>
      <Button  variant="destructive">Are You sure to Delete this Property</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-destructive">Are You sure to Delete this Property</AlertDialogTitle>
        <AlertDialogTitle className="text-sm">Name : <span className="text-primary-700 underline">{properties.name}</span></AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          Property and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>
    <Link href={"/user/properties"}>
        <Button>Cancel</Button>
    </Link>
        </AlertDialogCancel>
        <form action={deleteAction} >
        <SubmitButton type="submit" color="danger" variant="light">
          Delete
        </SubmitButton>
        </form>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
 
      </div>
   
)
}

