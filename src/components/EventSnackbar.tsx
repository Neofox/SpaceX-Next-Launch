import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { useInterval } from "../utils/hooks";
import { LaunchNextData } from "../utils/types";

const CURRENT_LAUNCH = gql`
  query launchNext {
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

const isInProgress = (
  launchDate: moment.Moment,
  upcoming: Boolean
): Boolean => {
  const now = moment();
  return now.isAfter(launchDate) && upcoming;
};

const EventSnackbar: React.FC = () => {
  const { loading, error, data } = useQuery<LaunchNextData>(CURRENT_LAUNCH);
  const [open, setOpen] = React.useState(false);

  let launch_date_utc: string = "";
  let upcoming: boolean = false;
  let video_link: string | undefined;
  if (!loading && !error && data !== undefined) {
    launch_date_utc = data.launchNext.launch_date_utc;
    upcoming = data.launchNext.upcoming;
    video_link = data.launchNext.links.video_link;
  }

  useInterval(() => {
    if (isInProgress(moment(launch_date_utc), upcoming)) {
      setOpen(true);
    }
  }, 1000);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">A launch is currently happening!</span>}
      action={[
        <Button
          key="open link"
          color="secondary"
          size="small"
          onClick={() => window.open(video_link, "_blank")}
        >
          See here
        </Button>
      ]}
    />
  );
};

export default EventSnackbar;
