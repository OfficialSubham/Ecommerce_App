import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
    const res = await axios.post(`${BACKEND_URL}/login`, loginDetails);
    if (res.status == 200) {
      localStorage.setItem("token", res.data.token);
      navigate("/")
    } else {
      alert("Enter valid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="userName"
          value={loginDetails.userName}
          onChange={handleOnchange}
          className="bg-white h-10 rounded-2xl px-2 "
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          onChange={handleOnchange}
          value={loginDetails.password}
          className="bg-white h-10 rounded-2xl px-2"
          placeholder="Password"
        />
        <button className="bg-gray-400 py-3 rounded-2xl" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
