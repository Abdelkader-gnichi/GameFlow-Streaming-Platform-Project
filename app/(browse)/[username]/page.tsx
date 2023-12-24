import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

interface UsernamePageProps {
    params: { 
        username : string;
    };
}

export default async function UsernamePage({params}: UsernamePageProps){


    const user = await getUserByUsername(params.username)

    if(!user){
        notFound()
    }

    const isFollowing = await isFollowingUser(user.id);

    return <div className="flex flex-col gap-y-4">
        <p>username: {user.username}</p>
        <p>user Id: {user.id}</p>
        <p>is following: {`${ isFollowing }`}</p>
        <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
}