import { useState, type FormEvent } from "react";
import type { Music } from "./utils";
import { Input } from "../common/Input";

export const MusicForm = ({ onAdd }: Props) => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState({ name: "", artist: "", genre: "" });

  const validateField = (field: string, value: string): string => {
    if (!value.trim()) {
      return `${field} is required.`;
    }
    return "";
  };

  const validMusic = () => {
    const nameError = validateField("Song", name);
    const artistError = validateField("Artist", artist);
    const genreError = validateField("Genre", genre);

    setErrors({ name: nameError, artist: artistError, genre: genreError });

    return !nameError && !artistError && !genreError;
  };

  const handleAddMusic = async (e: FormEvent) => {
    e.preventDefault();

    if (!validMusic()) {
      return;
    }

    const response = await fetch("http://localhost:4000/music", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, artist, genre }),
    });

    if (response.status !== 201) {
      alert("Failed adding music. Try again later.");
      return;
    }

    const newMusic = await response.json();

    setName("");
    setArtist("");
    setGenre("");

    onAdd(newMusic);
  };

  return (
    <form className="music-form" onSubmit={handleAddMusic}>
      <Input label="Song" value={name} onChange={setName} error={errors.name} />
      <Input
        label="Artist"
        value={artist}
        onChange={setArtist}
        error={errors.artist}
      />
      <Input
        label="Genre"
        value={genre}
        onChange={setGenre}
        error={errors.genre}
      />
      <button
        className="submit-button"
        disabled={!name || !artist || !genre}
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

interface Props {
  onAdd: (newMusic: Music) => void;
}
