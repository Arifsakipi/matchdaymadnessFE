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
    <div className="col-md-4 mb-4">
      <div className="card shadow">
        {" "}
        {/* Make sure this div has class "card shadow" */}
        <div className="card-body">
          <h5 className="card-title text-center">
            {getTeamName(match.homeTeamid)} vs {getTeamName(match.awayTeamid)}
          </h5>
          <p className="card-text text-center">
            Date: {new Date(match.date).toLocaleDateString()}
          </p>
          <p className="card-text text-center">Stadium: {match.stadium}</p>
          <p className="card-text text-center">Result: {match.result}</p>
          <p className="card-text text-center">Status: {match.status}</p>
          <div className="d-flex justify-content-center">
            <Link
              to={`/matches/edit/${match.id}`}
              className="btn btn-sm btn-outline-secondary me-2"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(match.id)}
              className="btn btn-sm btn-outline-danger"
            >
              Delete
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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Matches List</h2>
        <Link to="/matches/new" className="btn btn-primary">
          Add New Match
        </Link>
      </div>
      <div className="row">
        {matches.length === 0 ? (
          <div className="alert alert-info">
            No matches available. Add a new match to get started.
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
