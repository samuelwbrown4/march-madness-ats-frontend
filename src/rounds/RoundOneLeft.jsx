import '../styles/styles.css';
import GameCardLeft from '../components/GameCardLeft';

function RoundOneLeft(props) {
    return (
        <div className='round-one-side'>
            <div className='round-one-region'>
                {props.round1Section2Games.map((game) => (
                    <GameCardLeft game={game} key={game.contestId}/>                   
                ))}
            </div>
            <div className='round-one-region'>
                {props.round1Section4Games.map((game) => (
                    <GameCardLeft game={game} key={game.contestId}/>                   
                ))}
            </div>
        </div>
    );
}

export default RoundOneLeft;