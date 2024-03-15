import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "../../features/loginGoogle";
import Input from "../../components/Input/Input";

axios.defaults.withCredentials = true;

export const LoginSignup = () => {
  const [message, setMessage] = useState("");

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate("/");

  const [action, setAction] = useState("Sign up");
  const [haveAccountText, setHaveAccountText] = useState(
    "Don’t have an account?"
  );

  const toggleAction = () => {
    if (action === "Sign up") {
      setAction("Sign in");
      setHaveAccountText("Have an account?");
    } else {
      setAction("Sign up");
      setHaveAccountText("Don’t have an account?");
    }
  };

  const handleInputChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // Kiểm tra xem người dùng đã nhập đủ thông tin hay không
    if (!values.name || !values.email || !values.password) {
      setMessage("Please enter all required information");
      return; // Không thực hiện chuyển hướng nếu thiếu thông tin
    }

    axios
      .post("http://localhost:8088/signup", values)
      .then((res) => {
        console.log("Sign up successful:", res.data);
        setMessage("Registration successful");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Sign up failed:", err);
        setMessage("An error occurred");
      });
  };

  const handleSignIn = () => {
    // Kiểm tra xem người dùng đã nhập đủ thông tin hay không
    if (!values.email || !values.password) {
      setMessage("Please enter email and password");
      return; // Không thực hiện chuyển hướng nếu thiếu thông tin
    }

    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8088/login", values)
      .then((res) => {
        console.log("Sign in successful:", res.data);
        setMessage("Login successful");
        navigate("/home");
      })
      .catch((err) => {
        console.error("Sign in failed:", err);
        setMessage("Wrong email or password!");
      });
  };

  return (
    <div>
      <div className="container">
        <header className="heading">
          <h2>Get’s started.</h2>
          <span className="heading-content">
            {haveAccountText}{" "}
            <span className="sign-up" onClick={toggleAction}>
              {action}
            </span>
          </span>
        </header>
        <div className="social">
          <LoginGoogle />
        </div>
        <div className="middle">
          <div className="rectangle"></div>
          <span>or login with email</span>
          <div className="rectangle"></div>
        </div>

        <div className="content">
          {action === "Sign in" && (
            <div className="input">
              <Input
                className="mt-8"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleInputChange}
                autoFocus
                required
              />
            </div>
          )}
          <div className="input">
            <span className="text">Email</span>
            <Input
              className="mt-2"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              autoFocus
              required
            />
          </div>
          <div className="input">
            <span className="text">Password</span>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="check-box">
            <input type="checkbox" />
            <span>Remember me</span>
          </div>
        </div>
        <div className="summit-container">
          {action === "Sign in" ? (
            <button type="button" className="sign-in" onClick={handleSignUp}>
              Sign up
            </button>
          ) : (
            <button type="button" className="sign-in" onClick={handleSignIn}>
              Sign in
            </button>
          )}
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};
