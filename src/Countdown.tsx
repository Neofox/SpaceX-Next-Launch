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
  days: { time: number; percent: number };
  hours: { time: number; percent: number };
  minutes: { time: number; percent: number };
  seconds: { time: number; percent: number };
}

const NEXT_LAUNCH_DATE = gql`
  query launchNext {
    launchNext {
      launch_date_utc
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4)
      // padding: theme.spacing(3, 2)
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
        textTransform: "uppercase",
        zIndex: 10
      }
    },
    progress: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      margin: theme.spacing(2)
    }
  })
);

const Countdown: React.FC = () => {
  const { loading, error, data } = useQuery(NEXT_LAUNCH_DATE);
  const classes = useStyles();
  const [state, setState] = useState<StateInterface>({
    days: { time: 0, percent: 0 },
    hours: { time: 0, percent: 0 },
    minutes: { time: 0, percent: 0 },
    seconds: { time: 0, percent: 0 }
  });

  useInterval(() => {
    const then = moment(launch_date_utc);
    const now = moment();
    const countdown = moment(then.valueOf() - now.valueOf());
    const daysInt = parseInt(countdown.format("D"));
    const hoursInt = parseInt(countdown.format("HH"));
    const minutesInt = parseInt(countdown.format("mm"));
    const secondsInt = parseInt(countdown.format("ss"));

    setState({
      days: { time: daysInt, percent: daysInt },
      hours: { time: hoursInt, percent: (hoursInt / 24) * 100 },
      minutes: { time: minutesInt, percent: (minutesInt / 60) * 100 },
      seconds: { time: secondsInt, percent: (secondsInt / 60) * 100 }
    });
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
        <Typography component="div" className={classes.countdownWrapper}>
          <div className={classes.countdownItem}>
            {state.days.time}
            <span>days</span>
          </div>
          <div className={classes.countdownItem}>
            {state.hours.time}
            <span>hours</span>
          </div>
          <div className={classes.countdownItem}>
            {state.minutes.time}
            <span>minutes</span>
          </div>
          <div className={classes.countdownItem}>
            {state.seconds.time}
            <span>seconds</span>
          </div>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Countdown;
