import '../styles/styles.css';

function RoundTwoLeft(props){

    function teamDidAdvance(team) {
    return props.prevRoundGames.some(game =>
        game.teams.some(prevTeam =>
            prevTeam.nameShort === team.nameShort &&
            prevTeam.isFinal === true 
        )
    );
}

    return(
        <div className='round-two-side'>
            <div className='round-two-region-top'>
                {props.round2Section2Games.map((game) => (
                    <div className='game-card' key={game.contestId}>
                        {game.teams && game.teams[0] ? (
                            <>
                                <span className={game.teams[0].nameShort.length >= 10 ? 'small-name' : ''}>
                                    <span className={game.teams[0].isFinal ? (game.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(game.teams[0]) ? `(${game.teams[0].seed})` : ''}{' '}{teamDidAdvance(game.teams[0]) ? game.teams[0].nameShort : 'TBD'}{' '}{game.teams[0].dbSpread ? `(${game.teams[0].dbSpread})` : ''}{' '}</span>
                                </span>
                                <span>
                                    {game.teams[0].score !== null && game.teams[0].score !== undefined && game.teams[0].score !== '' ? (
                                        <b>{game.teams[0].isFinal && game.teams[0].score}</b>
                                    ) : null}
                                </span>
                                <br />
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
                                 <span className={game.teams[1].nameShort.length >= 10 ? 'small-name' : ''}>
                                    <span className={game.teams[1].isFinal ? (game.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(game.teams[1]) ? `(${game.teams[1].seed})` : ''}{' '}{teamDidAdvance(game.teams[1]) ? game.teams[1].nameShort : 'TBD'}{' '}{game.teams[1].dbSpread ? `(${game.teams[1].dbSpread})` : ''}{' '}</span>
                                </span>
                                <span>
                                    {game.teams[1].score !== null && game.teams[1].score !== undefined && game.teams[1].score !== '' ? (
                                        <b>{game.teams[1].isFinal && game.teams[1].score}</b>
                                    ) : null}
                                </span>
                                <br />
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
                <div className='round-two-region-bottom'>
                {props.round2Section4Games.map((game) => (
                    <div className='game-card' key={game.contestId}>
                        {game.teams && game.teams[0] ? (
                            <>
                                <span className={game.teams[0].nameShort.length >= 10 ? 'small-name' : ''}>
                                    <span className={game.teams[0].isFinal ? (game.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(game.teams[0]) ? `(${game.teams[0].seed})` : ''}{' '}{teamDidAdvance(game.teams[0]) ? game.teams[0].nameShort : 'TBD'}{' '}{game.teams[0].dbSpread ? `(${game.teams[0].dbSpread})` : ''}{' '}</span>
                                </span>
                                <span>
                                    {game.teams[0].score !== null && game.teams[0].score !== undefined && game.teams[0].score !== '' ? (
                                        <b>{game.teams[0].isFinal && game.teams[0].score}</b>
                                    ) : null}
                                </span>
                                <br />
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
                                 <span className={game.teams[1].nameShort.length >= 10 ? 'small-name' : ''}>
                                    <span className={game.teams[1].isFinal ? (game.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>{teamDidAdvance(game.teams[1]) ? `(${game.teams[1].seed})` : ''}{' '}{teamDidAdvance(game.teams[1]) ? game.teams[1].nameShort : 'TBD'}{' '}{game.teams[1].dbSpread ? `(${game.teams[1].dbSpread})` : ''}{' '}</span>
                                </span>
                                <span>
                                    {game.teams[1].score !== null && game.teams[1].score !== undefined && game.teams[1].score !== '' ? (
                                        <b>{game.teams[1].isFinal && game.teams[1].score}</b>
                                    ) : null}
                                </span>
                                <br />
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
                    </div>))}
                </div>
        </div>
    )
};

export default RoundTwoLeft;