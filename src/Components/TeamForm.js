// TeamForm.js
import React, { useState, useEffect } from "react";
import { createTeam, getTeamById, updateTeam } from "../Services/api";
import { useParams, useNavigate } from "react-router-dom";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input
      type={type}
      className="form-control"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default function TeamForm() {
  const [formData, setFormData] = useState({
    name: "",
    league: "",
    coach: "",
    formation: "",
    stadium: "",
    matchesPlayed: "",
    wins: "",
    loses: "",
    draws: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          const team = await getTeamById(id);
          setFormData({
            name: team.name || "",
            league: team.league || "",
            coach: team.coach || "",
            formation: team.formation || "",
            stadium: team.stadium || "",
            matchesPlayed:
              team.matchesPlayed !== null ? team.matchesPlayed.toString() : "",
            wins: team.wins !== null ? team.wins.toString() : "",
            loses: team.loses !== null ? team.loses.toString() : "",
            draws: team.draws !== null ? team.draws.toString() : "",
          });
        }
      } catch (error) {
        console.error("Failed to load team:", error);
        setError("Failed to load team data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const teamData = {
        name: formData.name,
        league: formData.league,
        coach: formData.coach,
        formation: formData.formation,
        stadium: formData.stadium,
        matchesPlayed: formData.matchesPlayed
          ? parseInt(formData.matchesPlayed, 10)
          : 0,
        wins: formData.wins ? parseInt(formData.wins, 10) : 0,
        loses: formData.loses ? parseInt(formData.loses, 10) : 0,
        draws: formData.draws ? parseInt(formData.draws, 10) : 0,
      };
      if (id) {
        await updateTeam(id, teamData);
      } else {
        await createTeam(teamData);
      }
      navigate("/teams");
    } catch (error) {
      console.error("Failed to save team:", error);
      setError("Failed to save team. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                {id ? "Edit Team" : "Add New Team"}
              </h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <InputField
                  label="Team Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter team name"
                />
                <InputField
                  label="League"
                  name="league"
                  value={formData.league}
                  onChange={handleChange}
                  placeholder="Enter league"
                />
                <InputField
                  label="Coach"
                  name="coach"
                  value={formData.coach}
                  onChange={handleChange}
                  placeholder="Enter coach name"
                />
                <InputField
                  label="Formation"
                  name="formation"
                  value={formData.formation}
                  onChange={handleChange}
                  placeholder="Enter formation"
                />
                <InputField
                  label="Stadium"
                  name="stadium"
                  value={formData.stadium}
                  onChange={handleChange}
                  placeholder="Enter stadium name"
                />
                <InputField
                  type="number"
                  label="Matches Played"
                  name="matchesPlayed"
                  value={formData.matchesPlayed}
                  onChange={handleChange}
                  placeholder="Enter matches played"
                />
                <InputField
                  type="number"
                  label="Wins"
                  name="wins"
                  value={formData.wins}
                  onChange={handleChange}
                  placeholder="Enter wins"
                />
                <InputField
                  type="number"
                  label="Loses"
                  name="loses"
                  value={formData.loses}
                  onChange={handleChange}
                  placeholder="Enter loses"
                />
                <InputField
                  type="number"
                  label="Draws"
                  name="draws"
                  value={formData.draws}
                  onChange={handleChange}
                  placeholder="Enter draws"
                />
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {id ? "Update Team" : "Create Team"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/teams")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
