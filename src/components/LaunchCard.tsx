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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import FlightIcon from "@material-ui/icons/Flight";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { LaunchLatestData, LaunchNextData } from "../utils/types";
import { ApolloError } from "apollo-client/errors/ApolloError";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: 600,
      minWidth: 300,
      minHeight: 200,
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

const generateLinkMenu = (links: {}) => {
  const menus = Object.entries<string>(links);
  return menus.map(([menu, link]) => {
    return (
      <MenuItem key={menu} disabled={link === null || link === undefined} onClick={() => window.open(link, "_blank")}>
        {menu}
      </MenuItem>
    );
  });
};

//TODO optimize rerender (on state change)
const LaunchCard = (props: { loading: boolean; error?: ApolloError; data?: LaunchLatestData | LaunchNextData }) => {
  //TODO create custom hook for open/close menus
  const classes = useStyles(props);
  const [expanded, setExpanded] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { loading, data } = props;

  if (loading || data === undefined)
    return (
      <Card className={classes.card}>
        <CardContent style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );

  const { mission_name, launch_date_utc, details, launch_site, launch_success, links } = Object.values(data)[0];
  const { flickr_images, mission_patch_small } = links;

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  //TODO create a carroussel with all images
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar alt={mission_name} src={mission_patch_small} />}
        action={
          <div>
            <IconButton aria-label="settings" onClick={handleMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={menuOpen}
              onClose={handleClose}
            >
              {generateLinkMenu({
                article: links.article_link,
                reddit: links.reddit_launch,
                youtube: links.video_link
              })}
            </Menu>
          </div>
        }
        title={mission_name}
        subheader={moment(launch_date_utc).format("YYYY-MM-DD HH:mm")}
      />

      {flickr_images.length > 0 && (
        <CardMedia className={classes.media} image={flickr_images[0]} title="launch image" />
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {details}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography style={{ marginLeft: 8 }}>status:</Typography>
        <IconButton aria-label="launch status">
          <FlightIcon color={launch_success !== null ? (launch_success ? "primary" : "error") : "disabled"} />
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

export default LaunchCard;
