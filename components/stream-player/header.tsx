"use client"

import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar";
import { VerifiedMark } from "../verified-mark";
import { LucideVideoOff, UserIcon, VideoOff } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";


interface HeaderProps {
    hostName: string,
    hostIdentity: string,
    viewerIdentity: string,
    imgUrl: string,
    isFollowing: boolean,
    name: string,
};

export function Header({ hostName, hostIdentity, viewerIdentity, imgUrl, isFollowing, name }: HeaderProps){
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isLive = !!participant;
    const participantCount = participants.length - 1;

    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatar imgUrl={imgUrl} username={hostName} size="lg" isLive={isLive} showBadge />
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-lg font-semibold">
                            {hostName}
                        </h2>
                        <VerifiedMark />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">
                        {name}
                    </p>
                    {isLive ? (
                        <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                            <UserIcon className="h-4 w-4" />
                            <p>
                                {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
                            </p>
                        </div>
                    ) : (
                            <div className="flex gap-x-1 items-center">
                                <LucideVideoOff  className="w-4 h-4 text-muted-foreground"/>
                            </div>
                    )}
                </div>
            </div>
            <Actions hostIdentity={hostIdentity} isFollowing={isFollowing} isHost={isHost} />
        </div>
    );
}


export function HeaderSkeleton(){
    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-2">
                <UserAvatarSkeleton size="lg" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32"/>
                    <Skeleton className="h-4 w-24"/>
                </div>
            </div>
            <ActionsSkeleton />
        </div>
    );
}