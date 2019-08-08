import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import Navbar from "./Navbar";
import Countdown from "./Countdown";
import EventSnackbar from "./EventSnackbar";
import NextLaunch from "./NextLaunch";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/"
});

//TODO: refactor main component
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <header>
          <Navbar />
        </header>
        <main>
          <Countdown />
          <Container>
            <Grid container justify="center">
              <Grid item md={12} lg={12}>
                <Typography variant="h5" style={{ padding: "24px 0px 6px" }}>
                  Next launch details
                </Typography>
                <NextLaunch />
              </Grid>
              <Grid item md={12} lg={12}>
                <Typography variant="h5" style={{ padding: "24px 0px 6px" }}>
                  Latest launch
                </Typography>
                <NextLaunch />
              </Grid>
            </Grid>
          </Container>
          <EventSnackbar />
        </main>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
