// // TeamsList.js
// import React, { useState, useEffect } from "react";
// import { getTeams, deleteTeam } from "../Services/api"; // Import API calls
// import { Link } from "react-router-dom";

// export default function TeamsList() {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const teamsData = await getTeams();
//         setTeams(teamsData);
//       } catch (error) {
//         console.error("Failed to load teams:", error);
//         setError("Failed to load teams. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this team?")) {
//       try {
//         await deleteTeam(id);
//         setTeams(teams.filter((team) => team.id !== id));
//       } catch (error) {
//         console.error("Failed to delete team:", error);
//         setError("Failed to delete team. Please try again.");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mt-4">
//         <div className="d-flex justify-content-center">
//           <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Teams List</h2>
//         <Link to="/teams/new" className="btn btn-primary">
//           Add New Team
//         </Link>
//       </div>

//       {error && (
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       )}

//       {teams.length === 0 ? (
//         <div className="alert alert-info">
//           No teams available. Add a new team to get started.
//         </div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-striped table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>Name</th>
//                 <th>League</th>
//                 <th>Coach</th>
//                 <th>Formation</th>
//                 <th>Stadium</th>
//                 <th>Matches Played</th>
//                 <th>Wins</th>
//                 <th>Loses</th>
//                 <th>Draws</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {teams.map((team) => (
//                 <tr key={team.id}>
//                   <td>{team.name}</td>
//                   <td>{team.league}</td>
//                   <td>{team.coach}</td>
//                   <td>{team.formation}</td>
//                   <td>{team.stadium}</td>
//                   <td>{team.matchesPlayed}</td>
//                   <td>{team.wins}</td>
//                   <td>{team.loses}</td>
//                   <td>{team.draws}</td>
//                   <td>
//                     <div className="btn-group">
//                       <Link
//                         to={`/teams/edit/${team.id}`}
//                         className="btn btn-warning btn-sm"
//                       >
//                         Edit
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(team.id)}
//                         className="btn btn-danger btn-sm ms-2"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { getTeams, deleteTeam } from "../Services/api";
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
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Teams</h2>
          <p className="text-muted mb-0">Manage your football teams</p>
        </div>
        <Link to="/teams/new" className="btn btn-primary rounded-pill px-4">
          <i className="bi bi-plus-lg me-2"></i>
          Add Team
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
              <th className="border-0 px-4">League</th>
              <th className="border-0 px-4">Coach</th>
              <th className="border-0 px-4">Formation</th>
              <th className="border-0 px-4">Stadium</th>
              <th className="border-0 px-4 text-center">Stats</th>
              <th className="border-0 px-4 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  No teams available. Add a new team to get started.
                </td>
              </tr>
            ) : (
              teams.map((team) => (
                <tr key={team.id}>
                  <td className="px-4 py-3">
                    <div className="fw-semibold">{team.name}</div>
                  </td>
                  <td className="px-4">
                    <span className="badge bg-primary rounded-pill px-3">
                      {team.league}
                    </span>
                  </td>
                  <td className="px-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person-fill me-2 text-muted"></i>
                      {team.coach}
                    </div>
                  </td>
                  <td className="px-4">{team.formation}</td>
                  <td className="px-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill me-2 text-muted"></i>
                      {team.stadium}
                    </div>
                  </td>
                  <td className="px-4 text-center">
                    <div className="d-flex justify-content-center gap-3">
                      <span className="text-success" title="Wins">
                        W: {team.wins}
                      </span>
                      <span className="text-danger" title="Losses">
                        L: {team.loses}
                      </span>
                      <span className="text-warning" title="Draws">
                        D: {team.draws}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 text-end">
                    <Link
                      to={`/teams/edit/${team.id}`}
                      className="btn btn-outline-primary btn-sm rounded-pill px-3 me-2"
                    >
                      <i className="bi bi-pencil-fill me-1"></i> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(team.id)}
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
