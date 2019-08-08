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

/////////// APOLLO TYPES ////////

export interface LaunchNextData {
  launchNext: launchType;
}

export interface LaunchLatestData {
  launchLatest: launchType;
}
