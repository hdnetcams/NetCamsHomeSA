import NavbarState from './components/Navbar/NavbarContext/NavbarState';
import HomePage from './components/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={ () =>
          <NavbarState>
            <HomePage />
          </NavbarState>
        } />
        <Route render={ (props) =>
          <div style={{ padding: '10px' }}>
            Unknown URI: <br />
            { props.location.pathname } <br />
            <a style={{ color: 'blue' }} href={'https://netcams.io' + props.location.pathname}>Click here to open this link on netcams.io website</a> <br />
            Or use "back" browser button to return to the app.
            { /* { JSON.stringify(props) } */ }
          </div>
        } />
      </Switch>
    </Router>
  );
}

export default App;
