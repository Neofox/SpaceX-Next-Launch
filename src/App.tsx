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

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/"
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Navbar />
        <main>
          <Countdown />
          <NextLaunch />
          <EventSnackbar />
        </main>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
