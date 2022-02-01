// import Form from "./components/Form";
import { HeadersDefaults } from "axios";

import { useState } from "react";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import jwt_decode from "jwt-decode";
import api from "./api";

export interface User {
  username: string;
  accessToken: string;
  refreshToken: string;
}

interface DecodedToken extends User {
  exp: number;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const refreshToken = async () => {
    if (!user) return;

    try {
      const resp = await api.post<User>("auth/refresh", {
        token: user.refreshToken,
      });

      if (resp.status === 200) {
        const { accessToken, refreshToken } = resp.data;
        setUser({
          username: user.username,
          accessToken,
          refreshToken,
        });
        return resp.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  api.interceptors.request.use(
    async (config) => {
      if (user) {
        let currentDate = new Date();
        let token = user.accessToken;
        const decodedToken = jwt_decode<DecodedToken>(token);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const data = await refreshToken();
          if (data) token = data.accessToken;
        }

        if (typeof config.headers !== "undefined")
          (config.headers as any as HeadersDefaults).common[
            "Authorization"
          ] = `Bearer ${token}`;
      }
      return config;
    },

    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="z-10 flex h-full w-full items-center justify-center bg-black/40 backdrop-blur-3xl">
        {user ? <Dashboard user={user} /> : <LoginForm setUser={setUser} />}
      </div>
      <div className="fixed flex h-full w-full justify-end">
        <div className="flex w-full flex-col items-center justify-center lg:w-1/2">
          <div className="   h-[75vw] max-h-[25rem] w-[75vw]  max-w-[25rem] rounded-full  bg-gradient-to-bl from-[#8400ff] via-[#7300ff]  to-[#f800b6] "></div>
          <div className="  h-[75vw] max-h-[30rem]  w-[75vw] max-w-[30rem] rounded-full  bg-gradient-to-bl from-[#09d2ff] via-[#005eff]  to-[#00ffa6] "></div>
        </div>
      </div>
    </div>
  );
};

export default App;
