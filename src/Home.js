import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Home.css'

function Home() {
    const [data, setData]=useState([]);

    useEffect(() => {
        fetch("https://api.spacexdata.com/v4/launchpads", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setData(result);
        })
    }, [])

    return (
        <div className="home">
            <img className="home_image" src="https://i.pinimg.com/originals/c0/11/54/c01154dccbc6142de93558c88c989dc2.jpg" alt="launchpad" />
            <h1>SpaceX Launchpads</h1>
            <div className="home_text">
                <div className="pads">
                {data.map(pads => {
                    var launchpads=[]
                    if (pads.launches.length===0) {
                        launchpads=null;
                    }
                    else if (pads.launches.length>3) {
                        for (var i=0;i<3;i++) {
                            launchpads.push(pads.launches[i])
                        }
                    }
                    else {
                        launchpads=pads.launches;
                    }
                    return (
                        <div className="launchpads">
                            <h3>{pads.name}</h3>
                            <p>{pads.details}</p>
                            <p className={pads.status}>Current Status: {pads.status}</p>
                            <div className="launches">
                            {launchpads ? launchpads.map(lp=>
                                {
                                    return (<Link to={`/info/${lp}`}><button className="launch_button">Launch {lp.slice(-2)}</button></Link>)}
                            ) : <p>No Launch Available</p>
                            }
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Home
