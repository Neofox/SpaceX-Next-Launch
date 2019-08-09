import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Datatable from "./DataTable";
import Grid from "@material-ui/core/Grid";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { ShipsData } from "../utils/types";

//TODO move graphql request in their own file
const SHIPS = gql`
  query getShips {
    ships {
      active
      speed_kn
      status
      attempted_landings
      name
      position {
        latitude
        longitude
      }
      id
      image
      successful_landings
      weight_kg
      year_built
    }
  }
`;

const Ships = () => {
  const queryRes = useQuery<ShipsData>(SHIPS);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={12} lg={12} xs={12}>
          <Typography variant="h6" gutterBottom style={{ padding: "0px 0px 16px" }}>
            Ships information
          </Typography>
          <Datatable {...queryRes} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Ships;
