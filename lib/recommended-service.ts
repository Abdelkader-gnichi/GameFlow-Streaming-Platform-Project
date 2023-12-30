import { getSelf } from "./auth-service";
import { db } from "./db";


export async function getRecommended(){
  let  userId = null;

  try{
    const self = await getSelf();
    userId = self.id
  }catch(error){
    userId=null;
  }

  let users= [];

  if(userId){
    users = await db.user.findMany({
        where:{ 
          AND:[
            {
              NOT: {
                id: userId
              } 
            },
            {
              NOT: {
                followedBy:{
                  some:{
                    followerId: userId,
                  },
                }, 
              },
            },
            // {
            //   NOT: {
            //     blockedBy:{
            //       some:{
            //         blockerId: userId,
            //       },
            //     }, 
            //   },
            // },
            {
              NOT: {
                blocking:{
                  some:{
                    blockedId: userId,
                  },
                },
              },
            },
          ],
        },
        include: {
          stream: { 
            select: {
              isLive: true,
            },
          },
        },
        orderBy:{ 
            createdAt: "desc"
        }
    })
  } else {
    // await new Promise(resolve => setTimeout(resolve,9000))
    users = await db.user.findMany({
        include: {
          stream: {
            select: {
              isLive: true
            },
          },
        },
        orderBy: {
            createdAt: "desc"
        }
    }) 
  }

   

   return users;
}