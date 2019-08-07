import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import moment from "moment";

const CURRENT_LAUCNH = gql`
  {
    launchNext {
      tentative_max_precision
      launch_date_utc
      upcoming
      links {
        video_link
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(3, 2)
    }
  })
);

const isInProgress = (
  launchDate: moment.Moment,
  upcoming: Boolean
): Boolean => {
  const now = moment();
  return now.isAfter(launchDate) && upcoming;
};

const CurrentLaunchPanel: React.FC = props => {
  const { loading, error, data } = useQuery(CURRENT_LAUCNH);
  const classes = useStyles(props);

  if (loading) return <h4>Loading...</h4>;
  if (error) {
    console.log(error);
    return <h4>ERROR</h4>;
  }

  const {
    upcoming,
    launch_date_utc,
    tentative_max_precision,
    links
  } = data.launchNext;

  if (isInProgress(moment(launch_date_utc), upcoming)) {
    return (
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            A spaceX launch will be in progress in the next{" "}
            {tentative_max_precision} !
          </Typography>
          <Typography component="p">
            You can see the live here {links.video_link}
          </Typography>
        </Paper>
      </Grid>
    );
  }

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Paper className={classes.root}>
        <Typography variant="body1" component="p">
          No launch in progress
        </Typography>
      </Paper>
    </Grid>
  );
};

export default CurrentLaunchPanel;
