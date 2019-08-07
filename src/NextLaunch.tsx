import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FlightIcon from "@material-ui/icons/Flight";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import moment from "moment";

const LAUNCH_NEXT = gql`
  query next {
    launchNext {
      mission_name
      launch_date_utc
      launch_success
      details
      links {
        flickr_images
      }
      launch_site {
        site_name_long
        site_name
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: 600,
      margin: theme.spacing(2),
      paddingTop: theme.spacing(2)
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    }
  })
);

const NextLaunch = (props: {}) => {
  const classes = useStyles(props);
  const [expanded, setExpanded] = React.useState(true);

  const { loading, error, data } = useQuery(LAUNCH_NEXT);

  if (loading) return <h4>Loading...</h4>;

  console.log(data);

  const {
    mission_name,
    launch_date_utc,
    details,
    links,
    launch_site,
    launch_success
  } = data.launchNext;
  const { flickr_images } = links;

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={mission_name}
        subheader={moment(launch_date_utc).format("YYYY-MM-DD HH:mm")}
      />

      {flickr_images.length > 0 && (
        <CardMedia
          className={classes.media}
          image={flickr_images[0]}
          title="Paella dish"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {details}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <label>status:</label>
        <IconButton aria-label="launch status">
          <FlightIcon
            color={
              launch_success !== null
                ? launch_success
                  ? "primary"
                  : "error"
                : "disabled"
            }
          />
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography gutterBottom variant="subtitle1">
            Launch site: {launch_site.site_name}
          </Typography>
          <Typography gutterBottom variant="caption">
            {launch_site.site_name_long}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default NextLaunch;
