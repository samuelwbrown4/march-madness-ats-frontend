import '../styles/styles.css';
import GameCardRight from '../components/GameCardRight';

function RoundOneRight(props) {
    return (
        <div className='round-one-side'>
            <div className='round-one-region'>
                {props.round1Section3Games.map((game) => (
                    <GameCardRight game={game} key={game.contestId} />                 
                ))}
            </div>
            <div className='round-one-region'>
                {props.round1Section5Games.map((game) => (
                    <GameCardRight game={game} key={game.contestId} />
                ))}
            </div>
        </div>
    );
}

export default RoundOneRight;