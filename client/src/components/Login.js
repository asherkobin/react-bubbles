import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: "Lambda School",
    password: "i<3Lambd4"
  });

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/login", userInfo)
      .then(res => {
        localStorage.setItem("USER_TOKEN", res.data.payload);
        history.push("/bubbles");
      })
      .catch(err => console.log(err)
    );
  }

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Name: </label>
        <input type="text" id="username" name="username" value={userInfo.username} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" name="password" value={userInfo.password} onChange={handleChange} />
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;
