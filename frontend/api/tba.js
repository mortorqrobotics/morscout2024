import axios from "axios";
const BASE_URL = "https://www.thebluealliance.com/api/v3";

export const getEventTeamsNumbers = async () => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}/event/${import.meta.env.VITE_EVENT_KEY}/teams/simple`,
            {
              headers: {
                "X-TBA-Auth-Key": import.meta.env.VITE_API_KEY,
                "Content-Type": "application/json",
              },
            }
          );
          return data.map((team) => ({
            teamNumber: team.team_number,
            nickname: team.nickname
          }));
    } catch (error) {
        throw new Error(error)
    }

};

export const getEventMatches = async () => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}/event/${import.meta.env.VITE_EVENT_KEY}/matches/simple`,
            {
              headers: {
                "X-TBA-Auth-Key": import.meta.env.VITE_API_KEY,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data)
          return data.map((match) => ({
            red_team: match.alliances.red.team_keys,
            blue_team: match.blue.team_keys,
            matchNum: match.match_number
          }));
    } catch (error) {
        throw new Error(error)
    }
    
}