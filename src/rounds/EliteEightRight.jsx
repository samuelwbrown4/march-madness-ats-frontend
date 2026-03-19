import '../styles/styles.css';
import GameCardRight from '../components/GameCardRight';

function EliteEightRight(props) {

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

            {props.round4Section3Games.map((game) => (
                <GameCardRight game={game} key={game.contestId} prevRoundGames={props.prevRoundGames}/> 
            ))}
            {props.round4Section5Games.map((game) => (
                <GameCardRight game={game} key={game.contestId} prevRoundGames={props.prevRoundGames}/> 
            ))}

        </div>
    )
};

export default EliteEightRight;