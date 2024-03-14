import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export const Indexs = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xác thực mỗi khi component được render
    axios
      .get("http://localhost:8088/home", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Message);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8088/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login", { replace: true });
        } else {
          alert("error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {auth ? (
              <div className="summit-container">
                <h3>Đã xác nhận: {name}</h3>
                <Button color="inherit" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="summit-container">
                <h3>Chưa xác nhận: {message}</h3>
                <Button color="inherit" onClick={handleLogin}>
                  Đăng nhập
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
