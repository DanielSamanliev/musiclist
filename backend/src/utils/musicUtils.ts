import fs from "fs";

export const getMusic = () => {
  try {
    const file = fs
      .readFileSync("data.csv", "utf8")
      .trim()
      .split("\n")
      .map((row) => row.split(","));

    const headers = file[0];
    const data = file.splice(1).map((music) => {
      return headers.reduce((obj, cell, index) => {
        obj[cell] = music[index];
        return obj;
      }, {} as { [key: string]: string });
    });

    return { headers, data };
  } catch (error) {
    console.error(error);
    return { headers: [], data: [] };
  }
};

export const updateMusic = (newMusic: Music) => {
  try {
    // Probably best to just rewrite the entire file but trying to simulate adding to db
    const headers = fs
      .readFileSync("data.csv", "utf-8")
      .split("\n")[0]
      .split(",");

    const newData = headers.map((header) => newMusic[header as keyof Music]);

    fs.appendFileSync("data.csv", "\n" + newData.join(","));
  } catch (error) {
    console.error("Failed adding: ", error);
  }
};

export const validateMusicData = (music: Music) => {
  const requiredFields = Object.keys(music);

  for (let index = 0; index < requiredFields.length; index++) {
    const field = requiredFields[index] as keyof Music;
    if (
      !music[field] ||
      typeof music[field] !== "string" ||
      music[field].trim() === ""
    ) {
      return false;
    }
  }

  return true;
};

interface Music {
  id: string;
  name: string;
  artist: string;
  genre: string;
}
