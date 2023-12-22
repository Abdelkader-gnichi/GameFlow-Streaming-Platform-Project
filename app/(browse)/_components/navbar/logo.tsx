import {cn} from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'

const font = Poppins({
    subsets: ["latin"],
    weight: ["200","300","400","500","700","800" ]
});

export function Logo(){


    return <>
    <Link href="/">
        <div className="flex items-center gap-x-4 hover:opacity-75 transition">
            <div className="bg-white rounded-full mr-12 shrink-0 lg:mr-0 lg-shrink">
                <Image src="/logo1.svg" alt="GameFlow" width="64" height="64" />
            </div>
            <div className={cn(
                "hidden lg:block",font.className)}>
                <p className="text-lg font-semibold">GameFlow</p>
                <p className="text-xs text-muted-foreground">Let&apos;s play</p>
            </div>
        </div>
    </Link>
    
    
    
    
    </>
}