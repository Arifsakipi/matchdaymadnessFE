import React, { useState, useEffect } from "react";
import { getPlayers, deletePlayer } from "../Services/api";
import { Link } from "react-router-dom";
import { getTeams } from "../Services/api";

export default function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [playersData, teamsData] = await Promise.all([
          getPlayers(),
          getTeams(),
        ]);
        setPlayers(playersData);
        setTeams(teamsData);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await deletePlayer(id);
        setPlayers(players.filter((player) => player.id !== id));
      } catch (error) {
        console.error("Failed to delete player:", error);
        setError("Failed to delete player. Please try again.");
      }
    }
  };

  const getTeamName = (teamsid) => {
    if (!teamsid) return "No Team";
    const team = teams.find((team) => team.id === teamsid);
    return team ? team.name : "No Team";
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
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Players</h2>
          <p className="text-muted mb-0">Manage your team players</p>
        </div>
        <Link to="/players/new" className="btn btn-primary rounded-pill px-4">
          <i className="bi bi-plus-lg me-2"></i>
          Add Player
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger rounded-3 shadow-sm" role="alert">
          <i className="bi bi-exclamation-circle-fill me-2"></i>
          {error}
        </div>
      )}

      <div className="table-responsive rounded-3 shadow-sm">
        <table className="table table-hover mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th className="border-0 px-4 py-3">Name</th>
              <th className="border-0 px-4">Position</th>
              <th className="border-0 px-4">Age</th>
              <th className="border-0 px-4">Team</th>
              <th className="border-0 px-4 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  No players available. Add a new player to get started.
                </td>
              </tr>
            ) : (
              players.map((player) => (
                <tr key={player.id}>
                  <td className="px-4 py-3">
                    <div className="fw-semibold">{player.name}</div>
                  </td>
                  <td className="px-4">
                    <span className="badge bg-primary rounded-pill px-3">
                      {player.position}
                    </span>
                  </td>
                  <td className="px-4">
                    {new Date(player.age).toLocaleDateString()}
                  </td>
                  <td className="px-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-people-fill me-2 text-muted"></i>
                      {getTeamName(player.teamsid)}
                    </div>
                  </td>
                  <td className="px-4 text-end">
                    <Link
                      to={`/players/edit/${player.id}`}
                      className="btn btn-outline-primary btn-sm rounded-pill px-3 me-2"
                    >
                      <i className="bi bi-pencil-fill me-1"></i> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="btn btn-outline-danger btn-sm rounded-pill px-3"
                    >
                      <i className="bi bi-trash-fill me-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}