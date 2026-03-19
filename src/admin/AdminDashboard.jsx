import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function AdminDashboard({ token }) {
    const [spreadDate, setSpreadDate] = useState('');
    const [scoreDate, setScoreDate] = useState('');
    const [ownerDate, setOwnerDate] = useState('');
    const [updateYear, setUpdateYear] = useState('');
    const [runLogDetails, setRunLogDetails] = useState({});
    const [metadata, setMetadata] = useState([]);
    const [allMetadata, setAllMetadata] = useState([]);
    const [fetchMetadataInput, setFetchMetadataInput] = useState('');
    const [leagueArray, setLeagueArray] = useState([]);
    const [leagueToDelete, setLeagueToDelete] = useState('');
    const [yearToReset, setYearToReset] = useState('');
    const [leagueToArchive, setLeagueToArchive] = useState('');
    const [queuedLeagues, setQueuedLeagues] = useState([]);
    const [leagueToPush, setLeagueToPush] = useState('');


    const navigate = useNavigate()

    if (!token) {
        navigate('/admin-login')
    }

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {

        fetchRunLog();
        fetchMetadata();
        fetchAllLeagues();
        fetchQueuedLeagues();
    }, [])

    async function fetchRunLog() {
        let response = await fetch(`${API_URL}/api/admin/get-runData`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });


        setRunLogDetails(await response.json())
        console.log('updated run log', runLogDetails)
    }

    async function fetchMetadata() {
        let response = await fetch(`${API_URL}/api/admin/get-metadata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        setAllMetadata(result.metadata);

    }

    async function fetchAllLeagues() {
        try {
            let response = await fetch(`${API_URL}/api/leagues/get-all-leagues`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            let data = await response.json();

            setLeagueArray(data.leagueArray)
        } catch (error) {
            console.log(error);
            alert('error fetching all league array')
        }

    }

    async function fetchQueuedLeagues() {
        try {
            let response = await fetch(`${API_URL}/api/leagues/get-queued-leagues`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let data = await response.json();

            if (data.queuedLeagues) {
                setQueuedLeagues(data.queuedLeagues)
            }
        } catch (error) {
            console.log(error);
            alert('error fetching all league array')
        }
    }

    useEffect(() => {
        console.log('Updated metadata:', metadata);
    }, [metadata]);

    async function fetchNewMetadata() {
        let response = await fetch(`${API_URL}/api/admin/fetch-new-metadata`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ inputDate: fetchMetadataInput })
        });
        console.log(await response.json());
    }

    async function handleSpreadUpdate(date) {
        let response = await fetch(`${API_URL}/api/admin/get-spreads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ inputDate: date, runDate: Date.now() })
        });
        console.log(await response.json());
        await fetchRunLog();
    }

    async function handleScoreUpdate(date) {
        let response = await fetch(`${API_URL}/api/admin/update-scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ inputDate: date, runDate: Date.now() })
        });
        console.log(await response.json());
        await fetchRunLog();
    }

    async function handleOwnerUpdate(date) {
        let response = await fetch(`${API_URL}/api/admin/update-owners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ inputDate: date, runDate: Date.now() })
        });
        console.log(await response.json());
        await fetchRunLog();
    }

    async function handleLeagueDelete() {
        let response = await fetch(`${API_URL}/api/admin/delete-league/${leagueToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ runOnDate: Date.now() })
        });

        let result = await response.json()
        if (result.deleted === true) {
            alert('League Deleted')
        }
    }

    async function handleLeagueArchive() {
        let response = await fetch(`${API_URL}/api/admin/archive/${leagueToArchive}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        let result = await response.json()

        if (result.success === true) {
            alert('League Archived Successfully!')
            fetchAllLeagues()
        } else {
            alert('League failed to archive')
        }
    }

    async function handleReset() {
        try {
            let response = await fetch(`${API_URL}/api/admin/run-log-reset`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ yearToReset: yearToReset })

            });

            console.log(await response.json())
        } catch (error) {
            console.log(error);
            alert('server error')
        }
    }

    async function pushLeague() {
        console.log(leagueToPush)
        const league = queuedLeagues.find((league) => league.name === leagueToPush);

        if (!league) {
            return alert('Please select a league to push');
        }

        const availableYear = allMetadata?.find((m) => m.year === Number(league.year))

        if (availableYear) {
            let endOfFirstFourString = availableYear.rounds[0].endDate
            let [year, month, day] = endOfFirstFourString.split('-').map(Number);
            let endOfFirstFour = new Date(year, month - 1, day, 23, 30, 59, 999);
            let today = new Date()

            if (today < endOfFirstFour) {
                alert('Too early to push. Operation Canceled')
                return;
            }

            try {
                if (!league) {
                    return alert('Error! League not pushed!')
                }

                let response = await fetch(`${API_URL}/api/leagues/initialize-tournament`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ leagueName: league.name, numberOfOwners: league.numberOfOwners, owners: league.players, year: league.year, runDate: Date.now() })
                })
                let data = response.json()
                if (data.error) {
                    alert(`Error: ${data.error}`)
                } else if (data.success) {
                    
                    await fetch(`${API_URL}/api/leagues/remove-from-queue/${league.name}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    alert('League pushed successfully')
                    fetchQueuedLeagues()
                }
            } catch (error) {
                console.log(error);
                alert('server error')
            }
        }
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#181a1b' }}>
            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#222738', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Link className="home-button" to="/">
                        <svg className="header-svg" width="30px" height="30px" viewBox="0 0 30 30" fill="#currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 2H2v2h5v4H2v2h7V7h5v10H9v-3H2v2h5v4H2v2h7v-3h7v-6h6v-2h-6V5H9V2z" fill="currentColor" />
                        </svg>
                    </Link>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h2 style={{ color: '#b8c1ec', padding: '20px', margin: 0 }}>Admin Dashboard</h2>
                </div>
                <div style={{ flex: 1 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: '50px' }} className="container-lg" id="admin-form">
                <div className="function-group" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="update-year-select">Select Year for Updates: </label>
                        <select
                            className="form-select"
                            id="update-year-select"
                            value={updateYear}
                            onChange={e => {
                                setUpdateYear(e.target.value);
                                const selected = allMetadata.find(m => m.year === Number(e.target.value));
                                setMetadata(selected ? selected.rounds : []);
                            }}
                        >
                            <option value="">Select Year</option>
                            {[...new Set(allMetadata.map(m => m.year))].map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    {metadata && (
                        <table id="update-schedule-table">
                            <thead>
                                <tr>
                                    <th colSpan={3}>Update Schedule</th>
                                </tr>
                                <tr>
                                    <th>Round</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metadata.map((round) => {
                                    const startDateSpreadMatch = runLogDetails.spreadAll?.find(
                                        (log) => log.runForDate?.slice(0, 10) === round.startDate
                                    );

                                    const endDateSpreadMatch = runLogDetails.spreadAll?.find(
                                        (log) => log.runForDate?.slice(0, 10) === round.endDate
                                    );

                                    const gameDateSpreadMatch = runLogDetails.spreadAll?.find(
                                        (log) => log.runForDate?.slice(0, 10) === round.gameDate
                                    );

                                    const startDateFinalScoresMatch = runLogDetails.finalScoresAll?.find(
                                        (log) => log.runForDate?.slice(0, 10) === round.startDate
                                    );

                                    const endDateFinalScoresMatch = runLogDetails.finalScoresAll?.find(
                                        (log) => log.runForDate?.slice(0, 10) === round.endDate
                                    );

                                    const gameDateFinalScoresMatch = runLogDetails.finalScoresAll?.find(
                                        (log) => log.runForDate?.slice(0, 10) === round.gameDate
                                    );

                                    const startDateOwnersMatch = runLogDetails.ownersAll?.find(
                                        (log) => log.runForDate?.slice(0, 10) === round.startDate
                                    );

                                    const endDateOwnersMatch = runLogDetails.ownersAll?.find(
                                        (log) => log.runForDate?.slice(0, 10) === round.endDate
                                    );

                                    const gameDateOwnersMatch = runLogDetails.ownersAll?.find(
                                        (log) => log.runForDate?.slice(0, 10) === round.gameDate
                                    );

                                    return (
                                        <tr key={round.title}>
                                            <td>{round.title}</td>
                                            <td>
                                                {round.startDate ? (
                                                    <>
                                                        {round.startDate}{" "}
                                                        {startDateSpreadMatch ? (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={() => {

                                                                    handleSpreadUpdate(round.startDate);

                                                                }}
                                                            >
                                                                🟢
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={() => {

                                                                    handleSpreadUpdate(round.startDate);

                                                                }}
                                                            >
                                                                ⚪
                                                            </button>
                                                        )}{" "}
                                                        {startDateFinalScoresMatch && startDateOwnersMatch ? (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={async () => {
                                                                    console.log(round.startDate)

                                                                    await handleScoreUpdate(round.startDate);
                                                                    await handleOwnerUpdate(round.startDate);
                                                                }}
                                                            >
                                                                🟢
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={async () => {
                                                                    console.log(round.startDate)

                                                                    await handleScoreUpdate(round.startDate);
                                                                    await handleOwnerUpdate(round.startDate);
                                                                }}
                                                            >
                                                                ⚪
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {round.gameDate}{" "}
                                                        {gameDateSpreadMatch ? (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={() => {

                                                                    handleSpreadUpdate(round.gameDate);
                                                                }}
                                                            >
                                                                🟢
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={() => {

                                                                    handleSpreadUpdate(round.gameDate);
                                                                }}
                                                            >
                                                                ⚪
                                                            </button>
                                                        )}{" "}
                                                        {gameDateFinalScoresMatch && gameDateOwnersMatch ? (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={async () => {

                                                                    await handleScoreUpdate(round.gameDate);
                                                                    await handleOwnerUpdate(round.gameDate);
                                                                }}
                                                            >
                                                                🟢
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={async () => {

                                                                    await handleScoreUpdate(round.gameDate);
                                                                    await handleOwnerUpdate(round.gameDate);
                                                                }}
                                                            >
                                                                ⚪
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </td>
                                            <td>
                                                {round.endDate ? (
                                                    <>
                                                        {round.endDate}{" "}
                                                        {endDateSpreadMatch ? (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={() => {

                                                                    handleSpreadUpdate(round.endDate);
                                                                }}
                                                            >
                                                                🟢
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={() => {

                                                                    handleSpreadUpdate(round.endDate);
                                                                }}
                                                            >
                                                                ⚪
                                                            </button>
                                                        )}{" "}
                                                        {endDateFinalScoresMatch && endDateOwnersMatch ? (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={async () => {

                                                                    await handleScoreUpdate(round.endDate);
                                                                    await handleOwnerUpdate(round.endDate);
                                                                }}
                                                            >
                                                                🟢
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="circle-btn"
                                                                onClick={async () => {

                                                                    await handleScoreUpdate(round.endDate);
                                                                    await handleOwnerUpdate(round.endDate);
                                                                }}
                                                            >
                                                                ⚪
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="function-group" id="update-metadata">
                    <h6>Retrieve New Metadata</h6>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <select className="form-select" style={{ maxWidth: '30%' }} onChange={(e) => setFetchMetadataInput(e.target.value)}>
                            <option value={''}>Year</option>
                            <option value={2024}>2024</option>
                            <option value={2025}>2025</option>
                            <option value={2026}>2026</option>
                        </select>
                        <button className="btn btn-primary" style={{ maxWidth: '30%' }} onClick={fetchNewMetadata}>Retrieve</button>
                    </div>
                    <h6>Stored MetaData</h6>
                    <ul>
                        {allMetadata.map((i) => {
                            return <li style={{ listStyle: 'none' }} key={i.year}>{i.year}</li>
                        })}
                    </ul>
                </div>
                <div className="function-group" id="update-group" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'right' }}>
                        <label htmlFor="spread-update-input">Update Spreads</label>
                        <input className="form-control" type="date" id="spread-update-input" onChange={(e) => setSpreadDate(e.target.value)} value={spreadDate} />
                        <button className="btn btn-primary" onClick={handleSpreadUpdate}>Go</button>
                        <p><i>Last Run: {runLogDetails?.spreadLatest?.length > 0 && runLogDetails?.spreadLatest[0]?.runOnDate ? new Date(runLogDetails.spreadLatest[0].runOnDate).toDateString() : "No log found"}</i></p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'right' }}>
                        <label htmlFor="score-update-input">Update Scores</label>
                        <input className="form-control" type="date" id="score-update-input" onChange={(e) => setScoreDate(e.target.value)} value={scoreDate} />
                        <button className="btn btn-primary" onClick={handleScoreUpdate}>Go</button>
                        <p><i>Last Run: {runLogDetails?.finalScoresLatest?.length > 0 && runLogDetails?.finalScoresLatest[0]?.runOnDate ? new Date(runLogDetails.spreadLatest[0].runOnDate).toDateString() : "No log found"}</i></p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'right' }}>
                        <label htmlFor="owner-update-input">Update Owners</label>
                        <input className="form-control" type="date" id="owner-update-input" onChange={(e) => setOwnerDate(e.target.value)} value={ownerDate} />
                        <button className="btn btn-primary" onClick={handleOwnerUpdate}>Go</button>
                        <p><i>Last Run: {runLogDetails?.ownersLatest?.length > 0 && runLogDetails?.ownersLatest[0]?.runOnDate ? new Date(runLogDetails.ownersLatest[0].runOnDate).toDateString() : "No log found"}</i></p>
                    </div>
                </div>



                <div className="function-group" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <h5>Active Leagues</h5>
                        <ul>
                            {leagueArray.map((league) => {
                                return (
                                    <li style={{ listStyle: 'none' }} key={league}>{league}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                        <div style={{display: 'flex' , flexDirection: 'column', alignItems: 'center' , gap: '1rem'}}>
                            <span>Enter League to delete.</span>
                            <input style={{ maxWidth: '60%' }} type="text" value={leagueToDelete} onChange={(e) => setLeagueToDelete(e.target.value)} className="form-control"></input>
                            <button className="btn btn-danger" onClick={handleLeagueDelete}>Delete League</button>
                        </div>
                        <div style={{display: 'flex' , flexDirection: 'column', alignItems: 'center' , gap: '1rem'}}>
                            <span>Enter League to archive.</span>
                            <input style={{ maxWidth: '60%' }} type="text" value={leagueToArchive} onChange={(e) => setLeagueToArchive(e.target.value)} className="form-control"></input>
                            <button className="btn btn-secondary" onClick={handleLeagueArchive}>Archive League</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', justifyContent: 'center' }}>
                        <select style={{ maxWidth: '40%' }} className="form-select" onChange={(e) => (setYearToReset(e.target.value))}>
                            <option value={''}>Year</option>
                            <option value={2024}>2024</option>
                            <option value={2025}>2025</option>
                            <option value={2026}>2026</option>
                        </select>
                        <button className="btn btn-danger" onClick={handleReset}>Reset All Tournament Data</button>
                    </div>

                </div>
                <div className="function-group" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
                        <h5>Queued Leagues</h5>
                        <select className="form-select" onChange={(e) => setLeagueToPush(e.target.value)}>
                            <option>Select League to Push</option>
                            {queuedLeagues.map((league) => {
                                return (
                                    <option key={league.name} value={league.name}>{league.name}</option>
                                )
                            })}
                        </select>
                        <button onClick={pushLeague} className="btn btn-secondary">Push League</button>
                </div>
            </div>
        </div>

    )
}

export default AdminDashboard;