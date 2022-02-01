import React, { useState } from "react";
import api from "../api";

export interface UserData {
  username: string;
  phoneNumber: string;
  email: string;
  address: string;
}

const initialState: UserData = {
  username: "",
  phoneNumber: "",
  email: "",
  address: "",
};

interface AddUserFormProps {
  setUsersArr: React.Dispatch<React.SetStateAction<UserData[]>>;
}

const AddUserForm = ({ setUsersArr }: AddUserFormProps) => {
  const [userInfo, setUserInfo] = useState(initialState);

  const handleChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((info) => {
      return {
        ...info,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resp = await api.post("users", userInfo);
    if (resp.status === 200) setUsersArr((arr) => [...arr, userInfo]);
    setUserInfo(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={userInfo.username}
      />
      <input
        type="text"
        name="phoneNumber"
        onChange={handleChange}
        value={userInfo.phoneNumber}
      />
      <input type="email" name="email" onChange={handleChange} value={userInfo.email} />
      <input
        type="text"
        name="address"
        onChange={handleChange}
        value={userInfo.address}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
