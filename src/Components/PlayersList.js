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
        console.log("Fetched Players:", playersData);
        console.log("Fetched Teams:", teamsData);
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
    console.log("Looking for teamsid:", teamsid, "Type:", typeof teamsid);
    if (!teamsid) return "No Team";

    const team = teams.find((team) => team.id === teamsid);
    console.log("Found team:", team);
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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Players List</h2>
        <Link to="/players/new" className="btn btn-primary">
          Add New Player
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {players.length === 0 ? (
        <div className="alert alert-info">
          No players available. Add a new player to get started.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Age</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{new Date(player.age).toLocaleDateString()}</td>
                  <td>{getTeamName(player.teamsid)}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to={`/players/edit/${player.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(player.id)}
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
