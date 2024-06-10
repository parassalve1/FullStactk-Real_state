import { NoSymbolIcon } from "@heroicons/react/16/solid";


export default function Unauthorized() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
        <p className="text-2xl font-semibold "> →You are not Authorized to do this Action←</p>
        <NoSymbolIcon  className=" w-36 text-red-600  "/>
    </div>
  )
}
