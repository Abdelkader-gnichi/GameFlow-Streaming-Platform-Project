import { getSelf } from "./auth-service";
import { db } from "./db";


export async function getRecommended(){


    await new Promise(resolve => setTimeout(resolve,6000))
   const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        }
   }) 

   return users;
}