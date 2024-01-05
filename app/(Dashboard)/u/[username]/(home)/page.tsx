import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";


interface CreatorPageProps {
    params: {
        username: string;
    };
};


export default async function CreatorPage({ params }: CreatorPageProps){
    
    
    try{
       const externalUser = await currentUser();
       const user = await getUserByUsername(params.username);

        if(!user || user.externalUserId !== externalUser?.id || !user.stream){
            throw new Error("Unauthorized")
        }
    
       
        return (
            <div className="h-full"> 
                <StreamPlayer user={user} stream={user.stream} isFollowing />  {/* isFollowing always true cos this is our streaming in the dashboard */}
            
            </div>);
        
    } catch(error){
        console.log(error)
    }
}