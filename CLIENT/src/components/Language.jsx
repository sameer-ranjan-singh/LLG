import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { progressState } from "../store/atoms/progress";
import { userIdSelector } from "../store/selectors/progress";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import axios from "axios";
import { Base_URL } from "../config";

export function Language({ language }) {
  const navigate = useNavigate();
  const setProgress = useSetRecoilState(progressState)  
  const userId = useRecoilValue(userIdSelector)  
  console.log("userId :"+userId)

  return (
    <>
      <Card className="language-card"
        onClick={async () => {
          // document.getElementsByClassName("language-card").body.style.border = "2px solid black"
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
              // _id: new mongoose.Types.ObjectId(),
              // _id: 0,
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

        // useEffect(() => {
          // init();
        // }, []);

        }}>
        <h2 className="language-name"> {language.language}</h2>
      </Card>
    </>
  );
}




// import { useNavigate } from "react-router-dom";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { progressState } from "../store/atoms/progress";
// import { userIdSelector } from "../store/selectors/progress";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Base_URL } from "../config";

// export function Language({ language }) {
//   const navigate = useNavigate();
//   const setProgress = useSetRecoilState(progressState);
//   const userId = useRecoilValue(userIdSelector);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLanguageSelection = async () => {
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         `${Base_URL}/user/selectLanguage`,
//         {
//           languageId: language._id,
//           userId: userId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setProgress({
//         isLoading: false,
//         progress: {
//           _id: "",
//           userId: userId,
//           language: language.language,
//           proficiency: "", // Beginner, Intermediate, Advanced.
//           level: "Gold", // level (Gold,Diamond,Ace)
//           difficulty: "Easy", // Difficulty level (Easy,Medium,hard)
//           solvedQuestionId: [],
//         },
//       });

//       navigate("/createProgress");
//     } catch (error) {
//       console.error("Error selecting language:", error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div
//         className={`language-card${isLoading ? " loading" : ""}`}
//         onClick={() => {
//           if (!isLoading) {
//             handleLanguageSelection();
//           }
//         }}
//       >
//         <h2 className="language-name"> {language.language}</h2>
//       </div>
//     </>
//   );
// }
