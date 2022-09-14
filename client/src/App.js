import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import SwitchRoute from "./components/route/SwitchRoute";
import NavBar from "./components/route/NavBar";
import { UserProvider } from "./components/context/UserContext";

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <NavBar />
          <SwitchRoute />
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
