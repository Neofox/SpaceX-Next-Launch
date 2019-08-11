import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Paper from "@material-ui/core/Paper";
import { LatLngLiteral } from "leaflet";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3)
    },
    map: {
      height: 300
    }
  })
);

interface MapInterface {
  positions: Array<LatLngLiteral>;
  data: Array<{ name: string; id: string }>;
}

const MapPanel = ({ positions, data }: MapInterface) => {
  const classes = useStyles();

  return (
    <Paper elevation={10} className={classes.root}>
      <Map center={[51.505, -0.09]} zoom={1} className={classes.map}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map((position, idx) => (
          <Marker position={position} key={data[idx].id}>
            <Popup>{data[idx].name}</Popup>
          </Marker>
        ))}
      </Map>
    </Paper>
  );
};

export default MapPanel;
