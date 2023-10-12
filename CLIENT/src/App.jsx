import './App.css'
import {BrowserRouter as Router, Routes, Route} from  "react-router-dom";
import Appbar  from "./components/Appbar";
import Signup from "./components/Signup"
import Signin from "./components/Signin";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import { Base_URL } from "./config";
import { userState } from "./store/atoms/user";
import ListOfLanguages from './components/ListOfLanguages';
import AskingProgress from './components/AskingProgress';
import Quiz from './components/Quiz';
import ShowResult from './components/ShowResult';

import { useEffect } from "react";
import axios from "axios"

import {
  RecoilRoot,
  useSetRecoilState,
} from 'recoil';
import Score from './components/MUI/Score';
import ContinueLearning from './components/ContinueLearning';

function App(){

 return (
  <div style={{
      // width:"100vw",
      height:"100vh",
   }}>
      <RecoilRoot>
          <Router>
              <Appbar/>
              <InitUser/>
              <Routes>
                  <Route path="/" element = {<Landing/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/signin" element={<Signin/>}/>
                  <Route path="/continueLearning" element={<ContinueLearning/>}/>
                  <Route path="/allLanguages" element={<ListOfLanguages/>}/>
                  <Route path="/createProgress" element={<AskingProgress/>}/>
                  <Route path="/quiz/:language/:proficiency/:level/:difficulty" element={<Quiz/>}/>
                  {/* <Route path="/updateProgress/:progressId" element={<Score/>}/> */}
              </Routes>
              {/* <Footer/> */}
          </Router>
      </RecoilRoot>
  </div>
 )
}

function InitUser(){
  const setUser = useSetRecoilState(userState)
  const init = async () => {
    try {
      const response = await axios.get(`${Base_URL}/user/me`, {
        headers: {
       "Authorization": "Bearer " + localStorage.getItem("token")
       }
    })

    if (response.data.username) {
       setUser({
        isLoading : false,
        userName : response.data.username
       })
     }else{
      setUser({
        isLoading : false,
        userName : null
       })
     }
    } catch (error) {
      setUser({
        isLoading : false,
        userName : null
       })
    }  
 } 

 useEffect(() => {
  init()
 }, [])
 
 return <></>
}

export default App

