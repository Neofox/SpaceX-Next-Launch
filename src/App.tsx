import React from "react";
import { client } from "./utils/apollo";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import Navbar from "./components/Navbar";
import EventSnackbar from "./components/EventSnackbar";
import Dashboard from "./components/Dashboard";
import { ApolloProvider } from "react-apollo-hooks";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <header>
          <Navbar />
        </header>
        <main>
          <Dashboard />
          <EventSnackbar />
        </main>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
