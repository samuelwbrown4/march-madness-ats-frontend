import '../styles/styles.css';

function Final(props){

    function teamDidAdvance(team) {
        return props.prevRoundGames.some(game =>
            game.teams.some(prevTeam =>
                prevTeam.nameShort === team.nameShort &&
                prevTeam.isFinal === true
            )
        );
    }

    return(
        <div className='round-six'>
            <div className='game-card'>
                {props.finalGame.teams && props.finalGame.teams[0] ? (
                    <>
                    <span className={props.finalGame.teams[0].nameShort.length >= 12 ? 'small-name' : ''}>
                        <span className={props.finalGame.teams[0].isFinal ? (props.finalGame.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(props.finalGame.teams[0]) ? `(${props.finalGame.teams[0].seed})` : ''}{' '}{teamDidAdvance(props.finalGame.teams[0]) ? props.finalGame.teams[0].nameShort : 'TBD'}{' '}{props.finalGame.teams[0].dbSpread ? `(${props.finalGame.teams[0].dbSpread})` : ''}{' '}</span>
                        </span>
                        <span>
                            {props.finalGame.teams[0].score !== null && props.finalGame.teams[0].score !== undefined && props.finalGame.teams[0].score !== '' ? (
                                <b>{props.finalGame.teams[0].isFinal && props.finalGame.teams[0].score}</b>
                            ) : null}
                        </span>
                        <br />
                        <span className="owner">{props.finalGame.teams[0].owner ? props.finalGame.teams[0].owner : "TBD"}</span>
                    </>
                ) : (
                    <>
                        <span className="placeholder">TBD</span>
                        <br />
                        <span className="owner placeholder">TBD</span>
                    </>
                )}
                <hr />
                {props.finalGame.teams && props.finalGame.teams[1] ? (
                    <>
                        <span className={props.finalGame.teams[1].nameShort.length >= 12 ? 'small-name' : ''}>
                        <span className={props.finalGame.teams[1].isFinal ? (props.finalGame.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(props.finalGame.teams[1]) ? `(${props.finalGame.teams[1].seed})` : ''}{' '}{teamDidAdvance(props.finalGame.teams[1]) ? props.finalGame.teams[1].nameShort : 'TBD'}{' '}{props.finalGame.teams[1].dbSpread ? `(${props.finalGame.teams[1].dbSpread})` : ''}{' '}</span>
                        </span>
                        <span>
                            {props.finalGame.teams[0].score !== null && props.finalGame.teams[1].score !== undefined && props.finalGame.teams[0].score !== '' ? (
                                <b>{props.finalGame.teams[1].isFinal && props.finalGame.teams[1].score}</b>
                            ) : null}
                        </span>
                        <br />
                        <span className="owner">{props.finalGame.teams[1].owner ? props.finalGame.teams[1].owner : "TBD"}</span>
                    </>
                ) : (
                    <>
                        <span className="placeholder">TBD</span>
                        <br />
                        <span className="owner placeholder">TBD</span>
                    </>
                )}
            </div>
        </div>
    )
}

export default Final;