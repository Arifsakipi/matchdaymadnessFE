import React, { useState, useEffect } from "react";
import {
  createMatch,
  getMatchById,
  updateMatch,
  getTeams,
} from "../Services/api";
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
      required
    />
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <select
      className="form-control"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default function MatchForm() {
  const [formData, setFormData] = useState({
    date: "",
    stadium: "",
    homeTeamid: "",
    awayTeamid: "",
    result: "",
    status: "",
  });

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);
        if (id) {
          const match = await getMatchById(id);
          setFormData({
            date: match.date
              ? new Date(match.date).toISOString().split("T")[0]
              : "",
            stadium: match.stadium,
            homeTeamid: match.homeTeamid ? match.homeTeamid.toString() : "",
            awayTeamid: match.awayTeamid ? match.awayTeamid.toString() : "",
            result: match.result,
            status: match.status,
          });
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.homeTeamid || !formData.awayTeamid) {
      setError("Please select both home and away teams.");
      return;
    }

    try {
      const matchData = {
        date: new Date(formData.date).toISOString(),
        stadium: formData.stadium,
        homeTeamid: parseInt(formData.homeTeamid, 10),
        awayTeamid: parseInt(formData.awayTeamid, 10),
        result: formData.result,
        status: formData.status,
      };

      if (id) {
        matchData.id = parseInt(id, 10);
      }

      console.log("Submitting match data:", matchData);

      if (id) {
        await updateMatch(id, matchData);
      } else {
        await createMatch(matchData);
      }
      navigate("/matches");
    } catch (error) {
      console.error("Failed to save match:", error);
      setError("Failed to save match. Please try again.");
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
                {id ? "Edit Match" : "Add New Match"}
              </h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <InputField
                  label="Match Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                <InputField
                  label="Stadium"
                  name="stadium"
                  value={formData.stadium}
                  onChange={handleChange}
                  placeholder="Enter Stadium"
                />
                <SelectField
                  label="Home Team"
                  name="homeTeamid"
                  value={formData.homeTeamid}
                  onChange={handleChange}
                  options={teams}
                  placeholder="Select a home team"
                />
                <SelectField
                  label="Away Team"
                  name="awayTeamid"
                  value={formData.awayTeamid}
                  onChange={handleChange}
                  options={teams}
                  placeholder="Select an away team"
                />
                <InputField
                  label="Result"
                  name="result"
                  value={formData.result}
                  onChange={handleChange}
                  placeholder="Enter Match Result"
                />
                <InputField
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  placeholder="Enter Match Status"
                />
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {id ? "Update Match" : "Create Match"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/matches")}
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
