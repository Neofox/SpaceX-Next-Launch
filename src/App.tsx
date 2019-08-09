import React from "react";
import { client } from "./utils/apollo";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import EventSnackbar from "./components/EventSnackbar";
import Dashboard from "./components/Dashboard";
import Ships from "./components/Ships";
import { ApolloProvider } from "react-apollo-hooks";
import MenuDrawer from "./components/MenuDrawer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Router>
          <MenuDrawer>
            <Route exact path="/" render={() => <Dashboard />} />
            <Route exact path="/ships" render={() => <Ships />} />
          </MenuDrawer>
        </Router>
        <EventSnackbar />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
