import { IoPersonRemoveSharp } from "react-icons/io5";

interface DeleteUserProps {
  username: string;
  onClick: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

const DeleteUser = ({ username, onClick }: DeleteUserProps) => {
  return (
    <IoPersonRemoveSharp
      data-username={username}
      className="text-red-600"
      onClick={onClick}
    />
  );
};

export default DeleteUser;
