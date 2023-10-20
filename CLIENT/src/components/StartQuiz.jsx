import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { difficultySelector, levelSelector, proficiencySelector, progressInLanguageSelector } from '../store/selectors/progress';
import { Base_URL } from '../config';
import axios from 'axios';

function StartQuiz() {
  const { userId, progressId  } = useParams();
  const navigate = useNavigate()

  const language  = useRecoilValue(progressInLanguageSelector)
  const proficiency  = useRecoilValue(proficiencySelector)
  const level  = useRecoilValue(levelSelector)
  const difficulty  = useRecoilValue(difficultySelector)

  return (
    <>
   <div className='start-container'>
   <div className ="start-card" 
     onClick={async () => {
       const response = await axios.put(
         `${Base_URL}/user/updateUser/`+ userId + "/" + progressId,
         null,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           }
         }
       );
       const data = response.data;
       navigate(`${"/quiz/" + language + "/" + proficiency + "/" + level + "/" + difficulty}`);
    }}

    > Start Learning 
    </div>
   </div>
   
    </>
  )
}

export default StartQuiz