import React from "react";
import Playlist from "../Playlist/Playlist";
import Actions from "../Actions/Actions";
import "./Lists.css";

function Lists(){
  const count = localStorage.length;
  const playlistsArray = [];

  for (let i=0; i<count; i++){
    const savedList = JSON.parse(localStorage.getItem(`Playlist ${i+1}`));
    console.log(savedList);
    playlistsArray.push(<Playlist savedList={savedList} index={i+1} />);
  }

  return(
    <>
      <Actions />
      <div className="saved-lists">
        {playlistsArray}
      </div>
    </>
  )
}

export default Lists;