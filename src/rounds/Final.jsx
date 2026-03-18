import '../styles/styles.css';

function Final(props) {

    function teamDidAdvance(team) {
        return props.prevRoundGames.some(game =>
            game.teams.some(prevTeam =>
                prevTeam.nameShort === team.nameShort &&
                prevTeam.isFinal === true
            )
        );
    }

    return (
        <div className='round-six'>
            <div className='game-card'>
                {props.finalGame.teams && props.finalGame.teams[0] ? (
                    <>
                        <div className='team-info'>
                            {teamDidAdvance(props.finalGame.teams[0]) ? <img className="team-logo" src={props.finalGame.teams[0].logoURL} /> : ''}
                            <div className={props.finalGame.teams[0].nameShort.length >= 10 ? 'team-name-section small-name' : 'team-name-section'}>
                                <span className={props.finalGame.teams[0].isFinal ? (props.finalGame.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(props.finalGame.teams[0]) ? `(${props.finalGame.teams[0].seed})` : ''}{' '}{teamDidAdvance(props.finalGame.teams[0]) ? props.finalGame.teams[0].nameShort : 'TBD'}{' '}{props.finalGame.teams[0].dbSpread ? `(${props.finalGame.teams[0].dbSpread})` : ''}{' '}</span>
                            </div>
                            <div className='score-section'>
                                {props.finalGame.teams[0].score !== null && props.finalGame.teams[0].score !== undefined && props.finalGame.teams[0].score !== '' ? (
                                    <b>{props.finalGame.teams[0].isFinal && props.finalGame.teams[0].score}</b>
                                ) : null}
                            </div>
                        </div>
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
                        <div className='team-info'>
                            <div className='score-section'>
                                {props.finalGame.teams[1].score !== null && props.finalGame.teams[1].score !== undefined && props.finalGame.teams[1].score !== '' ? (
                                    <b>{props.finalGame.teams[1].isFinal && props.finalGame.teams[1].score}</b>
                                ) : null}
                            </div>
                            <div className={props.finalGame.teams[1].nameShort.length >= 10 ? 'team-name-section small-name' : 'team-name-section'}>
                                <span className={props.finalGame.teams[1].isFinal ? (props.finalGame.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(props.finalGame.teams[1]) ? `(${props.finalGame.teams[1].seed})` : ''}{' '}{teamDidAdvance(props.finalGame.teams[1]) ? props.finalGame.teams[1].nameShort : 'TBD'}{' '}{props.finalGame.teams[1].dbSpread ? `(${props.finalGame.teams[1].dbSpread})` : ''}{' '}</span>
                            </div>
                            {teamDidAdvance(props.finalGame.teams[1]) ? <img className="team-logo" src={props.finalGame.teams[1].logoURL} /> : ''}
                        </div>
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