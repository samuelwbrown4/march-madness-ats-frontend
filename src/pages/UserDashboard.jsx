import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Collapse } from 'react-bootstrap';
import React from 'react';

function UserDashboard() {
    const [leagueName, setLeagueName] = useState('');
    const [standings, setStandings] = useState([]);
    const [open, setOpen] = useState(null);
    const { leagueId } = useParams();

    const API_URL = import.meta.env.VITE_API_URL;


    function handleToggleClick(name) {
        open ? setOpen(null) :
            setOpen(name);
    }

    useEffect(() => {
        {/*async function fetchLeagueName() {
            let res = await fetch(`${API_URL}/api/leagues/name?leagueId=${leagueId}`)

            let data = await res.json()
            setLeagueName(data.name)
            setLeaguePlayers(data.players)
        }     */}

        async function getUnplayedGames() {
            try {
                let res = await fetch(`${API_URL}/api/leagues/get-standings?leagueId=${leagueId}`)

                let data = await res.json();

                setLeagueName(data.name);
                setStandings(data.standings);




            } catch (error) {
                alert('unexpected error fetching league standings')
            }

        }

        getUnplayedGames();
    }, [])

    return (
        <div id="user-dashboard-container">
            <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '20px',
                    gap: '1rem'
                }} id="user-header">
                <div style={{flex: 1}}>
                    <Link className="header-button" to={`/bracket/${leagueId}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="header-svg" viewBox="0 0 16 16">
                        <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
                    </svg>
                </Link>
                </div>
                <div style={{flex: 1}}>
                <h1>Standings</h1>
                </div>
                <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: '1rem', textAlign: "right" }}>
                    <img
                        src="/images/backdoor-brackets-logo-cropped.png"
                        alt="Backdoor Brackets Logo"
                        style={{ height: '50px' }}
                        className="bracket-header-image-desktop"
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                        src="/images/backdoor-brackets-logo-cropped.png"
                        alt="Backdoor Brackets Logo"
                        style={{ height: '50px' }}
                        className="bracket-header-image-mobile"
                    />
                </div>
            </div>
            {standings && (<table className="table table-dark table-striped" style={{ minWidth: '40%' }}>
                <thead>
                    <tr>
                        <th colSpan={3}>{leagueName}</th>
                    </tr>
                    <tr>
                        <th>Player</th>
                        <th>Teams</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((player) => (
                        <React.Fragment key={player.name}>
                            <tr>
                                <td>{player.name}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ flex: 1 }}>
                                            <span style={{ textAlign: 'right' }}>{player.teamCount}</span>
                                        </div>
                                        <div>
                                            <button
                                                className="plus-btn"
                                                onClick={() => handleToggleClick(player.name)}
                                                style={{ padding: 0, background: 'none', border: 'none', display: 'flex', alignItems: 'center', flex: 1, textAlign: 'right' }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                </svg>
                                            </button>
                                        </div>


                                    </div>
                                </td>
                            </tr>
                            {open === player.name && (
                                <tr>
                                    <td colSpan={2}>
                                        <Collapse in={true}>
                                            <ul>
                                                {player.teams.map((team) => (
                                                    <li key={team}>{team}</li>
                                                ))}
                                            </ul>
                                        </Collapse>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>)}
        </div>
    )
}

export default UserDashboard;