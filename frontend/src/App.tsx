import "./App.css";
import { ServerCheck } from "./ServerCheck";
import { MusicList } from "./music/MusicList";

function App() {
  return (
    <>
      <ServerCheck />
      <h1>My music</h1>
      <MusicList />
    </>
  );
}

export default App;
