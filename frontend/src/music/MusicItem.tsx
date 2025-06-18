import type { Music } from "./utils";

export const MusicItem = ({ music }: Props) => {
  return (
    <li key={music.id} className="music-item">
      <div>
        <strong>{music.name}</strong> — {music.artist}{" "}
        <span style={{ fontSize: "0.9em", color: "#666" }}>
          / {music.genre}
        </span>
      </div>
    </li>
  );
};

interface Props {
  music: Music;
}
