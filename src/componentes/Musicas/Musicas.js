import React, { useState, useEffect } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica
} from "./styled";
import axios from "axios";

// const musicasLocal = [
//   {
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3"
//   },
//   {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3"
//   },
//   {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3"
//   }
// ];

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);
  const [artista, setArtista] = useState("");
  const [musica, setMusica] = useState("");
  const [url, setUrl] = useState("");
  // const currentPlayListId= props.playlist.id
  const handleChange = (event) => {
    setArtista(event.target.value);
  };
  const handleChange2 = (event) => {
    setMusica(event.target.value);
  };
  const handleChange3 = (event) => {
    setUrl(event.target.value);
  };
  //  console.log(artista,musica,url)
  const getPlaylistTracks = () => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`;

    const config = { headers: { Authorization: "kayro72-barbosa-b" } };
    axios
      .get(url, config)
      .then((res) => {
        setMusicas(res.data.result.tracks);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getPlaylistTracks();
  });

  const addTrackToPlayList = () => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`;
    const config = { headers: { Authorization: "kayro72-barbosa-b" } };
    const body = {
      name: musica,
      artist: artista,
      url: url
    };
    axios
      .post(url, body, config)
      .then((res) => {
        getPlaylistTracks(res);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const deleteTrackToPlaylist = (idMusica) => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${idMusica}`;
    const config = { headers: { Authorization: "kayro72-barbosa-b" } };
    axios
      .delete(url, config)
      .then((res) => {
        getPlaylistTracks(res);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => deleteTrackToPlaylist(musica.id)}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          onChange={handleChange}
          value={artista}
          placeholder="artista"
        />
        <InputMusica
          onChange={handleChange2}
          value={musica}
          placeholder="musica"
        />
        <InputMusica onChange={handleChange3} value={url} placeholder="url" />
        <Botao onClick={addTrackToPlayList}>Adicionar musica</Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
