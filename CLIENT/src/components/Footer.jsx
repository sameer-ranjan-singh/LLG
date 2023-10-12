import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        top: 50,
        left: 0,
        background: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Link
        to="https://www.linkedin.com/in/sameer-ranjan-singh/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton style={{ color: "var(--secondary-color)" }} >
          <LinkedInIcon />
        </IconButton>
      </Link>
      <Link
        to="https://instagram.com/haan_wahe_sameer?igshid=YmMyMTA2M2Y="
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton style={{ color: "var(--secondary-color)" }} >
        <InstagramIcon />
        </IconButton>
      </Link>
    </div>
  );
}

export default Footer;
