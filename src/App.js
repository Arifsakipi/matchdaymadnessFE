// App.js
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PlayersList from "./Components/PlayersList";
import PlayerForm from "./Components/PlayerForm";
import MatchesList from "./Components/MatchesList"; // Import MatchesList
import MatchForm from "./Components/MatchForm";
import TeamForm from "./Components/TeamForm";
import TeamsList from "./Components/TeamsList";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            {/* Brand Name */}
            <Link className="navbar-brand fw-bold fs-3" to="/">
              ⚽ Matchday Madness
            </Link>

            {/* Toggle button for mobile view */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Links */}
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/matches">
                    🏆 Matches
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/players">
                    🎽 Players
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/teams">
                    {" "}
                    {/* Add Teams Link */}⚽ Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/about">
                    📖 About
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary px-4 ms-3">Sign Up</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/players" element={<PlayersList />} />
            <Route path="/players/new" element={<PlayerForm />} />
            <Route path="/players/edit/:id" element={<PlayerForm />} />
            <Route path="/matches" element={<MatchesList />} />
            <Route path="/matches/new" element={<MatchForm />} />
            <Route path="/matches/edit/:id" element={<MatchForm />} />
            <Route path="/teams" element={<TeamsList />} />{" "}
            {/* Add TeamsList route */}
            <Route path="/teams/new" element={<TeamForm />} />{" "}
            {/* Add TeamForm (new) route */}
            <Route path="/teams/edit/:id" element={<TeamForm />} />{" "}
            {/* Add TeamForm (edit) route */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Welcome to Matchday Madness!</h1>
      <p className="lead">Manage football matches and player information.</p>
    </div>
  );
}

export default App;
