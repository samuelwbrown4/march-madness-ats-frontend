import '../styles/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'

function LandingPage() {
    const [leagueId, setLeagueId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL;

    async function handleLeagueNameSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/leagues/exists/${encodeURIComponent(leagueId)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (result.exists) {
                localStorage.setItem('currentLeague', result.leagueId)
                navigate(`/bracket/${result.leagueId}`)
            } else {
                alert('League does not exist!')
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleShowModal = () => {
        setShowMenu(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div id="landing-page">
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
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
                    <Button className='btn btn-primary' onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Header */}
            <div className="dark-header">
                <div className="header-left">
                    <button className="hamburger-btn" onClick={() => setShowMenu(!showMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <rect y="4" width="16" height="2" />
                            <rect y="8" width="16" height="2" />
                            <rect y="12" width="16" height="2" />
                        </svg>
                    </button>
                    <div className={`header-buttons-container ${showMenu ? 'show' : ''}`}>
                        <Link className="header-button" onClick={handleShowModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="header-svg" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                            </svg>
                            {showMenu ? 'About' : ''}
                        </Link>
                        <Link className="header-button" to='/admin-login' onClick={() => setShowMenu(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="header-svg" viewBox="0 0 16 16">
                                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
                            </svg>
                            {showMenu ? 'Admin' : ''}
                        </Link>
                    </div>
                </div>

                <div id="welcome-header">
                    <h1>Welcome!</h1>
                </div>

                <div className="header-right"></div>
            </div>

            {/* Main Content */}
            <div className="landing-content">
                <div className="league-sign-in">
                    <h3>League Sign In</h3>
                    <form className="league-sign-in-form" onSubmit={(e) => handleLeagueNameSubmit(e)}>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter league name..." 
                            id="league-sign-in-input" 
                            value={leagueId} 
                            onChange={e => setLeagueId(e.target.value)}
                        />
                        <button className='btn btn-primary' id="go-to-bracket-btn" type="submit">
                            Go
                            <svg className="button-svg" width="30px" height="30px" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 2H2v2h5v4H2v2h7V7h5v10H9v-3H2v2h5v4H2v2h7v-3h7v-6h6v-2h-6V5H9V2z" fill="currentColor" />
                            </svg>
                        </button>
                    </form>
                    <div>
                        <span style={{fontSize: '.9rem'}}>Don't have a league? Create one <Link to='/create-league'>here</Link>.</span>
                    </div>
                </div>

                <div className="landing-logo">
                    <img src='/images/backdoor-brackets-logo.png' alt="Backdoor Brackets Logo" />
                </div>
            </div>
        </div>
    )
};

export default LandingPage;