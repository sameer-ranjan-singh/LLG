import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { difficultySelector, levelSelector, proficiencySelector, progressInLanguageSelector } from '../store/selectors/progress'
import { useNavigate } from 'react-router-dom'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { useEffect } from 'react';
function ContinueLearning() {
  const navigate = useNavigate()
  // const progress = useRecoilValue(progressInLanguageSelector)

  const language  = useRecoilValue(progressInLanguageSelector)
  const proficiency  = useRecoilValue(proficiencySelector)
  const level  = useRecoilValue(levelSelector)
  const difficulty  = useRecoilValue(difficultySelector)

  return (
    <>
    <div className="continuePage" >
       <button className="continue-language"
       onClick={()=>
          navigate(`${"/quiz/" + language + "/" + proficiency + "/" + level + "/" + difficulty}`)
        }>
        {language}
       </button>

       <button className="add-language"
       onClick={()=>
          navigate("/allLanguages")
        }>
          <AddToPhotosIcon fontSize='large'/>
       </button>
    </div>    
    </>
  )
}

export default ContinueLearning
