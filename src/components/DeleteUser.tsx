import { IoPersonRemoveSharp } from "react-icons/io5";
import { Icon, IconProps } from "@chakra-ui/react";

interface DeleteUserProps extends IconProps {
  username: string;
}

const DeleteUser = ({ username, ...props }: DeleteUserProps) => {
  return <Icon {...props} data-username={username} as={IoPersonRemoveSharp} />;
};

export default DeleteUser;
