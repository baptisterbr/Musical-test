import React from 'react';

const HomeDefault = (props) => {



    return <>
        <div>
            <h2>Liste des joueurs :</h2>
            <div className="players-container">
                {props.players.map(player => (
                    <div className="player-info">{player.id + ". " + player.name}</div>
                ))}
            </div>
        </div>
        <button onClick={props.handleSubmitLoad}>Lancer la partie</button>
    </>
}

export default HomeDefault;