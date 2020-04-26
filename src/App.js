import React, {useEffect} from 'react'
import store from "./store";
import {createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import "./App.css";
import {Home, Global, Countries} from "./containers"
import {loadData} from "./actions/corona";

const THEME = createMuiTheme({
  typography: {
    "fontFamily":" -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
   "fontSize": 16,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});
const App = () => {
  useEffect(() => {
    store.dispatch(loadData());
  },[])
  return (
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/global" component={Global}/>
            <Route path="/countries" component={Countries}/>
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default App
