import axios from "axios";
import * as React from 'react';
import Question from './Question';
import Loading from "./MUI/Loading"
import { Base_URL } from "../config";
import  { useEffect, useState } from 'react'
import { progressState } from '../store/atoms/progress';
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {progressIdSelector,solvedQuestionIdSelector, userIdSelector} from '../store/selectors/progress';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
  
export default function Quiz () {
  const navigate = useNavigate()
  const setProgress = useSetRecoilState(progressState)
  const userId = useRecoilValue(userIdSelector)
  const progressId = useRecoilValue(progressIdSelector)
  const solvedQuestionId = useRecoilValue(solvedQuestionIdSelector)

  // console.log(progressId)

  const { language, proficiency, level, difficulty } = useParams();

  const [questions, setQuestions] = useState("");
  const [score, setScore] = useState(0); 
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
//Points and Maximum Score as per difficulty level
  let point = 0;
  let maxScore=0
  if(difficulty === "Easy"){
    point = 1
    maxScore=5
  }else if(difficulty === "Medium"){
    point = 3
    maxScore=15
  }else{
    point = 5
    maxScore=25
  }

//fetching questions 
  const init = async () => {
    const response = await axios.get(
      `${Base_URL}/user/questions/`+ language + "/" + proficiency + "/" + level + "/" + difficulty ,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setQuestions(response.data.questions);
    // console.log("questions :"+questions)
  };
  useEffect(() => {
    init();
  }, [language, proficiency, level, difficulty]);

// checking if all questions are attempted before rendering the Score Checking button
  const allAnswered = answeredQuestions.length === questions.length;
   

  // console.log("No.of questions answered :"+answeredQuestions.length)
  // console.log("All answered :"+ allAnswered)

//Loading while fetching request
  if (questions.length === 0) {
    return <Loading /> ;
  } 

//Score TransitionModal Style variable
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 210,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  return (
    <>
    <div className='quiz-page'>
      <div className='page-questions'>
        {questions.map((question) => {
          return (  
          <Question  
            question={question} 
            point = {point} 
            score={score} 
            setScore={setScore} 
            answeredQuestions={answeredQuestions}
            setAnsweredQuestions={setAnsweredQuestions}
            key={question._id} />
        )
        })}

        {allAnswered && (
            <div>
            <Button 
             variant={"contained"}
             size='large'
             fullWidth={true}
             style={{
                  display:"flex",
                  justifyContent:"center",
                  letterSpacing:4,
                  alignItem:"center",
                  fontWeight:"bold",
                  boxShadow: "0px 5px 10px var(--grey-color)",
                  }}
              onClick={()=>{
                handleOpen()
              }
              }>Check Score !
            </Button>
            <Modal
            width={"210px"}
              aria-labelledby="transition-modal-title" 
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2" style={{backgroundColor:"#ff042e",padding:5}}>
                    You are doing Great !
                  </Typography>
                  <Typography id="transition-modal-description" variant="h4" fontWeight={"bold"} sx={{ m: 2 }}>
                    Score : {score}/{maxScore}
                  </Typography>
                  <Button 
                  variant='contained'
                  onClick={async ()=>{
                    
                    let nextDifficulty = difficulty;
                    let nextLevel = level;
                    let nextProficiency = proficiency;

                    if (difficulty === "Easy") {
                      nextDifficulty = "Medium";
                    } else if (difficulty === "Medium") {
                      nextDifficulty = "Hard";
                    } else {
                      nextDifficulty = "Easy";

                      if (level === "Gold") {
                        nextLevel = "Platinum";
                      } else if (level === "Platinum") {
                        nextLevel = "Diamond";
                      } else {
                        nextLevel = "Gold";

                        if (proficiency === "Beginner") {
                          nextProficiency = "Intermediate";
                        } else if (proficiency === "Intermediate") {
                          nextProficiency = "Advance";
                        } else {
                          nextProficiency = "Beginner";
                        }
                      }
                    }
                    // console.log(nextProficiency)
                    // console.log(nextLevel)
                    // console.log(nextDifficulty)

                    const response = await axios.put(`${Base_URL}/user/updateProgress`,
                    {
                      userId: userId,                   // Reference to the question
                      language: language,               
                      proficiency: nextProficiency,       // Beginner, Intermediate, Advanced.
                      level:nextLevel,                   // level (Gold,Diamond,Ace)
                      difficulty: nextDifficulty,       // Difficulty level (Easy,Medium,hard)
                      solvedQuestionId: answeredQuestions
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        progressId: progressId
                      },
                    }
                  );
                  
                  
                  const data = response.data;
                  // console.log(data);
                  
                  setProgress({
                    isLoading: false,
                    progress: {
                        _id: progressId,
                        userId: userId,
                        language:language,
                        proficiency: nextProficiency,
                        level:nextLevel,
                        difficulty: nextDifficulty,
                        solvedQuestionId:answeredQuestions
                    }
                  })
                  setAnsweredQuestions([])
                  handleClose()
                  setScore(0)
                    navigate(`${"/quiz/" + language + "/" + nextProficiency + "/" + nextLevel + "/" + nextDifficulty}`);
                  }} 
                  >Start Next Challenge
                  </Button>
                </Box>
              </Fade>
            </Modal>
          </div>
          )}
      </div>
      
      <div className='page-others'>
        <div className="page-clock">

        </div>
        <div className="page-result">

        </div>
      </div>
    </div>
      
    </>
  );
}