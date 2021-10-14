import React from "react";
import { useHistory } from "react-router";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Delete from "@material-ui/icons/Delete";
import './Playlist.css';

function Playlist(props) {
  const history = useHistory();
  const list = props.savedList;
  const index = props.index;
  let date = new Date(list.date);
  date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

  function removeList() {
    localStorage.removeItem(`Playlist ${index}`);
    history.push('/lists');
  }
  return (
    <List className="tracklist">
      <div className="saved-list-header">
        <div className="saved-list-header-left">
          <p>{date}</p>
          <p>{list.city}, {list.temperature}º</p>
        </div>
        <div className="saved-list-header-right">
          <p>{list.genre}</p>
        </div>
        
        <div className="saved-list-header-corner">
          <IconButton onClick={() => removeList()}>
            <Delete style={{fontSize: '34px', color: 'white'}}/>
          </IconButton>
        </div>
      </div>
      {
        list.tracks.map(track => {
          return (
            <ListItem divider>
              {track.artist} - {track.name}
            </ListItem>
          )
        })
      }
    </List>
  )
}

export default Playlist;