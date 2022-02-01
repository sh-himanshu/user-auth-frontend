import { useState } from "react";
import { IoLockClosed, IoPerson } from "react-icons/io5";
import { User } from "../App";
import api from "../api";
import twColors from "tailwindcss/colors";
import twTheme from "tailwindcss/defaultTheme";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Checkbox,
  Link,
} from "@chakra-ui/react";

export type LoginFormProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const LoginForm = ({ setUser }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const clear = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post<User>("auth/login", {
        username,
        password,
      });

      if (res.status === 200) setUser(res.data);
    } catch (err) {
      console.log(err);
      clear();
    }
  };

  return (
    <div className="z-10 flex h-full  w-full flex-col items-center justify-center lg:flex-row lg:justify-evenly">
      <h3 className="mb-5 font-title text-4xl font-bold tracking-tight text-white md:mb-10 md:text-5xl lg:mr-20 lg:mb-0">
        Sign in to
        <span className="ml-3 bg-gradient-to-t from-[#d53369] to-[#daae51] bg-clip-text text-transparent">
          continue
        </span>
      </h3>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-2xl bg-batman p-10 shadow-sm shadow-black sm:max-w-lg"
      >
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement>
              <IoPerson className="text-blue-400" />
            </InputLeftElement>
            <Input
              id="login-username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              sx={{
                backgroundColor: twColors.neutral[800],
                color: twColors.neutral[300],
                borderRadius: (twTheme.borderRadius as any)["xl"],
              }}
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired className="my-5">
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              sx={{
                backgroundColor: twColors.neutral[800],
                color: twColors.neutral[300],
                borderRadius: (twTheme.borderRadius as any)["xl"],
              }}
            />
            <InputLeftElement>
              <IoLockClosed className="text-blue-400" />
            </InputLeftElement>
            <InputRightElement>
              <div
                onClick={() => setShow(!show)}
                className="flex h-full w-full items-center justify-center"
              >
                {show ? (
                  <AiOutlineEyeInvisible className="h-5 w-5 text-slate-100 " />
                ) : (
                  <AiOutlineEye className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <div className="my-5 flex justify-between">
          <Checkbox
            sx={{
              "& > span": {
                textColor: twColors.blue[100],
                fontSize: (twTheme.fontSize as any).md,
                fontWeight: (twTheme.fontWeight as any).semibold,
              },
            }}
          >
            Remember me
          </Checkbox>
          <Link
            sx={{
              color: twColors.blue[600],
              fontWeight: (twTheme.fontWeight as any).semibold,
              fontSize: (twTheme.fontSize as any).md,
            }}
            onClick={() => console.log()}
          >
            Forgot password?
          </Link>
        </div>
        <div className="flex w-full">
          <button
            className="ml-auto rounded-xl bg-blue-600 py-2  px-5 font-semibold uppercase tracking-wide text-white shadow-lg shadow-blue-600/50"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
