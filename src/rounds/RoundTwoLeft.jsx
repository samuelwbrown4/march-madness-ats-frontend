import GameCardLeft from '../components/GameCardLeft';
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
                    <GameCardLeft key={game.contestId} game={game} prevRoundGames={props.prevRoundGames}/>
                ))}
                </div>
                <div className='round-two-region-bottom'>
                {props.round2Section4Games.map((game) => (
                    <GameCardLeft key={game.contestId} game={game} prevRoundGames={props.prevRoundGames}/>
                    ))}
                </div>
        </div>
    )
};

export default RoundTwoLeft;