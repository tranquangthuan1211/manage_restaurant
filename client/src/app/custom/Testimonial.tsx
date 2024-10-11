import Image from 'next/image';

export default function Testimonial({profile, name, review}:any){
    return (
        <div>
            <div className="flex flex-col items-center gap-y-2
            bg-gray-500 rounded-2xl w-52 min-h-64 m-4 p-4">
                <Image className="w-32 h-fit" src = "/images/five_stars.png" alt="profile" width={200} height={200}></Image>
                <Image className="w-fit h-32 p-2" src = {profile} alt="profile" width={200} height={200}></Image>
                <p>{"\"" + review + "\""}</p>
            </div>
        </div>
    )
}