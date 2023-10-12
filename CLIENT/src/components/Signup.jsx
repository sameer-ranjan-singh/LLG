import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../config";
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import { progressState } from '../store/atoms/progress';

function Signup() {
    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState);
    const setProgress = useSetRecoilState(progressState)  

    return <div style={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItem:"center",
        height:"100vh",
    }}>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItem:"center",
            color:"var(--blackish-color)"
        }}>

            <Typography variant={"h6"} marginBottom={2}>
                Welcome to Lingoooo. Sign-up below !
            </Typography>
        </div>
        <div style={{
            display: "flex",
            justifyContent: 'center',
        }}>
            <Card variant="outlined"
                style={{
                    width: 250,
                    padding: 20,
                    boxShadow: "0px 3px 5px var(--blackish-color)",
                }}
            >
                <div style={{ marginBottom: 20 }}>
                    <TextField
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        fullWidth={true}
                        id="outlined-basic"
                        label="Username"
                        variant="standard"
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <TextField
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        fullWidth={true}
                        id="outlined-basic-1"
                        label="Enter your Email"
                        variant="standard"
                    />
                </div>
                <div style={{ marginBottom: 10 }}>
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        fullWidth={true}
                        id="outlined-basic-2"
                        label="Password"
                        variant="standard"
                        type={"password"}
                    />
                </div>
                <div style={{ justifyContent: "end", display: "flex" }} >
                    <Button
                        size={'large'}
                        variant="contained"
                        fullWidth={true}
                        style={{
                            backgroundColor: "var(--secondary-color)",
                            color: "white",
                            fontWeight:"bold",
                            border: "1px solid var(--secondary-color)",
                            padding: "10px 20px 10px 20px",
                            Size: "large",
                            letterSpacing: "4px",
                            transition: "transform 0.2s",
                            fontFamily: `"Gloock", "Gloock Placeholder", serif`
                        }}
                        onClick={async () => {
                            const response = await axios.post(`${Base_URL}/user/signup`, {
                                username: username,
                                email: email,
                                password: password
                            })
                            const data = response.data
                            localStorage.setItem("token", data.token)
                            setUser({
                                isLoading: false,
                                userName: username
                            })

                            if(progressState){
                                setProgress({
                                  isLoading : false,
                                  progress : data.progressTillNow
                                })
                              }else{
                                console.log("No Progress Found")
                              }

                            navigate("/allLanguages")
                        }}
                    >Create Account</Button>
                </div>
                <p style={{
                    margin: "10px 0px 0px 5px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color:"var(--grey-color)",
                }}>Already have an account ?
                    <span
                        style={{ color: "var(--secondary-color)", cursor: "pointer" }}
                        onClick={() => {
                            navigate("/allLanguages")
                        }}>LogIn
                    </span>
                </p>

            </Card>
        </div>


    </div>
}

export default Signup