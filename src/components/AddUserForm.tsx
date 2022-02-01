import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import React, { useState } from "react";
import api from "../api";
import twColors from "tailwindcss/colors";
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
    <form
      onSubmit={handleSubmit}
      className="flex  flex-1 flex-col items-center justify-center space-y-2   px-10"
    >
      <div className="w-full max-w-md rounded-xl bg-batman p-5 xl:max-w-lg xl:p-10">
        <div className="mb-4 flex w-full  flex-col ">
          <Input
            variant="outline"
            placeholder="Enter username"
            type="text"
            name="username"
            onChange={handleChange}
            value={userInfo.username}
            sx={{
              borderRadius: "1rem 1rem 0rem 0rem",
              backgroundColor: twColors.neutral[800],
              "&:focus": {
                backgroundColor: twColors.neutral[400],
              },
            }}
          />
          <InputGroup>
            <InputLeftAddon
              sx={{
                borderRadius: "0px",
                backgroundColor: twColors.neutral[800],

                color: twColors.gray[100],
                "&:focus": {
                  backgroundColor: twColors.neutral[400],
                },
              }}
              children="+91"
            />
            <Input
              variant="outline"
              type="tel"
              placeholder="Enter phone number"
              name="phoneNumber"
              onChange={handleChange}
              value={userInfo.phoneNumber}
              sx={{
                borderRadius: "0px",
                backgroundColor: twColors.neutral[800],
                "&:focus": {
                  backgroundColor: twColors.neutral[400],
                },
              }}
            />
          </InputGroup>
          <Input
            sx={{
              borderRadius: "0px",
              backgroundColor: twColors.neutral[800],
              "&:focus": {
                backgroundColor: twColors.neutral[400],
              },
            }}
            variant="outline"
            placeholder="Enter email"
            type="email"
            name="email"
            onChange={handleChange}
            value={userInfo.email}
          />
          <Input
            variant="outline"
            placeholder="Address"
            type="text"
            name="address"
            onChange={handleChange}
            value={userInfo.address}
            sx={{
              borderRadius: "0rem 0rem 1rem 1rem",
              backgroundColor: twColors.neutral[800],
              "&:focus": {
                backgroundColor: twColors.neutral[400],
              },
            }}
          />
        </div>
        <button
          className=" w-full max-w-md rounded-full bg-gradient-to-b from-[#7474BF] to-[#348AC7]  px-5 py-3 font-semibold uppercase text-white shadow-lg shadow-[#7474BF]/40 "
          type="submit"
        >
          Add User
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
