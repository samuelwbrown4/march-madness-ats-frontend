import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function CreateLeague() {
    const [initialYear, setInitialYear] = useState('')
    const [numberOfOwners, setNumberOfOwners] = useState(8)
    const [owners, setOwners] = useState(Array(numberOfOwners).fill(''));
    const [leagueName, setLeagueName] = useState('');

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        setOwners(Array(Number(numberOfOwners)).fill(''));
    }, [numberOfOwners]);

    async function handleInitializeTournament() {
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


    return (
        <div id="create-league">
            <div className="function-group" id="initialize-group" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h5> League Name </h5>
                    <input type="text" id="create-league-name" className="form-control" value={leagueName} onChange={e => setLeagueName(e.target.value)}></input>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' , alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h6> Select Year To Initialize Tournament For </h6>
                    <select className="form-select" id="year-select" onChange={(e) => setInitialYear(e.target.value)}>
                        <option value={''}>Select Year</option>
                        <option value={2024}>2024</option>
                        <option value={2025}>2025</option>
                        {/*<option value={2026}>2026</option>*/}
                    </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h6>Number of Participants</h6>
                    <select className="form-select" id="participant-select" onChange={(e) => setNumberOfOwners(Number(e.target.value))}>
                        <option value={8}>8</option>
                        <option value={64}>64</option>
                    </select>
                    </div>

                </div>
                <div>
                    <h6>Enter Participant Names</h6>
                    <ol className="input-group">
                        {owners.map((owner, i) => {
                            return (
                                <li key={i} ><input className="input-group-text" type="text" value={owners[i]} onChange={(e) => {
                                    const spreadOwners = [...owners];
                                    spreadOwners[i] = e.target.value;
                                    setOwners(spreadOwners)
                                }} /></li>
                            )
                        })}
                    </ol>
                </div>

                <div>
                    <button className="btn btn-primary" onClick={handleInitializeTournament}>Initialize</button>
                </div>
            </div>
        </div>
    )
}

export default CreateLeague;