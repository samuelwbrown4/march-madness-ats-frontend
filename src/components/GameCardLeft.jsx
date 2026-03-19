import { useState } from 'react';
import '../styles/styles.css';

function GameCardLeft({ game, prevRoundGames }) {

    const [flipped, setFlipped] = useState(false);

    function toggleFlip() {
        setFlipped(current => !current)
    }

    function teamDidAdvance(team) {
        if (!prevRoundGames) return true;
        return prevRoundGames.some(game =>
            game.teams.some(prevTeam =>
                prevTeam.nameShort === team.nameShort &&
                prevTeam.isFinal === true
            )
        );
    }

    return (
        <div onClick={toggleFlip}>
            <div className='game-card' style={{ display: flipped ? 'none' : 'block' }}>
                {game.teams && game.teams[0] ? (
                    <>
                        <div className='team-info'>
                            {teamDidAdvance(game.teams[0]) ? <img className="team-logo" src={game.teams[0].logoURL} /> : ''}
                            <div className={teamDidAdvance(game.teams[0]) && game.teams[0].nameShort.length >= 10 ? 'team-name-section small-name' : 'team-name-section'}>
                                <span className={game.teams[0].isFinal ? (game.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(game.teams[0]) ? `(${game.teams[0].seed})` : ''} {teamDidAdvance(game.teams[0]) ? game.teams[0].nameShort : 'TBD'} {game.teams[0].dbSpread ? game.teams[0].dbSpread < 0 ? `(${game.teams[0].dbSpread})` : `(+${game.teams[0].dbSpread})` : ''}</span>
                            </div>
                            <div className='score-section'>
                                {game.teams[0].score !== null && game.teams[0].score !== undefined && game.teams[0].score !== '' ? (
                                    <b>{game.teams[0].isFinal && game.teams[0].score}</b>
                                ) : null}
                            </div>
                        </div>
                        <span className={[
                            "owner",
                            game.teams[0].isFinal
                                ? (game.teams[0].didCover === true ? "covered" : "did-not-cover")
                                : ""
                        ].filter(Boolean).join(" ")}>{game.teams[0].owner ? game.teams[0].owner : 'TBD'}</span>

                    </>
                ) : (
                    <>
                        <span className="placeholder">TBD</span>
                        <br />
                        <span className="owner placeholder">TBD</span>
                    </>
                )}
                <hr />
                {game.teams && game.teams[1] ? (
                    <>
                        <div className='team-info'>
                            {teamDidAdvance(game.teams[1]) ? <img className="team-logo" src={game.teams[1].logoURL} /> : ''}
                            <div className={teamDidAdvance(game.teams[1]) && game.teams[1].nameShort.length >= 10 ? 'team-name-section small-name' : 'team-name-section'}>
                                <span className={game.teams[1].isFinal ? (game.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(game.teams[1]) ? `(${game.teams[1].seed})` : ''} {teamDidAdvance(game.teams[1]) ? game.teams[1].nameShort : 'TBD'} {game.teams[1].dbSpread ? game.teams[1].dbSpread < 0 ? `(${game.teams[1].dbSpread})` : `(+${game.teams[1].dbSpread})` : ''}</span>
                            </div>
                            <div className='score-section'>
                                {game.teams[1].score !== null && game.teams[1].score !== undefined && game.teams[1].score !== '' ? (
                                    <b>{game.teams[1].isFinal && game.teams[1].score}</b>
                                ) : null}
                            </div>
                        </div>
                        <span
                            className={[
                                "owner",
                                game.teams[1].isFinal
                                    ? (game.teams[1].didCover === true ? "covered" : "did-not-cover")
                                    : ""
                            ].filter(Boolean).join(" ")}
                        >
                            {game.teams[1].owner ? game.teams[1].owner : 'TBD'}
                        </span>

                    </>
                ) : (
                    <>
                        <span className="placeholder">TBD</span>
                        <br />
                        <span className="owner placeholder">TBD</span>
                    </>
                )}
            </div>
            <div className='game-card' style={{ display: flipped ? 'block' : 'none' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.5rem'
                }}>
                    <h5 style={{ margin: 0, color: '#21c97a', fontSize: '0.9rem' }}>Game Info</h5>
                    {game.startDate && (
                        <>
                            <p style={{ margin: 0, fontSize: '1rem' }}>{game.startDate} @ {game.startTime || 'TBD'} on {game.broadcaster?.name || 'TBD'}</p>
                          
                            <p style={{ fontSize: '0.8rem', color: '#888' }}>
                                Click to flip
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GameCardLeft;