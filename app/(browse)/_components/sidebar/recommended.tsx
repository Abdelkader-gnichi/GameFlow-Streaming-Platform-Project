"use client"

import { useSidebar } from "@/store/use-sidebar"
import { User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item"



interface RecommendedProps{
    data: User[] 
}

export function Recommended({ data }: RecommendedProps){

    const { collapsed } = useSidebar((state) => state)
    const showLabel = !collapsed && data.length > 0;


    return (
        <div >
            {showLabel && (
            <div className="pl-6 mb-4">
                <p className=" text-sm text-muted-foreground">
                    Recommended
                </p>
            </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map( (user) => {
                    return <UserItem key={user.id}
                                     username={user.username}
                                     imgUrl={user.imgUrl}
                                     isLive={true} />
                })}
            </ul> 
        </div>
    )
}

export function RecommendedSkeleton(){
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => {
                return <UserItemSkeleton key={i} />
            })}
        </ul>);
}