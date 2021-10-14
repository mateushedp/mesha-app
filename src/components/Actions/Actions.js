import React from "react";
import { useHistory, useLocation } from "react-router";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import SaveIcon from '@material-ui/icons/Save';
import CachedIcon from '@material-ui/icons/Cached';
import "./Actions.css";

function Actions(props){
  const history = useHistory();
  const location = useLocation();
  const handleData = props.handleData;
  const callSpotify = props.callSpotify;
  const setLoading = props.setLoading;

  return(
    <div className="actions">
      <List>
        {location.pathname === "/" && (
        <>
          <ListItem button onClick={() => history.push('/lists')}>
            <ListItemIcon>
              <ArrowForwardIos style={{color: 'white'}}/>
            </ListItemIcon>
            Ver Playlists salvas
          </ListItem>
          <ListItem button onClick={() => handleData()}>
            <ListItemIcon>
              <SaveIcon style={{color: 'white'}}/>
            </ListItemIcon>
            Salvar Playlist
          </ListItem>
          <ListItem button onClick={() => {
            setLoading(true);
            callSpotify()
            }}>
            <ListItemIcon>
              <CachedIcon style={{color: 'white'}}/>
            </ListItemIcon>
            Gerar nova Playlist
        </ListItem>
      </>
        )}
      {location.pathname === "/lists" && (
        <>
          <ListItem button onClick={() => history.push('/')}>
            <ListItemIcon>
              <ArrowBackIos style={{color: 'white'}}/>
            </ListItemIcon>
            Voltar para Geração de Playlists
          </ListItem>
        </>
      )}
      </List>
    </div>
  )
}

export default Actions;