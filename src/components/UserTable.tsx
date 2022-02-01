import { Tbody, Td, Th, Thead, Tr, Table } from "@chakra-ui/react";

import { UserData } from "./AddUserForm";

import api from "../api";
import DeleteUser from "./DeleteUser";
interface UserTableProps {
  setUsersArr: React.Dispatch<React.SetStateAction<UserData[]>>;
  usersArr: UserData[];
}

const UserTable = ({ usersArr, setUsersArr }: UserTableProps) => {
  const handleClick = async ({
    target,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      const username = (target as HTMLButtonElement).dataset["username"];
      const resp = await api.delete(`users/${username}`);
      if (resp.status === 200) {
        setUsersArr((arr) => [...arr].filter((e) => e.username !== username));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Username</Th>
          <Th>Phone Number</Th>
          <Th>Email</Th>
          <Th>Address</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {usersArr.map(({ username, email, phoneNumber, address }, index) => (
          <Tr key={`user-row-${index}`}>
            <Td>{username}</Td>
            <Td>{phoneNumber}</Td>
            <Td>{email}</Td>
            <Td>{address}</Td>
            <Td>
              <DeleteUser username={username} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UserTable;
