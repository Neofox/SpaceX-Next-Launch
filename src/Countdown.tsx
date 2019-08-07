import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import moment from "moment";
import useInterval from "./hooks/useInterval";

interface StateInterface {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const NEXT_LAUNCH_DATE = gql`
  {
    launchNext {
      launch_date_utc
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(3, 2)
    },
    countdownWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap"
    },
    countdownItem: {
      color: "#111",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      margin: theme.spacing(2),
      paddingTop: theme.spacing(2),
      "& span": {
        color: "#333",
        fontWeight: 600,
        textTransform: "uppercase"
      }
    }
  })
);

const Countdown: React.FC = () => {
  const { loading, error, data } = useQuery(NEXT_LAUNCH_DATE);
  const classes = useStyles();
  const [state, setState] = useState<StateInterface>({
    days: "",
    hours: "",
    minutes: "",
    seconds: ""
  });

  useInterval(() => {
    const then = moment(launch_date_utc);
    const now = moment();
    const countdown = moment(then.valueOf() - now.valueOf());
    const days = countdown.format("D");
    const hours = countdown.format("HH");
    const minutes = countdown.format("mm");
    const seconds = countdown.format("ss");

    setState({ days, hours, minutes, seconds });
  }, 1000);

  if (loading) return <h4>Loading...</h4>;
  if (error) {
    console.log(error);
    return <h4>ERROR</h4>;
  }

  const { launch_date_utc } = data.launchNext;

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Next launch in:
        </Typography>
        <Typography component="div" className={classes.countdownWrapper}>
          <div className={classes.countdownItem}>
            {state.days}
            <span>days</span>
          </div>
          <div className={classes.countdownItem}>
            {state.hours}
            <span>hours</span>
          </div>
          <div className={classes.countdownItem}>
            {state.minutes}
            <span>minutes</span>
          </div>
          <div className={classes.countdownItem}>
            {state.seconds}
            <span>seconds</span>
          </div>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Countdown;
