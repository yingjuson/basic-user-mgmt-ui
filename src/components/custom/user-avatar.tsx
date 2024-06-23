import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";

interface Props {
  name: string;
  imageUrl?: string;
}

const UserAvatar: FC<Props> = ({ name, imageUrl }) => {
  const nameInitials = name
    .match(/(\b\S)?/g)
    .join("")
    .match(/(^\S|\S$)?/g)
    .join("")
    .toUpperCase();

  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt={nameInitials} />
      <AvatarFallback className="bg-primary text-white">
        {nameInitials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
