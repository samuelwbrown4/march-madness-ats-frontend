import '../styles/styles.css';

function FinalFourRight(props){

    function teamDidAdvance(team) {
        return props.prevRoundGames.some(game =>
            game.teams.some(prevTeam =>
                prevTeam.nameShort === team.nameShort &&
                prevTeam.isFinal === true
            )
        );
    }

    return(
        <div className='round-five-side'>
            <div className='game-card'>
                {props.finalFourRight.teams && props.finalFourRight.teams[0] ? (
                    <>
                    <span className={props.finalFourRight.teams[0].nameShort.length >= 10 ? 'small-name' : ''}>
                        <span className={props.finalFourRight.teams[0].isFinal ? (props.finalFourRight.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(props.finalFourRight.teams[0]) ? `(${props.finalFourRight.teams[0].seed})` : ''}{' '}{teamDidAdvance(props.finalFourRight.teams[0]) ? props.finalFourRight.teams[0].nameShort : 'TBD'}{' '}{props.finalFourRight.teams[0].dbSpread ? `(${props.finalFourRight.teams[0].dbSpread})` : ''}{' '}</span>
                        </span>
                        <span>
                            {props.finalFourRight.teams[0].score !== null && props.finalFourRight.teams[0].score !== undefined && props.finalFourRight.teams[0].score !== '' ? (
                                <b>{props.finalFourRight.teams[0].isFinal && props.finalFourRight.teams[0].score}</b>
                            ) : null}
                        </span>
                        <br />
                        <span className="owner">{props.finalFourRight.teams[0].owner ? props.finalFourRight.teams[0].owner : "TBD"}</span>
                    </>
                ) : (
                    <>
                        <span className="placeholder">TBD</span>
                        <br />
                        <span className="owner placeholder">TBD</span>
                    </>
                )}
                <hr />
                {props.finalFourRight.teams && props.finalFourRight.teams[1] ? (
                    <>
                        <span className={props.finalFourRight.teams[1].nameShort.length >= 10 ? 'small-name' : ''}>
                        <span className={props.finalFourRight.teams[1].isFinal ? (props.finalFourRight.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(props.finalFourRight.teams[1]) ? `(${props.finalFourRight.teams[1].seed})` : ''}{' '}{teamDidAdvance(props.finalFourRight.teams[1]) ? props.finalFourRight.teams[1].nameShort : 'TBD'}{' '}{props.finalFourRight.teams[1].dbSpread ? `(${props.finalFourRight.teams[1].dbSpread})` : ''}{' '}</span>
                        </span>
                        <span>
                            {props.finalFourRight.teams[1].score !== null && props.finalFourRight.teams[1].score !== undefined && props.finalFourRight.teams[1].score !== '' ? (
                                <b>{props.finalFourRight.teams[1].isFinal && props.finalFourRight.teams[1].score}</b>
                            ) : null}
                        </span>
                        <br />
                        <span className="owner">{props.finalFourRight.teams[1].owner ? props.finalFourRight.teams[1].owner : "TBD"}</span>
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

export default FinalFourRight;