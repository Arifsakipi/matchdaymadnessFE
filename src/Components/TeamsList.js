// TeamsList.js
import React, { useState, useEffect } from "react";
import { getTeams, deleteTeam } from "../Services/api"; // Import API calls
import { Link } from "react-router-dom";

export default function TeamsList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error("Failed to load teams:", error);
        setError("Failed to load teams. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await deleteTeam(id);
        setTeams(teams.filter((team) => team.id !== id));
      } catch (error) {
        console.error("Failed to delete team:", error);
        setError("Failed to delete team. Please try again.");
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Teams List</h2>
        <Link to="/teams/new" className="btn btn-primary">
          Add New Team
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {teams.length === 0 ? (
        <div className="alert alert-info">
          No teams available. Add a new team to get started.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>League</th>
                <th>Coach</th>
                <th>Formation</th>
                <th>Stadium</th>
                <th>Matches Played</th>
                <th>Wins</th>
                <th>Loses</th>
                <th>Draws</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.name}</td>
                  <td>{team.league}</td>
                  <td>{team.coach}</td>
                  <td>{team.formation}</td>
                  <td>{team.stadium}</td>
                  <td>{team.matchesPlayed}</td>
                  <td>{team.wins}</td>
                  <td>{team.loses}</td>
                  <td>{team.draws}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to={`/teams/edit/${team.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(team.id)}
                        className="btn btn-danger btn-sm ms-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
