
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200","300","400","500","700","800" ]
});
export const Logo = ()=>{

    return (<div className="flex flex-col items-center gap-y-4">
                <div className="bg-white rounded-full p-1">
                    <Image src="/logo1.svg"
                           alt="GameFlow"
                           width="100"
                           height="100"/>
                </div>
                <div className={cn("flex flex-col items-center",
                                    font.className)}>
                    <p className="text-xl font-semibold">GameFlow</p>
                    <p className="text-sm text-muted-foreground">Let&apos;s play</p>
                </div>

        
    </div>);
}; 

