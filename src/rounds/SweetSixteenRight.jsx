import '../styles/styles.css';
import GameCardRight from '../components/GameCardRight';

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
                    <GameCardRight game={game} key={game.contestId} prevRoundGames={props.prevRoundGames}/> 
                ))}
            </div>
            <div className='round-three-region-bottom'>
                {props.round3Section5Games.map((game) => (
                    <GameCardRight game={game} key={game.contestId} prevRoundGames={props.prevRoundGames}/> 
                ))}
            </div>
        </div>
    );
}

export default SweetSixteenRight;