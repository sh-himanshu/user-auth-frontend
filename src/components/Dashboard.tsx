import { useEffect, useState } from "react";
import { User } from "../App";
import AddUserForm, { UserData } from "./AddUserForm";
import UserTable from "./UserTable";
import api from "../api";

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [usersArr, setUsersArr] = useState<UserData[]>([]);

  useEffect(() => {
    (async () => {
      const resp = await api.get<{ users: UserData[] }>("users");
      if (resp.status === 200) setUsersArr(resp.data.users);
    })();
  }, []);

  return (
    <div>
      <UserTable usersArr={usersArr} setUsersArr={setUsersArr} />
      <AddUserForm setUsersArr={setUsersArr} />
    </div>
  );
};

export default Dashboard;
