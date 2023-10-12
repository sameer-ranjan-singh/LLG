import * as React from "react";
import axios from 'axios';
import { Base_URL } from '../config';
import { Language } from './Language';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Loading from "./MUI/Loading"

function ListOfLanguages( languages , setLanguages) {
  [languages , setLanguages] = useState([])
  const navigate = useNavigate();

  const init = async () => {
    const response = await axios.get(`${Base_URL}/user/listOfLanguages`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setLanguages(response.data.languages);
  };

  useEffect(() => {
    init();
  }, []);
  if (languages.length === 0) {
    return (
      <Loading/>
    );
  }
  return (
    <>
    <div className="languages">
      <h3 className='container-heading'>
       Choose a Language
      </h3>
      <div className='languages-container'>
        <>
          {languages.map((language) => {
              return <Language language={language} key={language._id} />;
          })}
        </>
      </div>
    </div>
    <div className="btn-next">
      <Button
      variant="contained"
      fullWidth={true}
       >n e x t
      </Button>
    </div> 
     
    </>
  )
}

export default ListOfLanguages 
