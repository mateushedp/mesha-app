import React from "react";
import { useHistory } from "react-router";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Actions from "../Actions/Actions";
import "./SuggestedPlaylist.css";

function SuggestedPlaylist(props) {
  const handleData = props.handleData;
  const callSpotify = props.callSpotify;
  const setLoading = props.setLoading;
  const loading = props.loading;
  const genre = props.genre;
  const randomTracks = props.randomTracks;
  const history = useHistory();
  return (
    <>
      <Actions
        handleData={handleData}
        callSpotify={callSpotify}
        setLoading={setLoading}
        history={history}
      />
      <div className="suggested-playlist">
        {!loading && (
          <List className="tracklist" subheader={<ListSubheader disableSticky>Gênero recomendado: {genre}</ListSubheader>}>
              {randomTracks.map(song => {
                return <ListItem divider key={song.track.id}>{song.track.artists[0].name + " - " + song.track.name}</ListItem>
              })}
          </List>

        )}

        {loading && (
          <CircularProgress />
        )}
      </div>
    </>
  )
}

export default SuggestedPlaylist;