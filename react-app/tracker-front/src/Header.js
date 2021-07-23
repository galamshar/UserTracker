import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
    header: {
      background: "#F9F9F9",
      
    },
    logo: {
      fontFamily: "'Ubuntu', sans-serif",
      fontWeight: 700,
      color: "#5D6E97",
      textAlign: "left",
    },
  }));

export default function Header() {
  const { header, logo } = useStyles();
  const displayDesktop = () => {
    return <Toolbar>{abtestlogo}</Toolbar>;
  };

  const abtestlogo = (
    <Typography variant="h6" component="h2" className={logo}>
      AB TEST REAL
    </Typography>
  );

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
}