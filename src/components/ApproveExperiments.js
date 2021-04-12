import { makeStyles, Button } from '@material-ui/core';
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
})); 

export default function ApproveExperiments() {
    const classes = useStyles();
    const [experimentList,setExperimentList] = useState([])

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
            {experimentList.map((item)=><div>{item.name}</div>)}

        </div>
    )
}

