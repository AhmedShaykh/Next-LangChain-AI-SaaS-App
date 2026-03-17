"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

const UserAvatar = ({
    image,
    name
}: {
    image: string;
    name: string;
}) => {
    return (
        <Avatar>
            <AvatarImage src={image} />

            <AvatarFallback>
                {name[0]}
            </AvatarFallback>
        </Avatar>
    )
};

export default UserAvatar;