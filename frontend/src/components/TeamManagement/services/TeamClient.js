import axios from "axios";

const TeamClient = axios.create({
  // TODO: Remove the or condition once env variables are coded
  baseURL:
    process.env.REACT_APP_TEAM_SERVICE_URL ||
    "https://us-central1-prefab-pixel-391815.cloudfunctions.net",
});

export const promoteAdmin = async (email, team) => {
  return await TeamClient.post(`https://us-central1-prefab-pixel-391815.cloudfunctions.net/promote_admin`, {
    email,
    team,
  });
};

export const getTeamDetails = async (team) => {
  return await TeamClient.post(`/read_team_details`, {
    team,
  });
};

export const removeMember = async (email, team) => {
  return await TeamClient.post(`/remove_member`, {
    email,
    team,
  });
};
