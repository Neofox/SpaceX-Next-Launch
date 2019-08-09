import { Styles } from "@material-ui/styles/withStyles";
import { StylesHook } from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";

export enum Environments {
  dev = "development",
  stag = "staging",
  prod = "production"
}

export type launchLinksType = {
  video_link?: string;
  flickr_images: [string];
  wikipedia?: string;
  mission_patch_small?: string;
  reddit_launch?: string;
};

export type launchSiteType = {
  site_id?: string;
  site_name_long: string;
  site_name?: string;
};

export type launchType = {
  id: string;
  mission_name: string;
  launch_date_utc: string;
  details: string;
  links: launchLinksType;
  launch_site: launchSiteType;
  launch_success: boolean;
  upcoming: boolean;
};

export type shipLocationType = {
  latitude: number;
  longitude: number;
};

export type shipMissionType = {
  flight: string;
  name: string;
};

export type shipType = {
  id: string;
  active: boolean;
  position: shipLocationType;
  missions: shipMissionType;
  status: string;
  attempted_landings?: number;
  successful_landings?: number;
  weight_kg: number;
  speed_kn: number;
  name: string;
  image: string;
  year_built: number;
};

/////////// APOLLO TYPES ////////

export interface LaunchNextData {
  launchNext: launchType;
}

export interface ShipsData {
  ships: Array<shipType>;
}

export interface LaunchLatestData {
  launchLatest: launchType;
}

////////// TABLE ///////////

export type Order = "asc" | "desc";

export interface HeadRow {
  id: string;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  classes: ReturnType<StylesHook<Styles<Theme, {}, string>>>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
}
