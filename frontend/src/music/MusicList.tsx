import { useEffect, useState } from "react";
import type { Music } from "./utils";
import { MusicItem } from "./MusicItem";
import { MusicForm } from "./MusicForm";

export const MusicList = () => {
  const [music, setMusic] = useState<Music[]>([]);

  useEffect(() => {
    async function fetchMusic() {
      const resposne = await fetch("http://localhost:4000/music", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result: MusicList = await resposne.json();
      setMusic(result.data);
    }

    fetchMusic();
  }, []);

  const handleAddMusic = (newMusic: Music) => {
    setMusic((prevMusic) => [...prevMusic, newMusic]);
  };

  return (
    <>
      <ul className="music-list">
        {music.map((musicItem) => (
          <MusicItem key={musicItem.id} music={musicItem} />
        ))}
      </ul>
      <MusicForm onAdd={handleAddMusic} />
    </>
  );
};

interface MusicList {
  headers: string[];
  data: Music[];
}
