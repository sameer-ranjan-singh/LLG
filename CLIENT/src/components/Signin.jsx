import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { progressState } from "../store/atoms/progress";

function Signin() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const setProgress = useSetRecoilState(progressState)  
  
  return (
    <div  style={{
      display: "flex",
      flexDirection:"column",
      justifyContent: "center",
      alignItem:"center",
      height:"100vh",
    }}>
      <div style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"} marginBottom={2}>Welcome Back ! Login below.</Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          style={{
            width: 250,
            padding: 20,
            boxShadow: "0px 3px 5px var(--blackish-color)",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <TextField
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              fullWidth={true}
              id="outlined-basic-3"
              label="Username"
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth={true}
              id="outlined-basic-4"
              label="Password"
              variant="outlined"
              type={"password"}
            />
          </div>
          <div style={{ justifyContent: "end", display: "flex" }}>
            <Button
              size={"large"}
              variant="contained"
              fullWidth={true}
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                border: "1px solid var(--primary-color)",
                padding: "10px 20px 10px 20px",
                Size: "large",
                letterSpacing: "4px",
                transition: "transform 0.2s",
                fontFamily: `"Gloock", "Gloock Placeholder", serif`,
              }}
              onClick={async () => {
                const response = await axios.post(
                  `${Base_URL}/user/login`,
                  null,
                  {
                    headers: {
                      username: username,
                      password: password,
                    },
                  }
                );
                const data = response.data;
                localStorage.setItem("token", data.token);
                setUser({
                  isLoading: false,
                  userName: username,
                  userId : data.user._id
                });

                if(progressState){
                  setProgress({
                    isLoading : false,
                    progress : data.progressTillNow
                  })
                  console.log(data.progressTillNow)
                  navigate("/continueLearning");

                }else{
                  console.log("No Progress Found")
                  navigate("/allLanguages");
                }
                
              }}
            >
              Login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
