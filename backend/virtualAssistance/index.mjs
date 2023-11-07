import axios from "axios";

export const handler = async (event, context) => {
  const interpretations = event.interpretations;
  const intentName = interpretations[0].intent.name;
  const slots = interpretations[0].intent.slots;

  if (intentName === "Navigation") {
    const pageName = slots.destination?.value?.interpretedValue;

    console.log(pageName);

    const Navlinks = {
      login: "https://frontend-service-p4bza2qo7a-uc.a.run.app/",
      home: "https://frontend-service-p4bza2qo7a-uc.a.run.app/",
      profile: "https://frontend-service-p4bza2qo7a-uc.a.run.app/profile",
      TriviaLobby: "https://frontend-service-p4bza2qo7a-uc.a.run.app/GamePage",
      MyTeam:
        "https://frontend-service-p4bza2qo7a-uc.a.run.app/team-management",
      leaderboard:
        "https://frontend-service-p4bza2qo7a-uc.a.run.app/leaderboard",
    };

    const responseMessage = pageName
      ? `Sure! Here's the link to the ${pageName} page: ${Navlinks[pageName]}`
      : "I'm sorry, I couldn't determine the page name.";

    const response = {
      sessionState: {
        dialogAction: {
          type: "Close",
        },
        intent: {
          confirmationState: "Confirmed",
          name: intentName,
          state: "Fulfilled",
        },
      },
      messages: [
        {
          contentType: "PlainText",
          content: responseMessage,
        },
      ],
    };

    return response;
  } else if (intentName === "Score") {
    const teamName = slots.TeamName;
    const playerName = slots.PlayerName;
    const name =
      teamName?.value?.originalValue || playerName?.value?.originalValue;

    if (!name) {
      const responseMessage = "Please provide the name of the team or player.";

      const response = {
        sessionState: {
          dialogAction: {
            type: "ElicitSlot",
            intentName: intentName,
            slots: slots,
            slotToElicit: teamName ? "PlayerName" : "TeamName",
          },
          intent: {
            confirmationState: "None",
            name: intentName,
            state: "InProgress",
          },
        },
        messages: [
          {
            contentType: "PlainText",
            content: responseMessage,
          },
        ],
      };

      return response;
    } else {
      let responseMessage;
      let responseScore;

      try {
        const { data } = await axios.post(
          "https://us-central1-prefab-pixel-391815.cloudfunctions.net/read_team_details",
          {
            team: name,
          }
        );
        responseScore = data.data.points;
      } catch (error) {
        console.error("Error sending API request:", error);
      }

      responseMessage =
        responseScore !== null
          ? `The score for ${name} is ${responseScore}.`
          : `No score found for ${name}.`;

      const response = {
        sessionState: {
          dialogAction: {
            type: "Close",
          },
          intent: {
            confirmationState: "Confirmed",
            name: intentName,
            state: "Fulfilled",
          },
        },
        messages: [
          {
            contentType: "PlainText",
            content: responseMessage,
          },
        ],
      };

      return response;
    }
  }
};
