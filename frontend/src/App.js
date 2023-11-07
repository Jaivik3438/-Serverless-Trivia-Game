import { BrowserRouter, Route, Routes } from "react-router-dom";
// import axios from "axios";
// import { FirebaseAppProvider } from "reactfire";
import "./App.css";
import Statistics from "./components/UserProfileManagement/Statistics";
import GameList from "./components/Trivia-Game-Lobby/GameList";

/* Profile Management */
import Home from "./components/Dashboard/Home";
// import Profile from "./components/UserProfileManagement/Profile";
import ProfileWrapper from "./components/UserProfileManagement/Profile";
import Dashboard from "./Pages/Dashboard";
import Verification from "./Pages/Verification";
import Profile from "./components/UserProfileManagement/Profile";
// import UserStatistics from "./components/UserProfileManagement/UserStatistics";
import GameForm from "./components/Administrator/CreateTriviaGames";
import AdminGameList from "./components/Administrator/AdminGameList";
import QuestionList from "./components/Administrator/Questions";
import GameList2 from "./components/Administrator/AdminGameList2";
import EditGamePage from "./components/Administrator/EditGame";
import Chat from "./components/VirtualAssistance/Chat";
import GameExperince from "./components/GameExperince/GameExperince";
import GamePage from "./components/GameExperince/GamePage";
import Quiz from "./components/GameExperince/Quiz";
import Logout from "./components/Logout";
import AdminHome from "./components/Administrator/AdminHome";
import Quiz2 from "./components/GameExperince/Quiz2";
import Team from "./components/TeamManagement/views/Team";
import Leaderboard from "./components/GameExperince/Leaderboard";
import InviteForm from "./components/TeamManagement/Team-Invite";
import CompareArchivements from "./components/UserProfileManagement/UserArchivements";
import UserGoals from "./components/UserProfileManagement/UserArchivements";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<Home/>} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/verify" element={<Verification />} />

        {/* Module : User Profile Management start */}
        <Route path="/*" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/team-management" element={<Team />} />
        <Route path="/team-invite" element={<InviteForm />} />
        <Route path="/comparision" element={<UserGoals />} />

        {/* User Profile Management end */}

        {/* Module : Trivia Game Lobby start */}
        <Route exact path="/GameList" element={<GameList />} />
        {/*Trivia Game Lobby end */}

        {/* Module : Trivia Content Management start */}
        <Route exact path="/AdminHome" element={<AdminHome />} />
        <Route exact path="/GameForm" element={<GameForm />} />
        {/* <Route exact path="/AdminGameList" element={<AdminGameList />} /> */}
        <Route exact path="/AdminGameList2" element={<GameList2 />} />
        <Route exact path="/QuestionsList" element={<QuestionList />} />
        <Route exact path="/EditGame" element={<EditGamePage />} />
        {/*Trivia Content Management end */}

        <Route exact path="/GameExperince" element={<GameExperince />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* <Route exact path="/GamePage" element={<GamePage />} /> */}
        <Route exact path="/Quiz" element={<Quiz />} />
        <Route exact path="/Quiz2" element={<Quiz2 />} />
        <Route exact path="/Logout" element={<Logout />} />
      </Routes>
      {/* Virutual Assistance Path */}
      {/* Virutual Assistance, does not need path*/}

      <Chat />
    </BrowserRouter>
    // </FirebaseAppProvider>
  );
}

export default App;
