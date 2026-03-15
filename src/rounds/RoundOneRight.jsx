import '../styles/styles.css';

function RoundOneRight(props) {
    return (
        <div className='round-one-side'>
            <div className='round-one-region'>
                {props.round1Section3Games.map((game) => (
                    <div className='game-card' key={game.contestId}>
                        {game.teams && game.teams[0] ? (
                            <>
                                <span className={game.teams[0].nameShort.length >= 10 ? 'small-name' : ''}>
                                    <span className={game.teams[0].isFinal ? (game.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>({game.teams[0].seed}){' '}{game.teams[0].nameShort}{' '}{game.teams[0].dbSpread ? `(${game.teams[0].dbSpread})` : ''}{' '}</span>
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
                                    <span className={game.teams[1].isFinal ? (game.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>({game.teams[1].seed}){' '}{game.teams[1].nameShort}{' '}{game.teams[1].dbSpread ? `(${game.teams[1].dbSpread})` : ''}{' '}</span>
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
            <div className='round-one-region'>
                {props.round1Section5Games.map((game) => (
                   <div className='game-card' key={game.contestId}>
                        {game.teams && game.teams[0] ? (
                            <>
                                <span className={game.teams[0].nameShort.length >= 10 ? 'small-name' : ''}>
                                    <span className={game.teams[0].isFinal ? (game.teams[0].isWinner === true ? "team-won" : "team-eliminated") : ""}>({game.teams[0].seed}){' '}{game.teams[0].nameShort}{' '}{game.teams[0].dbSpread ? `(${game.teams[0].dbSpread})` : ''}{' '}</span>
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
                                    <span className={game.teams[1].isFinal ? (game.teams[1].isWinner === true ? "team-won" : "team-eliminated") : ""}>({game.teams[1].seed}){' '}{game.teams[1].nameShort}{' '}{game.teams[1].dbSpread ? `(${game.teams[1].dbSpread})` : ''}{' '}</span>
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
        </div>
    );
}

export default RoundOneRight;