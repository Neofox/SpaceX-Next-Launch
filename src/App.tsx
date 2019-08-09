import React from "react";
import { client } from "./utils/apollo";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import EventSnackbar from "./components/EventSnackbar";
import Dashboard from "./components/Dashboard";
import { ApolloProvider } from "react-apollo-hooks";
import MenuDrawer from "./components/MenuDrawer";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <main>
          <MenuDrawer>
            <Dashboard />
          </MenuDrawer>
          <EventSnackbar />
        </main>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
