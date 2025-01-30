// App.js
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PlayersList from "./Components/PlayersList";
import PlayerForm from "./Components/PlayerForm";
import MatchesList from "./Components/MatchesList";
import MatchForm from "./Components/MatchForm";
import TeamForm from "./Components/TeamForm";
import TeamsList from "./Components/TeamsList";

function App() {
  return (
    <Router>
      <div className="App min-vh-100 bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top" style={{ backgroundColor: '#1a237e' }}>
          <div className="container">
            <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center" to="/">
              <i className="bi bi-trophy-fill me-2"></i>
              Matchday Madness
            </Link>

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav align-items-center">
                <li className="nav-item">
                  <Link className="nav-link px-3 d-flex align-items-center" to="/matches">
                    <i className="bi bi-calendar-event-fill me-2"></i> Matches
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 d-flex align-items-center" to="/players">
                    <i className="bi bi-person-fill me-2"></i> Players
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 d-flex align-items-center" to="/teams">
                    <i className="bi bi-people-fill me-2"></i> Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 d-flex align-items-center" to="/about">
                    <i className="bi bi-info-circle-fill me-2"></i> About
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <button className="btn btn-light px-4 rounded-pill shadow-sm">
                    Sign Up
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container py-4">
          <Routes>
            <Route path="/players" element={<PlayersList />} />
            <Route path="/players/new" element={<PlayerForm />} />
            <Route path="/players/edit/:id" element={<PlayerForm />} />
            <Route path="/matches" element={<MatchesList />} />
            <Route path="/matches/new" element={<MatchForm />} />
            <Route path="/matches/edit/:id" element={<MatchForm />} />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/teams/new" element={<TeamForm />} />
            <Route path="/teams/edit/:id" element={<TeamForm />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold mb-4">
            Welcome to Matchday Madness!
          </h1>
          <p className="lead text-muted mb-4">
            Your ultimate platform for managing football matches, teams, and player information.
            Experience the game like never before.
          </p>
          <div className="d-flex gap-3">
            <Link to="/matches" className="btn btn-primary btn-lg px-4 rounded-pill">
              <i className="bi bi-calendar-event-fill me-2"></i>
              View Matches
            </Link>
            <Link to="/teams" className="btn btn-outline-primary btn-lg px-4 rounded-pill">
              <i className="bi bi-people-fill me-2"></i>
              Explore Teams
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="p-3 bg-white rounded-4 shadow-lg">
            <img 
              src="/yamal2.jpg" 
              alt="Football" 
              className="img-fluid rounded-3"
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
