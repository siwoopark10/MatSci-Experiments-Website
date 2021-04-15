import { makeStyles} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from "../firebase";

const useStyles = makeStyles(theme => ({
    root: {
        padding: 10,
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            display: 'flex',
        },
    },
    link: {
        fontSize:'1.5rem',
        padding:5
    }
})); 

export default function ApproveExperiments() {
    const classes = useStyles();
    const [experimentList,setExperimentList] = useState([])

    // Download proposed experiments from database
    useEffect(() => {
        database.ref("foo/proposedExperiments").get().then((snapshot) => {
            if (snapshot.exists()) {
                setExperimentList(Object.values(snapshot.val()))
            }
            else {
                console.log("No data available");
            }
        }).catch(function(error) {
            console.error(error);
        });
    },[])

    return (
        <div className={classes.root}>
            <h1>Proposed Experiments</h1>
            {experimentList.map((item)=>{
                var url = "/approve/" + item.key
                return (
                    <div key={item.key}>
                        <div className={classes.link}>
                            <Link to={url}>{item.name}</Link>
                        </div>
                        proposed by {item.fName} {item.lName}
                    </div>
                )
            })}
        </div>
    )
}

