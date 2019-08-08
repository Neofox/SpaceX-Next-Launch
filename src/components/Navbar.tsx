import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import githubLogo from "../github.svg";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
});

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="primary">
        <Toolbar variant="regular" component="header">
          <Typography variant="h6" color="inherit" className={classes.title}>
            SpaceX Next Launch
          </Typography>
          <IconButton
            aria-label="go to the github page"
            aria-haspopup="false"
            onClick={() =>
              window.open(
                "https://github.com/Neofox/SpaceX-Next-Launch",
                "_blank"
              )
            }
            color="inherit"
          >
            <img style={{ height: 30 }} src={githubLogo} alt="github logo" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
