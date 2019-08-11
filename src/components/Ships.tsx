import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Datatable from "./DataTable";
import Grid from "@material-ui/core/Grid";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { ShipsData } from "../utils/types";
import MapPanel from "./MapPanel";
import { LatLngLiteral } from "leaflet";

//TODO move graphql request in their own file
const SHIPS = gql`
  query getShips {
    ships {
      active
      speed_kn
      status
      attempted_landings
      name
      id
      image
      successful_landings
      weight_kg
      year_built
    }
  }
`;

const SHIPS_POSITIONS = gql`
  query getShipsPositions {
    ships {
      position {
        latitude
        longitude
      }
      id
      name
    }
  }
`;

const Ships = () => {
  const queryRes = useQuery<ShipsData>(SHIPS);
  const queryPosRes = useQuery<ShipsData>(SHIPS_POSITIONS);

  let positions: Array<LatLngLiteral> = [];
  let additionalData: Array<{ name: string; id: string }> = [];
  if (queryPosRes.data !== undefined) {
    positions = queryPosRes.data.ships
      .filter(({ position }) => position.latitude !== null)
      .map(({ position }) => ({ lat: position.latitude, lng: position.longitude }));
    additionalData = queryPosRes.data.ships
      .filter(({ position }) => position.latitude !== null)
      .map(({ name, id }) => ({ name, id }));
  }

  return (
    <Container>
      <Grid container>
        <Grid item md={12} lg={12} xs={12}>
          <Typography variant="h6" gutterBottom style={{ padding: "0px 0px 16px" }}>
            Ships information
          </Typography>
          <Datatable {...queryRes} />
        </Grid>
        <Grid item md={12} lg={12} xs={12}>
          <Typography variant="h6" gutterBottom style={{ padding: "24px 0px 16px" }}>
            Ships location
          </Typography>
          <MapPanel positions={positions} data={additionalData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Ships;
