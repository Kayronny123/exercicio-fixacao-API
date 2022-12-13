import React, { useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

const playlistsLocal = [
  {
    id: 1,
    name: "Playlist 1"
  },
  {
    id: 2,
    name: "Playlist 2"
  },
  {
    id: 3,
    name: "Playlist 3"
  },
  {
    id: 4,
    name: "Playlist 4"
  }
];
function Playlists() {
  const [playlists, setPlaylists] = useState(playlistsLocal);
  const createPlaylist = () => {
    const url =
      `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`;
    
      const config = { headers: { Authorization: "kayro72-barbosa-b" } };
    axios
      .get(url, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    createPlaylist();
  }, []);
  return (
    <div>
      {playlists.map((playlist) => {
        return <Musicas key={playlist.id} playlist={playlist} />;
      })}
    </div>
  );
}

export default Playlists;
