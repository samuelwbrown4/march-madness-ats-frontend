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

    const champion = props.finalGame.teams.find((t) => t.isFinal && t.isWinner === true)

    return (
        <div className='round-six'>
            <div className='champion-card'>
                {champion ? (
                    <>
                        <img className='champion-logo' src={champion.logoURL} alt='champion-logo' />
                        <span className='champion-text'>{champion.nameShort}</span>
                        <br />
                        <span className='owner-champion'>{champion.owner}</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className='champion-logo' viewBox="0 0 16 16">
                            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935" />
                        </svg>
                        <span className='champion-text'>Champion</span>
                        <br />
                        <span className='owner-champion'>?</span>
                    </>
                )}
            </div>
            <div className='game-card'>
                {props.finalGame.teams && props.finalGame.teams[0] ? (
                    <>
                        <div className='team-info'>
                            {teamDidAdvance(props.finalGame.teams[0]) ? <img className="team-logo" src={props.finalGame.teams[0].logoURL} /> : ''}
                            <div className={teamDidAdvance(props.finalGame.teams[0]) && props.finalGame.teams[0].nameShort.length >= 10 ? 'team-name-section small-name' : 'team-name-section'}>
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
                            <div className={teamDidAdvance(props.finalGame.teams[1]) && props.finalGame.teams[1].nameShort.length >= 10 ? 'team-name-section small-name' : 'team-name-section'}>
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