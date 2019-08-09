import React from "react";
import { client } from "./utils/apollo";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import EventSnackbar from "./components/EventSnackbar";
import Dashboard from "./components/Dashboard";
import { ApolloProvider } from "react-apollo-hooks";
import MenuDrawer from "./components/MenuDrawer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <main>
          <Router>
            <MenuDrawer>
              <Route exact path="/" render={() => <Dashboard />} />
              <Route exact path="/launches" render={() => <h1>Launches</h1>} />
              <Route exact path="/ships" render={() => <h1>Ships</h1>} />
            </MenuDrawer>
          </Router>
          <EventSnackbar />
        </main>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
