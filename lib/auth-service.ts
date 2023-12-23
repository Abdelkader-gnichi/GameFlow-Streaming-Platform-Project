import { error } from "console";
import { db } from "./db";

import { currentUser } from "@clerk/nextjs";

export async function getSelf(){

    const self = await currentUser();

    if(!self || !self.username) {
        throw new Error("Unauthorized")
    }

    const user = await db.user.findUnique({
        where: {externalUserId : self.id}
    });

    if(!user){
        throw new Error("User not Found")
    }

    return user;

}