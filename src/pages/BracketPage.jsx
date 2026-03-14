import '../styles/styles.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import RoundOneLeft from '../rounds/RoundOneLeft';
import RoundTwoLeft from '../rounds/RoundTwoLeft';
import SweetSixteenLeft from '../rounds/SweetSixteenLeft';
import EliteEightLeft from '../rounds/EliteEightLeft';
import FinalFourLeft from '../rounds/FinalFourLeft';
import Final from '../rounds/Final';
import FinalFourRight from '../rounds/FinalFourRight';
import EliteEightRight from '../rounds/EliteEightRight';
import SweetSixteenRight from '../rounds/SweetSixteenRight';
import RoundTwoRight from '../rounds/RoundTwoRight';
import RoundOneRight from '../rounds/RoundOneRight';

function BracketPage() {
    const { leagueId } = useParams()
    console.log('leagueId:', leagueId);
    const [data, setData] = useState(null);
    const [leagueName, setLeagueName] = useState('');
    const [leagueSearch, setLeagueSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    if (!leagueId) {
        navigate('/')
    }

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function renderAllTeams() {
            let res = await fetch(`${API_URL}/api/teams/all?leagueId=${leagueId}`);
            let json = await res.json();
            setData(json)
            console.log('DATA', json);
        }

        async function fetchLeagueName() {
            let res = await fetch(`${API_URL}/api/leagues/name?leagueId=${leagueId}`)

            let data = await res.json()
            setLeagueName(data.name)
        }

        fetchLeagueName();
        renderAllTeams();
        setLeagueSearch('');

    }, [leagueId]);

    async function handleLeagueSwitch(e) {
        e.preventDefault();
        try {
            let res = await fetch(`${API_URL}/api/leagues/exists/${encodeURIComponent(leagueSearch)}`);

            let data = await res.json();

            if (data.exists && data.leagueId) {
                navigate(`/bracket/${data.leagueId}`)
            } else {
                alert('No league found')
            }
        } catch (error) {
            alert('No league found')
        }
    }

    let round1Section4Games = data?.round1Section4Games || Array.from({ length: 8 }, () => ({}));
    let round1Section2Games = data?.round1Section2Games || Array.from({ length: 8 }, () => ({}));
    let round1Section3Games = data?.round1Section3Games || Array.from({ length: 8 }, () => ({}));
    let round1Section5Games = data?.round1Section5Games || Array.from({ length: 8 }, () => ({}));
    let round2Section4Games = data?.round2Section4Games || Array.from({ length: 4 }, () => ({}));
    let round2Section2Games = data?.round2Section2Games || Array.from({ length: 4 }, () => ({}));
    let round2Section3Games = data?.round2Section3Games || Array.from({ length: 4 }, () => ({}));
    let round2Section5Games = data?.round2Section5Games || Array.from({ length: 4 }, () => ({}));
    let round3Section4Games = data?.round3Section4Games || Array.from({ length: 2 }, () => ({}));
    let round3Section2Games = data?.round3Section2Games || Array.from({ length: 2 }, () => ({}));
    let round3Section3Games = data?.round3Section3Games || Array.from({ length: 2 }, () => ({}));
    let round3Section5Games = data?.round3Section5Games || Array.from({ length: 2 }, () => ({}));
    let round4Section4Games = data?.round4Section4Games || Array.from({ length: 1 }, () => ({}));
    let round4Section2Games = data?.round4Section2Games || Array.from({ length: 1 }, () => ({}));
    let round4Section3Games = data?.round4Section3Games || Array.from({ length: 1 }, () => ({}));
    let round4Section5Games = data?.round4Section5Games || Array.from({ length: 1 }, () => ({}));
    let round5Games = data?.round5Games || Array.from({ length: 2 }, () => ({}));
    let finalFourLeft = round5Games[0];
    let finalFourRight = round5Games[1];
    let finalGame = data?.finalGame || {};

    return (
        <div>
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton className="custom-modal-body">
                    <Modal.Title>About</Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src='/images/backdoor-brackets-logo-cropped.png' alt='lost-but-covered-ex' style={{ maxHeight: '150px', textAlign: 'center' }} />
                        </div>
                        <div>
                            <h4>What Is This?</h4>
                            <p>Backdoor Brackets is a tournament style game centered around the NCAA March Madness Tournament, except this time, we've leveled the playing field (court).</p>
                            <p>Now, teams only need to cover the spread. That's right, in order for you to advance in the bracket you don't need to beat that unstoppable 1 seed, just Vegas.</p>
                            <p>Spreads will be set the morning of gameday for each game. All you have to do is sit back, relax, and root for madness!</p>
                        </div>
                        <div>
                            <h4>How To Play</h4>
                            <ul>
                                <li>Every person is randomly assigned a team and you want that team to win against the spread.</li>
                                <li>If your team wins the game and covers the spread then you move on with that same team.</li>
                                <li>If your team loses the game, but covers the spread you move on with the winning team.</li>
                                <li>If your team does not cover the spread (whether they win the game or not) then you do not move on.</li>
                            </ul>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <h6>Examples</h6>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                                <img src='/images/won-and-covered-ex.png' alt='won-and-covered-ex' style={{ maxHeight: '150px' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <p>UCLA Wins and Covers</p>
                                    <ul>
                                        <li>Alex advances with UCLA</li>
                                        <li>Michael is eliminated</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                                <img src='/images/lost-but-covered-ex.png' alt='lost-but-covered-ex' style={{ maxHeight: '150px' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <p>Alabama St. Loses But Covers</p>
                                    <ul>
                                        <li>Ethan advances with Auburn</li>
                                        <li>Conner is eliminated</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src='/images/backdoor-brackets-logo-cropped.png' alt='lost-but-covered-ex' style={{ maxHeight: '150px', textAlign: 'center' }} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="custom-modal-body">
                    <Button className='btn btn-primary' onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div
                id="bracket-header"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '20px',
                    gap: '1rem'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <img
                        src="/images/backdoor-brackets-logo-cropped.png"
                        alt="Backdoor Brackets Logo"
                        style={{ height: '50px' }}
                        className="bracket-header-image-desktop"
                    />
                    <button className="hamburger-btn" onClick={() => setShowMenu(!showMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <rect y="4" width="16" height="2" />
                            <rect y="8" width="16" height="2" />
                            <rect y="12" width="16" height="2" />
                        </svg>
                    </button>
                    <div className={`header-buttons-container ${showMenu ? 'show' : ''}`}>
                        <Link className="header-button" to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="header-svg" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                            </svg>
                            {`${showMenu ? 'Home' : ''}`}
                        </Link>
                        <Link className="header-button" onClick={() => setShowModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="header-svg" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                            </svg>
                            {`${showMenu ? 'About' : ''}`}
                        </Link>
                        <Link className="header-button" to={`/user-dashboard/${leagueId}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="header-svg" viewBox="0 0 16 16">
                                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935M3.504 1q.01.775.056 1.469c.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.5.5 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667q.045-.694.056-1.469z" />
                            </svg>
                            {`${showMenu ? 'Standings' : ''}`}
                        </Link>
                        <Link className="header-button" to='/admin-login'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="header-svg" viewBox="0 0 16 16">
                                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
                            </svg>
                            {`${showMenu ? 'Admin' : ''}`}
                        </Link>
                        <div className="league-search-form-mobile">
                            <form id="league-search-div" onSubmit={handleLeagueSwitch}>
                                <span id="league-search-label">In another league? Check on it here </span>
                                <div className="input-group mb-3" id="league-search-input-group">
                                    <input type="text" onChange={e => setLeagueSearch(e.target.value)} value={leagueSearch} className="form-control" id="league-search-input" />
                                    <button className="btn btn-secondary" type="submit" id="button-addon2">Go</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 className={leagueName.length > 10 ? 'mobile-too-long' : ''}>{leagueName.toUpperCase()}</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'flex-end' }}>
                    <img
                        src="/images/backdoor-brackets-logo-cropped.png"
                        alt="Backdoor Brackets Logo"
                        style={{ height: '50px' }}
                        className="bracket-header-image-mobile"
                    />
                    <div className="league-search-form-desktop">
                        <form id="league-search-div" onSubmit={handleLeagueSwitch}>
                            <span id="league-search-label">In another league? Check on it here </span>
                            <div className="input-group mb-3" id="league-search-input-group">
                                <input type="text" onChange={e => setLeagueSearch(e.target.value)} value={leagueSearch} className="form-control" id="league-search-input" />
                                <button className="btn btn-secondary" type="submit" id="button-addon2">Go</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="bracket-container">

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', overflowX: 'auto', padding: '0 1rem', gap: '75px' }}>
                    <Col className="one left">
                        <h3 className="round-header">Round 1</h3>
                        <RoundOneLeft round1Section2Games={round1Section2Games}
                            round1Section4Games={round1Section4Games} />
                    </Col>
                    <Col className="two left">
                        <h3 className="round-header">Round 2</h3>
                        <RoundTwoLeft round2Section2Games={round2Section2Games}
                            round2Section4Games={round2Section4Games} prevRoundGames={[...round1Section2Games, ...round1Section4Games]} />
                    </Col>
                    <Col className="three left">
                        <h3 className="round-header">Sweet 16</h3>
                        <SweetSixteenLeft round3Section2Games={round3Section2Games}
                            round3Section4Games={round3Section4Games} prevRoundGames={[...round2Section2Games, ...round2Section4Games]} />
                    </Col>
                    <Col className="four left">
                        <h3 className="round-header">Elite 8</h3>
                        <EliteEightLeft round4Section2Games={round4Section2Games}
                            round4Section4Games={round4Section4Games} prevRoundGames={[...round3Section2Games, ...round3Section4Games]} />
                    </Col>
                    <Col className="five left">
                        <h3 className="round-header">Final 4</h3>
                        <FinalFourLeft finalFourLeft={finalFourLeft} prevRoundGames={[...round4Section2Games, ...round4Section4Games]} />
                    </Col>
                    <Col>
                        <h3 className="round-header">Final</h3>
                        <Final finalGame={finalGame} prevRoundGames={[finalFourLeft, finalFourRight]} />
                    </Col>
                    <Col className="five right">
                        <h3 className="round-header">Final 4</h3>
                        <FinalFourRight finalFourRight={finalFourRight} prevRoundGames={[...round4Section3Games, ...round4Section5Games]} />
                    </Col>
                    <Col className="four right">
                        <h3 className="round-header">Elite 8</h3>
                        <EliteEightRight round4Section3Games={round4Section3Games} round4Section5Games={round4Section5Games} prevRoundGames={[...round3Section3Games, ...round3Section5Games]} />
                    </Col>
                    <Col className="three right">
                        <h3 className="round-header">Sweet 16</h3>
                        <SweetSixteenRight round3Section3Games={round3Section3Games} round3Section5Games={round3Section5Games} prevRoundGames={[...round2Section3Games, ...round2Section5Games]} />
                    </Col>
                    <Col className="two right">
                        <h3 className="round-header">Round 2</h3>
                        <RoundTwoRight round2Section3Games={round2Section3Games} round2Section5Games={round2Section5Games} prevRoundGames={[...round1Section3Games, ...round1Section5Games]} />
                    </Col>
                    <Col className="one right">
                        <h3 className="round-header">Round 1</h3>
                        <RoundOneRight round1Section3Games={round1Section3Games} round1Section5Games={round1Section5Games} />
                    </Col>
                </div>

            </div>
        </div>
    )
}

export default BracketPage;