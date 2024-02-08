import { useContext, useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
interface LoginPageType {
  handleFxn: () => void;
}
const LoginPage: React.FC<LoginPageType> = ({ handleFxn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(AuthContext);
  console.log(token);
  if (!token && !setToken) {
    throw new Error("nothing received");
  }
  const navigate = useNavigate();
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };
  const validate = (): boolean => {
    if (username.length == 0) {
      alert("Empty Username not allowed");
      return false;
    } else if (password.length == 0) {
      alert("Empty Password not allowed");
      return false;
    }
    return true;
  };
  const handleLogin = () => {
    if (validate()) {
      console.log("fxn called");
      username.trim() != "";
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          // expiresInMins: 60, // optional
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res, res["token"]);
          // console.log(setToken(token));
          setToken(res["token"]);
          console.log("token: " + token);
          localStorage.setItem("token", res["token"]);
          localStorage.setItem("userId", res["id"]);
          console.log(`from login page ${localStorage.getItem("token")}`);
          handleFxn();
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Invalid Username or Password");
    }
  };

  useEffect(() => {
    console.log("token: " + token);
  }, [token]);
  console.log("token: " + token);
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className=" shadow-2xl bg-white rounded-md m-10 p-10">
          <h1 className="flex justify-center font-bold text-2xl">Login</h1>
          <div className="m-5 ">
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="m-5">
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="m-5 flex justify-center">
            <Button type="submit" onSubmit={handleLogin}>
              Log in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
