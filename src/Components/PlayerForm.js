import React, { useState, useEffect } from 'react';
import { createPlayer, getPlayerById, updatePlayer } from '../Services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeams } from '../Services/api';

export default function PlayersForm() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    age: '',
    teamsid: '' // Changed to match backend model
  });

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);
        
        if (id) {
          const player = await getPlayerById(id);
          setFormData({
            name: player.name,
            position: player.position,
            age: player.age ? new Date(player.age).toISOString().split('T')[0] : '',
            teamsid: player.teamsid ? player.teamsid.toString() : ''
          });
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.teamsid) {
      setError('Please select a team');
      return;
    }

    try {
      const playerData = {
        name: formData.name,
        position: formData.position,
        age: new Date(formData.age).toISOString(),
        teamsid: parseInt(formData.teamsid, 10)
      };

      if (id) {
        playerData.id = parseInt(id, 10);
      }

      console.log('Submitting player data:', playerData);

      if (id) {
        await updatePlayer(id, playerData);
      } else {
        await createPlayer(playerData);
      }
      navigate('/players');
    } catch (error) {
      console.error('Failed to save player:', error);
      setError('Failed to save player. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
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
                {id ? 'Edit Player' : 'Add New Player'}
              </h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter player's name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="position" className="form-label">Position</label>
                  <input
                    type="text"
                    className="form-control"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    placeholder="Enter player's position"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="teamsid" className="form-label">Team</label>
                  <select
                    className="form-control"
                    id="teamsid"
                    name="teamsid"
                    value={formData.teamsid}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a team</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {id ? 'Update Player' : 'Create Player'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/players')}
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