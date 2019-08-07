import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

const NEXT_LAUNCH = gql`
  {
    launchNext {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
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

const Countdown: React.FC = () => {
  const { loading, error, data } = useQuery(NEXT_LAUNCH);
  const classes = useStyles();

  if (loading) return <h4>Loading...</h4>;
  if (error) {
    console.log(error);
    return <h4>ERROR</h4>;
  }
  console.log(data);

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your
          application.
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Countdown;
