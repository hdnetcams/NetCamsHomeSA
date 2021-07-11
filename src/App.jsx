import NavbarState from './components/Navbar/NavbarContext/NavbarState';
import HomePage from './components/Home/Home';

function App() {
  return (
    <>
      <NavbarState>
        <HomePage />
      </NavbarState>
    </>
  );
}

export default App;
