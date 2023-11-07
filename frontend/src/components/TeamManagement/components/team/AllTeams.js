import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useContext } from "react";
import { TeamContext } from "../../contexts/TeamContext";
import CreateTeam from "./CreateTeam";
import { getTeamDetails } from "../../services/TeamClient";
import { Stack } from "@mui/material";
import { Divider } from "@mui/material";

const AllTeams = () => {
  const [data, setData] = useState([]);
  const { selectedTeam, setSelectedTeam } = useContext(TeamContext);
  const prepareData = ({
    name,
    gamesPlayed,
    losses,
    wins,
    points,
    members,
  }) => {
    return {
      name,
      members,
      stats: {
        gamesPlayed,
        losses,
        wins,
        points,
        winRatio:
          gamesPlayed === 0 ? "N/A" : parseFloat(wins / gamesPlayed).toFixed(2),
      },
    };
  };
  const TeamRow = (props) => {
    const { row } = props;

    return (
      <>
        <TableRow
          sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}
          onClick={() =>
            setSelectedTeam(selectedTeam.name === row.name ? {} : row)
          }
          selected={selectedTeam.name === row.name}
        >
          <TableCell width={"fit-content"}>
            <IconButton aria-label="expand row" size="small">
              {selectedTeam.name === row.name ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="left" width={"100%"}>
            {row.name}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse
              in={selectedTeam.name === row.name}
              timeout="auto"
              unmountOnExit
            >
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Stats
                </Typography>
                <Table size="small" aria-label="stats">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Played</TableCell>
                      <TableCell align="right">Won</TableCell>
                      <TableCell align="right">Lost</TableCell>
                      <TableCell align="right">Win Ratio</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="right">
                        {row.stats.gamesPlayed}
                      </TableCell>
                      <TableCell align="right">{row.stats.wins}</TableCell>
                      <TableCell align="right">{row.stats.losses}</TableCell>
                      <TableCell align="right">{row.stats.winRatio}</TableCell>
                      <TableCell align="right">{row.stats.points}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  useEffect(() => {
    //TODO: Fetch all teams from API
    getTeamDetails(localStorage.getItem("team"))
      .then((res) => {
        console.log(res);
        if (res?.data?.success && res?.data?.data) {
          // console.log(res.data.data)
          setData([
            {
              name: res.data.data.name,
              gamesPlayed: res.data.data.game_played,
              losses: res.data.data.losses,
              wins: res.data.data.wins,
              points: res.data.data.points,
              members: res.data.data.members,
            },
          ]);
        } else {
          console.log(
            `Unable to fetch details of team ${localStorage.getItem("team")}`
          );
          console.log(res?.data?.msg);
        }
      })
      .catch((err) => {
        console.log(
          `Unable to fetch details of team ${localStorage.getItem("team")}`
        );
        console.log(err);
      });
    // Static Data
    // setData([
    //   { name: "KXIP", gamesPlayed: 10, losses: 2, wins: 8, points: 100 },
    //   { name: "CSK", gamesPlayed: 10, losses: 3, wins: 7, points: 80 },
    //   { name: "RR", gamesPlayed: 8, losses: 7, wins: 1, points: 40 },
    //   { name: "RCB", gamesPlayed: 8, losses: 6, wins: 2, points: 30 },
    //   { name: "DD", gamesPlayed: 9, losses: 5, wins: 4, points: 45 },
    // ]);
  }, [selectedTeam]);

  return (
    <TableContainer component={Paper}>
                  <Stack direction={"row"} justifyContent={"space-evenly"} alignItems={"center"}
            >
              <Stack direction={"column"}>
                <Typography
                  variant="h4"
                  gutterBottom
                  component="div"
                  paddingTop={"20px"}
                  paddingLeft={"20px"}
                >
                  Teams
                </Typography>
                <Typography
                  variant="h8"
                  gutterBottom
                  component="div"
                  color={"gray"}
                  paddingLeft={"20px"}
                  paddingBottom={"20px"}
                >
                  Click on a team to select
                </Typography>
              </Stack>
              <CreateTeam />
            </Stack>
            <Divider />
      <Table aria-label="Team Stats">
        <TableHead />
        <TableBody>
          {data
            .map((team) => prepareData(team))
            .map((row) => (
              <TeamRow key={row.name} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllTeams;
