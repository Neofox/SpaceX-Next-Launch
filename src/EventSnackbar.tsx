import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useInterval from "./hooks/useInterval";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5)
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

const EventSnackbar: React.FC = props => {
  const { loading, error, data } = useQuery(CURRENT_LAUNCH);
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  let launch_date_utc = "";
  let upcoming = false;
  let link = { video_link: "" };
  if (!loading && !error) {
    launch_date_utc = data.launchNext.launch_date_utc;
    upcoming = data.launchNext.upcoming;
    link = data.launchNext.link;
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
          onClick={() => window.open(link.video_link, "_blank")}
        >
          See here
        </Button>
      ]}
    />
  );
};

export default EventSnackbar;
