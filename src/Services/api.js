import axios from "axios";

// Define the base URL for the API
const API_BASE_URL = "https://localhost:7276/api";

// Fetch all players
export const getPlayers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/PlayersControllerAPI/GetPlayer`);
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

// Fetch a player by ID
export const getPlayerById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/PlayersControllerAPI/GetPlayerById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching player:", error);
    throw error;
  }
};

// Create a new player
export const createPlayer = async (newPlayer) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/PlayersControllerAPI/CreatePlayer`, newPlayer);
    return response.data;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};

// Update an existing player
export const updatePlayer = async (id, updatedPlayer) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/PlayersControllerAPI/UpdatePlayer`, updatedPlayer);
    return response.data;
  } catch (error) {
    console.error("Error updating player:", error);
    throw error;
  }
};

// Delete a player by ID
export const deletePlayer = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/PlayersControllerAPI/DeletePlayer/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting player:", error);
    throw error;
  }
};

// Fetch all teams (NEW FUNCTION)
export const getTeams = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/TeamsControllerAPI/GetTeams`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

// Fetch all matches
export const getMatches = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/MatchesControllerAPI/GetMatches`);
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};


export const getMatchById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/MatchesControllerAPI/GetMatchById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match:", error);
    throw error;
  }
};

// Create a new match
export const createMatch = async (newMatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/MatchesControllerAPI/CreateMatch`, newMatch);
    return response.data;
  } catch (error) {
    console.error("Error creating match:", error);
    throw error;
  }
};

// Update an existing match
export const updateMatch = async (id, updatedMatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/MatchesControllerAPI/UpdateMatch`, updatedMatch);
    return response.data;
  } catch (error) {
    console.error("Error updating match:", error);
    throw error;
  }
};


// Delete a match by ID
export const deleteMatch = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/MatchesControllerAPI/DeleteMatch/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting match:", error);
    throw error;
  }
};



// Fetch a team by ID
export const getTeamById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/TeamsControllerAPI/GetTeamById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team:", error);
    throw error;
  }
};

// Create a new team
export const createTeam = async (newTeam) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/TeamsControllerAPI/CreateTeam`, newTeam);
    return response.data;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
};

// Update an existing team
export const updateTeam = async (id, updatedTeam) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/TeamsControllerAPI/UpdateTeam`, updatedTeam);
    return response.data;
  } catch (error) {
    console.error("Error updating team:", error);
    throw error;
  }
};

// Delete a team by ID
export const deleteTeam = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/TeamsControllerAPI/DeleteTeam/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting team:", error);
    throw error;
  }
};