import NavbarState from './components/Navbar/NavbarContext/NavbarState';
import HomePage from './components/Home/Home';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavbarState>
        <HomePage />
      </NavbarState>
    </Router>
  );
}

export default App;
