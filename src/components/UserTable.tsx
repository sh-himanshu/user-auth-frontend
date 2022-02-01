import { Tbody, Td, Th, Thead, Tr, Table } from "@chakra-ui/react";

import { UserData } from "./AddUserForm";

import api from "../api";
import DeleteUser from "./DeleteUser";
interface UserTableProps {
  setUsersArr: React.Dispatch<React.SetStateAction<UserData[]>>;
  usersArr: UserData[];
}

const UserTable = ({ usersArr, setUsersArr }: UserTableProps) => {
  const handleClick = async ({ target }: React.MouseEvent<SVGElement, MouseEvent>) => {
    try {
      const username = (target as SVGElement).dataset["username"];

      const resp = await api.delete(`users/${username}`);
      if (resp.status === 200) {
        setUsersArr((arr) => [...arr].filter((e) => e.username !== username));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-1 items-center justify-center overflow-auto rounded-xl">
      <div className="overflow-auto rounded-xl bg-blue-500">
        <Table variant="striped" colorScheme="telegram" size="sm">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
              <Th>Address</Th>
              <Th>Delete</Th>
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
                  <DeleteUser username={username} onClick={handleClick} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
