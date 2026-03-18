import '../styles/styles.css';

function SweetSixteenRight(props) {

    function teamDidAdvance(team) {
        return props.prevRoundGames.some(game =>
            game.teams.some(prevTeam =>
                prevTeam.nameShort === team.nameShort &&
                prevTeam.isFinal === true
            )
        );
    }

    return (
        <div className='round-three-side'>
            <div className='round-three-region-top'>
                {props.round3Section3Games.map((game) => (
                    <div className='game-card' key={game.contestId}>
                        {game.teams && game.teams[0] ? (
                            <>
                                <div className='team-info'>
                                    <div className='score-section'>
                                        {game.teams[0].score !== null && game.teams[0].score !== undefined && game.teams[0].score !== '' ? (
                                            <b>{game.teams[0].isFinal && game.teams[0].score}</b>
                                        ) : null}
                                    </div>
                                    <div className={game.teams[0].nameShort.length >= 10 ? 'team-name-section small-name' : 'team-name-section'}>
                                        <span className={game.teams[0].isFinal ? (game.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(game.teams[0]) ? `(${game.teams[0].seed})` : ''}{' '}{teamDidAdvance(game.teams[0]) ? game.teams[0].nameShort : 'TBD'}{' '}{game.teams[0].dbSpread ? `(${game.teams[0].dbSpread})` : ''}{' '}</span>
                                    </div>
                                    {teamDidAdvance(game.teams[0]) ? <img className="team-logo" src={game.teams[0].logoURL} /> : ''}
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
                                    <div className='score-section'>
                                        {game.teams[1].score !== null && game.teams[1].score !== undefined && game.teams[1].score !== '' ? (
                                            <b>{game.teams[1].isFinal && game.teams[1].score}</b>
                                        ) : null}
                                    </div>
                                    <div className={game.teams[1].nameShort.length >= 10 ? 'team-name-section small-name' : 'team-name-section'}>
                                        <span className={game.teams[1].isFinal ? (game.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(game.teams[1]) ? `(${game.teams[1].seed})` : ''}{' '}{teamDidAdvance(game.teams[1]) ? game.teams[1].nameShort : 'TBD'}{' '}{game.teams[1].dbSpread ? `(${game.teams[1].dbSpread})` : ''}{' '}</span>
                                    </div>
                                    {teamDidAdvance(game.teams[1]) ? <img className="team-logo" src={game.teams[1].logoURL} /> : ''}
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
                ))}
            </div>
            <div className='round-three-region-bottom'>
                {props.round3Section5Games.map((game) => (
                    <div className='game-card' key={game.contestId}>
                        {game.teams && game.teams[0] ? (
                            <>
                                <div className='team-info'>
                                    <div className='score-section'>
                                        {game.teams[0].score !== null && game.teams[0].score !== undefined && game.teams[0].score !== '' ? (
                                            <b>{game.teams[0].isFinal && game.teams[0].score}</b>
                                        ) : null}
                                    </div>
                                    <div className={game.teams[0].nameShort.length >= 10 ? 'team-name-section small-name' : 'team-name-section'}>
                                        <span className={game.teams[0].isFinal ? (game.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(game.teams[0]) ? `(${game.teams[0].seed})` : ''}{' '}{teamDidAdvance(game.teams[0]) ? game.teams[0].nameShort : 'TBD'}{' '}{game.teams[0].dbSpread ? `(${game.teams[0].dbSpread})` : ''}{' '}</span>
                                    </div>
                                    {teamDidAdvance(game.teams[0]) ? <img className="team-logo" src={game.teams[0].logoURL} /> : ''}
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
                                    <div className='score-section'>
                                        {game.teams[1].score !== null && game.teams[1].score !== undefined && game.teams[1].score !== '' ? (
                                            <b>{game.teams[1].isFinal && game.teams[1].score}</b>
                                        ) : null}
                                    </div>
                                    <div className={game.teams[1].nameShort.length >= 10 ? 'team-name-section small-name' : 'team-name-section'}>
                                        <span className={game.teams[1].isFinal ? (game.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(game.teams[1]) ? `(${game.teams[1].seed})` : ''}{' '}{teamDidAdvance(game.teams[1]) ? game.teams[1].nameShort : 'TBD'}{' '}{game.teams[1].dbSpread ? `(${game.teams[1].dbSpread})` : ''}{' '}</span>
                                    </div>
                                    {teamDidAdvance(game.teams[1]) ? <img className="team-logo" src={game.teams[1].logoURL} /> : ''}
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
                ))}
            </div>
        </div>
    );
}

export default SweetSixteenRight;