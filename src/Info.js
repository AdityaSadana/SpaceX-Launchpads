// import { query } from 'express';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Info.css'
import { useParams, Link } from 'react-router-dom'

function Info() {
    let id=useParams().id;
    const [time, setTime]=useState("");
    const [launches, setLaunches]=useState();

    useEffect(() => {
        axios.get(`https://api.spacexdata.com/v4/launches/${id}`)
        .then(response => {
            if (response.data.details===null) {
                response.data.details="Details not Available"
            }
            const t=new Date(response.data.date_utc)
            setTime(t.toString());
            setLaunches(response.data)
        })
    },[id])
    
    return (
        <div className="home">
            <img className="home_image" src="https://image.cnbcfm.com/api/v1/image/106848440-1614781688091-SN10-vertical-0203.jpg?v=1614782665" alt="launch_image" />
            <Link to="/"><button> Home </button></Link>
            {launches ? 
            <div className="info_text">
                <h1>{launches.name}</h1>
                <p>{launches.details}</p>
                <p className="date">Launch Date & Time: {time}</p>
                {
                    (launches.cores[0] && launches.cores[0].reused) || (launches.fairings && launches.fairings.reused) ? 
                    <div className="reuses">
                        <h3>Reused : </h3>
                        {
                            (launches.fairings && launches.fairings.reused) ? 
                            <p>Fairings</p> : <></>
                        }
                        {
                            (launches.cores && launches.cores[0].reused) ?
                            <p>Cores</p> : <></>
                        }
                    </div> : <h3 className='noreuses'>No Reuses</h3>
                }
            </div> : <div></div>
            }
            
        </div>
    )
}

export default Info