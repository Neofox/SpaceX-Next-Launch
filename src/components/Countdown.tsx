import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import moment from "moment";
import { useInterval } from "../utils/hooks";
import Container from "@material-ui/core/Container";
import { LaunchNextData } from "../utils/types";

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
      padding: theme.spacing(4, 0, 4),
      background: "#fff"
    },
    countdownWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      fontSize: "1.2rem"
    },
    countdownItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      margin: theme.spacing(2),
      paddingTop: theme.spacing(2),
      "& span": {
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
  const { error, data } = useQuery<LaunchNextData>(NEXT_LAUNCH_DATE);
  const classes = useStyles();
  const [state, setState] = useState<StateInterface>({
    days: { time: 0, percent: 0 },
    hours: { time: 0, percent: 0 },
    minutes: { time: 0, percent: 0 },
    seconds: { time: 0, percent: 0 }
  });

  useInterval(() => {
    let then = moment(launch_date_utc);
    const now = moment();
    const daysInt = then.diff(now, "days");
    then.subtract(daysInt, "days");
    const hoursInt = then.diff(now, "hours");
    then.subtract(hoursInt, "hours");
    const minutesInt = then.diff(now, "minutes");
    then.subtract(minutesInt, "minutes");
    const secondsInt = then.diff(now, "seconds");

    setState({
      days: { time: daysInt, percent: daysInt },
      hours: { time: hoursInt, percent: (hoursInt / 24) * 100 },
      minutes: { time: minutesInt, percent: (minutesInt / 60) * 100 },
      seconds: { time: secondsInt, percent: (secondsInt / 60) * 100 }
    });
  }, 1000);

  if (error) {
    console.log(error);
  }

  let launch_date_utc = data ? data.launchNext.launch_date_utc : moment().format();

  return (
    <div className={classes.root}>
      <Container>
        <Typography align="center" component="div" className={classes.countdownWrapper}>
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
      </Container>
    </div>
  );
};

export default Countdown;
