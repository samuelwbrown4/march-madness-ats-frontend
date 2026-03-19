import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'

function CreateLeague() {
    const [initialYear, setInitialYear] = useState('')
    const [numberOfOwners, setNumberOfOwners] = useState(8)
    const [owners, setOwners] = useState(Array(numberOfOwners).fill(''));
    const [leagueName, setLeagueName] = useState('');
    const [allMetadata, setAllMetadata] = useState([]);

    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        setOwners(Array(Number(numberOfOwners)).fill(''));
    }, [numberOfOwners]);

    useEffect(() => {
        fetchMetadata()
    }, [])

    async function handleInitializeTournament() {
        if (leagueName === '') {
            window.alert('Please enter a league name!')
            return;
        }

        if (initialYear === '') {
            window.alert('Please select year to initialize');
            return;
        }


        for (let owner of owners) {
            if (owner === '') {
                window.alert('Please make sure all player fields are filled out!');
                return;
            }
        }

        const availableYear = allMetadata?.find((m) => m.year === Number(initialYear))

        if (!availableYear) {
            window.alert(`Metadata for year ${initialYear} hasn't been set up yet. Please contact admin.`);
            return;
        }


        let endOfFirstFourString = availableYear.rounds[0].endDate
        let [year, month, day] = endOfFirstFourString.split('-').map(Number);
        let endOfFirstFour = new Date(year, month - 1, day, 23, 59, 59, 999);
        let today = new Date()

        console.log('availableYear:', availableYear);
        console.log('rounds[0]:', availableYear.rounds[0]);
        console.log('endOfFirstFourString:', endOfFirstFourString);
        console.log('endOfFirstFour:', endOfFirstFour);
        console.log('today:', today);
        console.log('today < endOfFirstFour:', today < endOfFirstFour);

        if (today < endOfFirstFour) {
            let response = await fetch(`${API_URL}/api/leagues/queue-league`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ leagueName: leagueName, owners: owners, numberOfOwners: numberOfOwners, year: initialYear, runDate: Date.now() })
            })

            let data = await response.json();

            if (data.error === 'League name already exists!') {
                window.alert('League name already exists!')
            } else {
                console.log('About to show toast');
                alert('League queued successfully!')
                navigate('/')

            }
            return;
        }


        let response = await fetch(`${API_URL}/api/leagues/initialize-tournament`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ leagueName: leagueName, owners: owners, numberOfOwners: numberOfOwners, year: initialYear, runDate: Date.now() })
        });

        let data = await response.json();

        if (data.error === 'League name already exists!') {
            window.alert('League name already exists!')
        } else {
            window.alert('League created successfully!')
            navigate('/')
        }


    }

    async function fetchMetadata() {
        let response = await fetch(`${API_URL}/api/admin/get-metadata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        setAllMetadata(result.metadata);

    }



    return (
        <div id="create-league">
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
                        <Link className="header-button" to="/" onClick={() => setShowMenu(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="header-svg" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                            </svg>
                            {`${showMenu ? 'Home' : ''}`}
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

                <div id="create-league-header">
                    <h2>Create League</h2>
                </div>

                <div className="header-right"></div>
            </div>
            <div className="create-league-content">
                <div className="function-group" id="initialize-group" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h5> League Name </h5>
                        <input type="text" id="create-league-name" className="form-control" value={leagueName} onChange={e => setLeagueName(e.target.value)}></input>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h6 style={{ textAlign: 'center' }}> Select Year To Initialize Tournament For </h6>
                            <select className="form-select" id="year-select" onChange={(e) => setInitialYear(e.target.value)}>
                                <option value={''}>Select Year</option>
                                {allMetadata.map((m) => {
                                    return (
                                        <option key={m.year} value={m.year}>{m.year}</option>
                                    )
                                })}

                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h6 style={{ textAlign: 'center' }}>Number of Participants</h6>
                            <select className="form-select" id="participant-select" onChange={(e) => setNumberOfOwners(Number(e.target.value))}>
                                <option value={8}>8</option>
                                <option value={64}>64</option>
                            </select>
                        </div>

                    </div>

                    <h6 style={{ textAlign: 'center' }}>Enter Participant Names</h6>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                        <ol style={{ gap: '1rem' }} className="input-group">
                            {owners.map((owner, i) => {
                                return (
                                    <li style={{ marginLeft: '0.5rem' }} key={i} ><input style={{ maxWidth: '100%' }} className="input-group-text" type="text" value={owners[i]} onChange={(e) => {
                                        const spreadOwners = [...owners];
                                        spreadOwners[i] = e.target.value;
                                        setOwners(spreadOwners)
                                    }} /></li>
                                )
                            })}
                        </ol>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button className="btn btn-primary" onClick={handleInitializeTournament}>Initialize</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLeague;