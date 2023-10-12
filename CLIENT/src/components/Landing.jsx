import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { userNameState } from "../store/selectors/userName";
import { useRecoilValue } from "recoil";


function Landing() {
  const userName = useRecoilValue(userNameState);
  const navigate = useNavigate();

  if (userName) {
    return (
      <>
       <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",

        }}
      >
        <div >
          <h1 className="landingPage-title">
            LINGO
          </h1>
          <span className="landingPage-slogan">The free , fun , and effective way<br />to learn a language.</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            paddingTop: 50,
            width: "100vw",
          }}
        >
          <Button
            variant={"contained"}
            onClick={() => {
              // navigate("/signup");
            }}
            color="error"
            style={{
              border: "1px solid var(--secondary-color)",
              padding: "10px 20px 10px 20px",
              letterSpacing: "4px",
              width: 250,
              transition: "transform 0.2s",
            }}
          >
            get started
          </Button>
          <Button
            onClick={() => {
              // navigate("/signin");
            }}
            variant={"outlined"}
            color="error"
            style={{
              border: "1px solid var(--secondary-color)",
              padding: "10px 20px 10px 20px",
              letterSpacing: "4px",
              width: 250,
              transition: "transform 0.2s",
            }}
          >continue learning
          </Button>
        </div>
      </div>
      </>
    );
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          // background: "linear-gradient(190.2deg, #edf2f4 12.72%, #fafafa 58.73%, var(--primary-color) 101.06%)"
          background: "linear-gradient(170.2deg, #edf2f4 12.72%, #d5c4e4 65.73%,  var(--secondary-color) 101.06%)"

        }}
      >
        <div >
          <h1 className="landingPage-title">
            LINGO
          </h1>
          <span className="landingPage-slogan">The free , fun , and effective way<br />to learn a language.</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            paddingTop: 50,
            width: "100vw",
          }}
        >
          <Button
            variant={"contained"}
            onClick={() => {
              navigate("/signup");
            }}
            color="error"
            style={{
              border: "1px solid var(--secondary-color)",
              padding: "10px 20px 10px 20px",
              letterSpacing: "4px",
              width: 250,
              transition: "transform 0.2s",
            }}
          >
            get started
          </Button>
          <Button
            variant={"outlined"}
            color="error"
            style={{
              border: "1px solid var(--secondary-color)",
              padding: "10px 20px 10px 20px",
              letterSpacing: "4px",
              width: 250,
              transition: "transform 0.2s",
            }}
            onClick={() => {
              navigate("/signin");
            }}
          >continue learning
          </Button>
        </div>
      </div>
    </>
  );
}

export default Landing;
