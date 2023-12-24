import { getSelf } from "./auth-service";
import { db } from "./db";


export async function getFollowedUsers(){
    try {
        const self = await getSelf();

        const followedUsers = await db.follow.findMany({
            where: {
                followerId: self.id
            },
            include: { 
                following: true,
            }
        });

        return followedUsers;
    } catch {
        return [];
    }
}

export async function isFollowingUser(id: string){

    try{
        const self = await getSelf();
        const otherUser = await db.user.findUnique({
            where:{ id }, 
        });

        if(!otherUser){
            throw new Error("Followed User Not Found")
        }

        if(otherUser.id === self.id){
            return true
        }

        const existingFollow = await db.follow.findFirst({
            where:{
                followerId: self.id,
                followingId: otherUser.id
            }
        })

        return !!existingFollow
    }catch{
        return false;
    }
}


export async function followUser(id: string){
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if(!otherUser){
        throw new Error("User that you asking to follow is not found");
    }

    if(otherUser.id === self.id){
        throw new Error(`You can't follow your self Mr.${self.username}`)
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include:{
            follower: true,
            following: true
        }
    })

    return follow;
}


export async function unfollowUser(id: string){

    const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if(!otherUser){
        throw new Error("The user that you want to unfollow is not found")
    }

    if(self.id === otherUser.id){
        throw new Error("You are trying to unfollow your self please stop")
    }

    const existingFollow =  await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        },
    });

    if(!existingFollow){
        throw new Error("You are not following this user already")
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id
        }, 
        include: {following: true}
    });

    return follow;
}