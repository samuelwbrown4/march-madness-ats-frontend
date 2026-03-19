import '../styles/styles.css';
import GameCardLeft from '../components/GameCardLeft';

function SweetSixteenLeft(props) {

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
                {props.round3Section2Games.map((game) => (
                    <GameCardLeft key={game.contestId} game={game} prevRoundGames={props.prevRoundGames}/>
                ))}
            </div>
            <div className='round-three-region-bottom'>
                {props.round3Section4Games.map((game) => (
                    <GameCardLeft key={game.contestId} game={game} prevRoundGames={props.prevRoundGames}/>
                ))}
            </div>
        </div>
    );
}

export default SweetSixteenLeft;