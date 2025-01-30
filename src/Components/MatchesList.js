 // MatchesList.js
import React, { useState, useEffect } from "react";
import { getMatches, deleteMatch } from "../Services/api";
import { Link } from "react-router-dom";
import { getTeams } from "../Services/api";

const MatchCard = ({ match, teams, handleDelete }) => {
  const getTeamName = (teamId) => {
    if (!teamId) return "N/A";
    const team = teams.find((team) => team.id === teamId);
    return team ? team.name : "N/A";
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm hover-shadow border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-primary">{match.status}</span>
            <small className="text-muted">
              {new Date(match.date).toLocaleDateString()}
            </small>
          </div>
          
          <div className="text-center mb-3">
            <div className="row align-items-center">
              <div className="col">
                <h6 className="mb-0">{getTeamName(match.homeTeamid)}</h6>
              </div>
              <div className="col-auto">
                <span className="h5 fw-bold text-primary">{match.result || "VS"}</span>
              </div>
              <div className="col">
                <h6 className="mb-0">{getTeamName(match.awayTeamid)}</h6>
              </div>
            </div>
          </div>

          <div className="text-center mb-3">
            <i className="bi bi-geo-alt-fill text-muted me-2"></i>
            <small className="text-muted">{match.stadium}</small>
          </div>

          <div className="d-flex justify-content-center gap-2">
            <Link
              to={`/matches/edit/${match.id}`}
              className="btn btn-outline-primary btn-sm rounded-pill px-3"
            >
              <i className="bi bi-pencil-fill me-1"></i> Edit
            </Link>
            <button
              onClick={() => handleDelete(match.id)}
              className="btn btn-outline-danger btn-sm rounded-pill px-3"
            >
              <i className="bi bi-trash-fill me-1"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MatchesList() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [matchesData, teamsData] = await Promise.all([
          getMatches(),
          getTeams(),
        ]);
        setMatches(matchesData);
        setTeams(teamsData);
      } catch (err) {
        console.error("Failed to load matches:", err);
        setError("Failed to load matches. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      try {
        await deleteMatch(id);
        setMatches(matches.filter((match) => match.id !== id));
      } catch (error) {
        console.error("Failed to delete match:", error);
        setError("Failed to delete match. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Matches</h2>
          <p className="text-muted mb-0">Manage your football matches</p>
        </div>
        <Link to="/matches/new" className="btn btn-primary rounded-pill px-4">
          <i className="bi bi-plus-lg me-2"></i>
          Add Match
        </Link>
      </div>

      <div className="row g-4">
        {matches.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info rounded-3 shadow-sm">
              <i className="bi bi-info-circle-fill me-2"></i>
              No matches available. Add a new match to get started.
            </div>
          </div>
        ) : (
          matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              teams={teams}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
