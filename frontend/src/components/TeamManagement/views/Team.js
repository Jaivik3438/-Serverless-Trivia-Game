import { Stack } from "@mui/material";
import NavBar from "../components/NavBar";
import AllTeams from "../components/team/AllTeams";
import Members from "../components/team/Members";
import { TeamContext } from "../contexts/TeamContext";
import { useState } from "react";
import CommonNavbar from "../../CommonNavbar";

const Team = () => {
  const [selectedTeam, setSelectedTeam] = useState({});

  return (
    <TeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>
      <CommonNavbar />
      <br />
      <br />

      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        margin={"5vh 20vh 5vh 20vh"}
      >
        <AllTeams />
        <Members />
      </Stack>
    </TeamContext.Provider>
  );
};

export default Team;
