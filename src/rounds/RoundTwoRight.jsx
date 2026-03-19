import '../styles/styles.css';
import GameCardRight from '../components/GameCardRight';

function RoundTwoRight(props) {

    function teamDidAdvance(team) {
        return props.prevRoundGames.some(game =>
            game.teams.some(prevTeam =>
                prevTeam.nameShort === team.nameShort &&
                prevTeam.isFinal === true
            )
        );
    }

    return (
        <div className='round-two-side'>
            <div className='round-two-region-top'>
                {props.round2Section3Games.map((game) => (
                    <GameCardRight game={game} key={game.contestId} prevRoundGames={props.prevRoundGames}/>  
                ))}
            </div>
            <div className='round-two-region-bottom'>
                {props.round2Section5Games.map((game) => (
                    <GameCardRight game={game} key={game.contestId} prevRoundGames={props.prevRoundGames}/> 
                ))}
            </div>
        </div>
    );
}

export default RoundTwoRight;