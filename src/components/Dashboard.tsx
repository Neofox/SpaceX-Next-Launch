import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LaunchCard from "./LaunchCard";
import Countdown from "../Countdown";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { LaunchLatestData, LaunchNextData } from "../utils/types";

const LAUNCH_NEXT = gql`
  query next {
    launchNext {
      mission_name
      launch_date_utc
      launch_success
      details
      links {
        flickr_images
        mission_patch_small
      }
      launch_site {
        site_name_long
        site_name
      }
    }
  }
`;

const LAUNCH_LATEST = gql`
  query latest {
    launchLatest {
      mission_name
      launch_date_utc
      launch_success
      details
      links {
        flickr_images
        mission_patch_small
      }
      launch_site {
        site_name_long
        site_name
      }
    }
  }
`;

const Dashboard = () => {
  const launchNextRes = useQuery<LaunchNextData>(LAUNCH_NEXT);
  const launchLatestRes = useQuery<LaunchLatestData>(LAUNCH_LATEST);

  return (
    <div>
      <Countdown />
      <Container>
        <Grid container justify="center">
          <Grid item md={12} lg={12}>
            <Typography variant="h5" style={{ padding: "24px 0px 6px" }}>
              Next launch details
            </Typography>
            <LaunchCard {...launchNextRes} />
          </Grid>
          <Grid item md={12} lg={12}>
            <Typography variant="h5" style={{ padding: "24px 0px 6px" }}>
              Previous launch
            </Typography>
            <LaunchCard {...launchLatestRes} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
