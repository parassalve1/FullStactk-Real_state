

export default function Attribute({label , value}:{label:string,value?:number |string}) {
  return (
    <div className="flex flex-wrap justify-between px-5">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm text-slate-600">{value}</span>
    </div>
  )
}
