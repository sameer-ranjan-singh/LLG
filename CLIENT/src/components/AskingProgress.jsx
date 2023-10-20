import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { progressState } from '../store/atoms/progress';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { difficultySelector, levelSelector, progressInLanguageSelector, solvedQuestionIdSelector, userIdSelector } from '../store/selectors/progress';
import axios from 'axios';
import { Base_URL } from '../config';

function AskingProgress() {
  const navigate = useNavigate()
  const setProgress = useSetRecoilState(progressState)

  const userId = useRecoilValue(userIdSelector)
  const language = useRecoilValue(progressInLanguageSelector)
  const [ value , setValue ] = useState("")       //proficiency
  const level = useRecoilValue(levelSelector)
  const difficulty = useRecoilValue(difficultySelector)
  const solvedQuestionId = useRecoilValue(solvedQuestionIdSelector)

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
   <>
  <div style={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItem:"center",
    }}>
    <FormControl style={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItem:"center",
        border:"2px solid var(--blackish-color)",
        boxShadow: "0px 3px 5px var(--grey-color)",
        margin:50,
        padding:50,
    }}>
     <FormLabel id="demo-row-radio-buttons-group-label" 
        style={{
            fontWeight:"bolder",
            fontSize:"larger",
            color:"var(--secondary-color)",
            letterSpacing:5
            }}>
        LEVEL
     </FormLabel>
      <RadioGroup
        style={{margin:15}}
        // color='success'
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue="Gold"
        value={level}
        // onChange={}
      >
        <FormControlLabel disabled value="Gold" control={<Radio />} label="Gold" />
        <FormControlLabel disabled value="Platinum" control={<Radio />} label="Platinum" />
        <FormControlLabel disabled value="Diamond" control={<Radio />} label="Diamond" />
      </RadioGroup>

      <FormLabel id="demo-row-radio-buttons-group-label" 
        style={{
            fontWeight:"bolder",
            fontSize:"larger",
            color:"var(--secondary-color)",
            letterSpacing:5
            }}>
        LANGUAGE
      </FormLabel>
      <RadioGroup
        style={{margin:15}}
        // column
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        // defaultValue="Easy"
        value={language}
        // onChange={}
      >
        <FormControlLabel disabled value={"English"} control={<Radio />} label={"English"} />
      </RadioGroup>

      <FormLabel id="demo-row-radio-buttons-group-label" 
        style={{
            fontWeight:"bolder",
            fontSize:"larger",
            color:"var(--secondary-color)",
            letterSpacing:5
            }}>
        DIFFICULTY
     </FormLabel>
      <RadioGroup
        style={{margin:15}}
        // column
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        // defaultValue="Easy"
        value={difficulty}
        // onChange={}
      >
        <FormControlLabel disabled value="Easy" control={<Radio />} label="Easy" />
        <FormControlLabel disabled value="Medium" control={<Radio />} label="Medium" />
        <FormControlLabel disabled value="Hard" control={<Radio />} label="Hard" />
      </RadioGroup>

      <FormLabel id="demo-row-radio-buttons-group-label" 
        style={{
            fontWeight:"bolder",
            fontSize:"larger",
            color:"var(--secondary-color)",
            letterSpacing:5
            }}>
        PROFICIENCY
     </FormLabel>
      <RadioGroup
        style={{margin:15}}
        // column
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange= { handleChange }
      >
        <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
        <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
        <FormControlLabel value="Advance" control={<Radio />} label="Advance" />
      </RadioGroup>

      <Button 
      onClick={async ()=>{
        const response = await axios.post(`${Base_URL}/user/addProgress`,
            {
              userId: userId, // Reference to the question
              language: language,
              proficiency: value, // Beginner, Intermediate, Advanced.
              level:level, // level (Gold,Diamond,Ace)
              difficulty: difficulty, // Difficulty level (Easy,Medium,hard)
              solvedQuestionId: solvedQuestionId
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          const data = response.data;
          console.log(data);

         setProgress({
            isLoading: false,
            progress: {
                _id: data.progressId,
                userId: userId,
                language:language,
                proficiency: value,            // Beginner, Intermediate, Advanced.
                level:level,                  // level (Gold,Diamond,Ace)
                difficulty: difficulty,      // Difficulty level (Easy,Medium,hard)
                solvedQuestionId:solvedQuestionId
            }
          })
          navigate(`${"/updateUser/" + userId + "/" + data.progressId }`);

      }}
      size='large'
      variant={"contained"}
      fullWidth={true}
      style={{
        display:"flex",
        justifyContent:"center",
        letterSpacing:4,
        alignItem:"center",
        fontWeight:"bold",
        boxShadow: "0px 5px 10px var(--grey-color)",
    }} 
      >Next</Button>

    </FormControl>
  </div>
   </>
  )
}

export default AskingProgress