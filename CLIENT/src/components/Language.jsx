import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { progressState } from "../store/atoms/progress";
import { userIdSelector } from "../store/selectors/progress";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import axios from "axios";
import { Base_URL } from "../config";
import { userIdSingleSelector } from "../store/selectors/userId";

export function Language({ language }) {
  const navigate = useNavigate();
  const setProgress = useSetRecoilState(progressState)  
  const userId = useRecoilValue(userIdSingleSelector)  
  console.log("userId Type:"+ typeof userId)
  console.log("userId :"+userId)

  return (
    <>
      <Card className="language-card"
        onClick={async () => {
          // const init = async () => {
          const response = await axios.post(`${Base_URL}/user/selectLanguage`,
          {
            languageId : language._id,
            userId : userId
          },
           {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          setProgress({
            isLoading: false,
            progress: {
                _id: "",
                userId: userId,
                language:language.language ,
                proficiency: "",      // Beginner, Intermediate, Advanced.
                level:"Gold",        // level (Gold,Diamond,Ace)
                difficulty: "Easy", // Difficulty level (Easy,Medium,hard)
                solvedQuestionId: []
            }
          })
          navigate("/createProgress");
        // };

        }}>
        <h2 className="language-name"> {language.language}</h2>
      </Card>
    </>
  );
}



