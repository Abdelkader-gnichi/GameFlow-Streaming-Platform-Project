import { getSelf } from "./auth-service";
import { db } from "./db";


export async function isBlockedByUser(id: string){

    try{
        const self = await getSelf()
        
        const otherUser = await db.user.findUnique({
            where: { id },
        });

        if(!otherUser){
            throw new Error("There is no any user that blocked you")
        }

        if(self.id === otherUser.id){
            return false
        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId:{ 
                    blockerId: otherUser.id,
                    blockedId: self.id
                }
               
            }
        });

        return !!existingBlock;

    } catch {
        return false;
    }
}

export async function blockUser(id: string){

    const self = await getSelf();

    if(self.id === id){
        throw new Error("You can't block your self");
    }

    const otherUser = await db.user.findUnique({
        where: {id}
    });

    if(!otherUser){
        throw new Error("There is no user to block")
    }


    const existingBlock = await db.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId: self.id,
                blockedId: otherUser.id
            },
        },
    });
    
    if(existingBlock){
        throw new Error("This user is already blocked by you")
    }

    const block = await db.block.create({
        data:{
            blockerId: self.id,
            blockedId: otherUser.id
        },
        include: {
            blocked:true,
        }
    });

    return block;
}

export async function unblockUser(id: string){

    const self = await getSelf();
    
    if(self.id === id){
        throw new Error(`You can't unblock your self`);
    }

    const otherUser = await db.user.findUnique({
        where: { id }
    });

    if(!otherUser){
        throw new Error("User Not Found!")
    }

    const existingBlock = await db.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId: self.id,
                blockedId: otherUser.id,
            },      
        },
    });

    if(!existingBlock){
        throw new Error("You can't unblock unblocked User")
    }

    const unblock = await db.block.delete({
        where: {
                id: existingBlock.id
        },
        include:{
            blocked: true,
        }
    })

    return unblock;
}

export const getBlockedUsers = async () => {
    const self = await getSelf();
  
    const blockedUsers = await db.block.findMany({
      where: {
        blockerId: self.id,
      },
      include: {
        blocked: true,
      },
    });
  
    return blockedUsers;
  };