import '../styles/styles.css';
import GameCardLeft from '../components/GameCardLeft';

function EliteEightLeft(props) {

    function teamDidAdvance(team) {
        return props.prevRoundGames.some(game =>
            game.teams.some(prevTeam =>
                prevTeam.nameShort === team.nameShort &&
                prevTeam.isFinal === true
            )
        );
    }

    return (
        <div className='round-four-side'>

            {props.round4Section2Games.map((game) => (
                <GameCardLeft key={game.contestId} game={game} prevRoundGames={props.prevRoundGames} />
            ))}
            {props.round4Section4Games.map((game) => (
                <GameCardLeft key={game.contestId} game={game} prevRoundGames={props.prevRoundGames} />
            ))}

        </div>
    )
};

export default EliteEightLeft;