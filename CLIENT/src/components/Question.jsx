import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import  {  useState } from 'react'


export default function Question({question,point,setScore,setAnsweredQuestions}){
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('Choose wisely');
    const [answered, setAnswered] = useState(false);
  
    const handleRadioChange = (event) => {
      if(!answered){
        setValue(event.target.value);
        setHelperText(' ');
        setError(false);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (value === question.correctAnswer) {
        setHelperText('You got it!'+ `${"( +"+ point + ")"}`)
        setError(false);
  
        // Update the score when the answer matches
        setScore((prevScore) => prevScore + point);
        
      } else if (value !== question.correctAnswer) {
        setHelperText('Sorry, wrong answer!');
        setError(true);
      } else {
        setHelperText('Please select an option.');
        setError(true);
      }
  
    // Push the question ID to the answeredQuestions array
    setAnsweredQuestions((prevAnsweredQuestions) => [
      ...prevAnsweredQuestions,
      question._id,
    ]);
  
   //If a particular question answered   
    setAnswered(true)
  
    };
  
   return <>
     <div className="question-box">
       <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1 }} error={error} variant="standard">
          <FormLabel  
           style={{color:"var(--secondary-color)",fontFamily: `"Gloock", "Gloock Placeholder", serif`,fontWeight:"bold"}}
           id="demo-error-radios">
            {question.question}
          </FormLabel>
            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={value}
              // color='secondary'
              onChange={handleRadioChange}
              >
            <FormControlLabel 
              disabled={answered} 
              style={{color:"var(--blackish-color)"}} 
              value={`${question.optionsToChoose.option1}`} 
              control={<Radio />} 
              label={`${question.optionsToChoose.option1}`}
            />
            <FormControlLabel 
              disabled={answered} 
              style={{color:"var(--blackish-color)"}} 
              value={`${question.optionsToChoose.option2}`} 
              control={<Radio />} 
              label={`${question.optionsToChoose.option2}`} 
            />
           </RadioGroup>
          <FormHelperText style={{color:"green"}}>{helperText}</FormHelperText>
          <Button 
            disabled={answered} 
            sx={{ mt: 1, mr: 1}} 
            type="submit" 
            variant="outlined">
            Check Answer
          </Button>
        </FormControl>
      </form>
     </div>
    
   </>
  }