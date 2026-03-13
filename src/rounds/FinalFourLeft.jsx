import '../styles/styles.css';

function FinalFourLeft(props) {

    function teamDidAdvance(team) {
        return props.prevRoundGames.some(game =>
            game.teams.some(prevTeam =>
                prevTeam.nameShort === team.nameShort &&
                prevTeam.isFinal === true
            )
        );
    }

    return (
        <div className='round-five-side'>
            <div className='game-card'>
                {props.finalFourLeft.teams && props.finalFourLeft.teams[0] ? (
                    <>
                        <span className={props.finalFourLeft.teams[0].nameShort.length >= 12 ? 'small-name' : ''}>
                            <span className={props.finalFourLeft.teams[0].isFinal ? (props.finalFourLeft.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(props.finalFourLeft.teams[0]) ? `(${props.finalFourLeft.teams[0].seed})` : ''}{' '}{teamDidAdvance(props.finalFourLeft.teams[0]) ? props.finalFourLeft.teams[0].nameShort : 'TBD'}{' '}{props.finalFourLeft.teams[0].dbSpread ? `(${props.finalFourLeft.teams[0].dbSpread})` : ''}{' '}</span>
                        </span>
                        <span>
                            {props.finalFourLeft.teams[0].score !== null && props.finalFourLeft.teams[0].score !== undefined && props.finalFourLeft.teams[0].score !== '' ? (
                                <b>{props.finalFourLeft.teams[0].isFinal && props.finalFourLeft.teams[0].score}</b>
                            ) : null}
                        </span>
                        <br />
                        <span className="owner">{props.finalFourLeft.teams[0].owner ? props.finalFourLeft.teams[0].owner : "TBD"}</span>
                    </>
                ) : (
                    <>
                        <span className="placeholder">TBD</span>
                        <br />
                        <span className="owner placeholder">TBD</span>
                    </>
                )}
                <hr />
                {props.finalFourLeft.teams && props.finalFourLeft.teams[1] ? (
                    <>
                        <span className={props.finalFourLeft.teams[1].nameShort.length >= 12 ? 'small-name' : ''}>
                            <span className={props.finalFourLeft.teams[1].isFinal ? (props.finalFourLeft.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(props.finalFourLeft.teams[1]) ? `(${props.finalFourLeft.teams[1].seed})` : ''}{' '}{teamDidAdvance(props.finalFourLeft.teams[1]) ? props.finalFourLeft.teams[1].nameShort : 'TBD'}{' '}{props.finalFourLeft.teams[1].dbSpread ? `(${props.finalFourLeft.teams[1].dbSpread})` : ''}{' '}</span>
                        </span>
                        <span>
                            {props.finalFourLeft.teams[1].score !== null && props.finalFourLeft.teams[1].score !== undefined && props.finalFourLeft.teams[1].score !== '' ? (
                                <b>{props.finalFourLeft.teams[1].isFinal && props.finalFourLeft.teams[1].score}</b>
                            ) : null}
                        </span>
                        <br />
                        <span className="owner">{props.finalFourLeft.teams[1].owner ? props.finalFourLeft.teams[1].owner : "TBD"}</span>
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

export default FinalFourLeft;