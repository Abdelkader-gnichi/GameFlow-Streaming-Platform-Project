"use client"

import { onBlock, onUnBlock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner";


interface ActionsProps {
    isFollowing: boolean;
    userId: string;
};

export function Actions({userId, isFollowing}: ActionsProps){
    const [isPending, startTransition] = useTransition();
 
    function handleFollow(){
        startTransition(()=>{
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    }

    function handleUnFollow(){
        startTransition(()=>{
            onUnfollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
     }
    
    function handleBlock(){
        startTransition(() => {
            onBlock(userId)
            .then((data) => toast.success(`${data?.blocked.username} is now blocked`))
            .catch(() => toast.error(`Something went wrong`));
        });
    }

    function handleUnBlock(){
        startTransition(() => {
            onUnBlock(userId)
            .then((data) => toast.success(`${data.blocked.username} is now unblocked`))
            .catch(() => toast.error(`Something went wrong`));
        });
    }

    return (
        <>
            <Button disabled={isPending}
                onClick={isFollowing ? handleUnFollow : handleFollow }
                variant="primary">

                {isFollowing ? "Unfollow" : "Follow" }
            </Button>
            <Button disabled={isPending}
                onClick={handleBlock }
                variant="primary">

                block
            </Button>
        </>
    )
}