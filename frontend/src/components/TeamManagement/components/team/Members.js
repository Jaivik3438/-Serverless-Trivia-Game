import * as React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paper, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useContext } from "react";
import { TeamContext } from "../../contexts/TeamContext";
import InviteMember from "./InviteMember";
import { promoteAdmin, removeMember } from "../../services/TeamClient";
import { Alert, AlertTitle } from "@mui/material";
import { Button } from "@mui/material";

const Members = () => {
  const { selectedTeam, setSelectedTeam } = useContext(TeamContext);
  const [removeMemberErr, setRemoveMemberErr] = useState(false);
  const [removeMemberSucc, setRemoveMemberSucc] = useState(false);

  const [makeAdminErr, setMakeAdminErr] = useState(false);
  const [makeAdminSucc, setMakeAdminSucc] = useState(false);
  const alertTimeout = 15000;

  const handleRemoveMember = (member) => {
    removeMember(member.email, localStorage.getItem("team"))
      .then((res) => {
        console.log(res);
        if (res?.data?.success) {
          setRemoveMemberErr(false);
          setRemoveMemberSucc(true);
          setTimeout(() => {
            setRemoveMemberSucc(false);
          }, alertTimeout);

          const updatedMembers = selectedTeam.members.filter(
            (mem_) => mem_.email !== member.email
          );
          setSelectedTeam({ ...selectedTeam, members: [...updatedMembers] });
        } else throw new Error(res.data.msg || "");
      })
      .catch((err) => {
        console.log(
          `Unable to remove ${member.email} from ${localStorage.getItem(
            "team"
          )}`
        );
        setRemoveMemberErr(true);
        setRemoveMemberSucc(false);
        setTimeout(() => {
          setRemoveMemberErr(false);
        }, 20000);
        console.log(err);
      });
  };

  const handleMakeAdmin = (member) => {
    promoteAdmin(member.email, localStorage.getItem("team"))
      .then((res) => {
        console.log(res);
        if (res?.data?.success) {
          setMakeAdminErr(false);
          setMakeAdminSucc(true);
          setTimeout(() => {
            setMakeAdminSucc(false);
          }, alertTimeout);

          const updatedMembers = selectedTeam.members.map((mem) => {
            if (mem.email === member.email) {
              mem.role = "admin";
            }
            return mem;
          });

          setSelectedTeam({ ...selectedTeam, members: updatedMembers });
        } else throw new Error(res.data.msg || "");
      })
      .catch((err) => {
        console.log(`Unable to make ${member.email} admin`);
        setMakeAdminErr(true);
        setMakeAdminSucc(false);
        setTimeout(() => {
          setMakeAdminErr(false);
        }, alertTimeout);
        console.log(err);
      });
  };

  const renderMembers = () => {
    return selectedTeam?.members?.map((member) => (
      <ListItem
        divider={<Divider />}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={(e) => handleRemoveMember(member)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={member.name} secondary={member.role} />
        <ListItemText
          primary={""}
          secondary={member.email}
          sx={{ textAlign: "right" }}
        />
        {member.role !== "admin" ? (
          <Button
            edge="end"
            aria-label="Make the member as admin"
            onClick={(e) => handleMakeAdmin(member)}
          >
            Make Admin
          </Button>
        ) : null}
      </ListItem>
    ));
  };

  return (
    <>
      {removeMemberErr && (
        <Alert severity="error" width={"100%"}>
          <AlertTitle>Something went wrong</AlertTitle>
          Unable to remove the member
        </Alert>
      )}
      {removeMemberSucc && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Member removed
        </Alert>
      )}
      {makeAdminErr && (
        <Alert severity="error" width={"100%"}>
          <AlertTitle>Something went wrong</AlertTitle>
          Unable to promote to admin
        </Alert>
      )}
      {makeAdminSucc && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Member promoted to admin
        </Alert>
      )}
      <Grid component={Paper} width={"100%"}>
        <Stack direction={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
          <Stack direction={"column"}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              paddingTop={"20px"}
              paddingLeft={"20px"}
            >
              Members
            </Typography>
            <Typography
              variant="h8"
              gutterBottom
              component="div"
              color={"gray"}
              paddingLeft={"20px"}
              paddingBottom={"20px"}
            >
              Click on delete icon to remove a member
            </Typography>
          </Stack>
          <InviteMember />
        </Stack>
        <Divider />
        <List>{renderMembers()}</List>
      </Grid>
    </>
  );
};

export default Members;
