import Image from "next/image";

export default function Feature({icon, text} : any){
    return(
        <div className="flex flex-col justify-start items-center gap-2">
            <Image className="w-fit h-32" src={icon} alt="icon" width={200} height={200} />
            <p>{text}</p>
        </div>
    )
}