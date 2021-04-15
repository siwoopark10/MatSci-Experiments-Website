import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {database} from '../firebase'
import {
    BrowserRouter as Router,
    Redirect,
    Link,
    useParams
  } from "react-router-dom";
import { Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 10,
        display: 'block',
        // textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        padding: 5,
    },
    data: {
        fontSize: '1.2rem',
        padding: 5,
    },
    uploadBtn: {
        margin: '10px 10px',
        width: '400px',
        display:'flex',
        justifyContent: 'space-around'
      }
})); 

function ExperimentInfo(props) {
    const classes = useStyles();
    var dataKey = Object.keys(props.data)
    return (
        <div>
            <div className={classes.title}>Experiment Name: {props.name}</div>
            <div className={classes.data}>Description: {props.abstract}</div>
            <div className={classes.data}>Proposed by: {props.fName} {props.lName}</div>
            {dataKey.map((key) => (<div key={key} className={classes.data}>{key.slice(0,1).toUpperCase() + key.slice(1,key.length)}: {props.data[key].val} {props.data[key].unit}</div>))}
        </div>)
}


export default function ProposedExperiment() {
    const classes = useStyles();
    const [isFetched, setIsFetched] = useState(false)
    var { id } = useParams();
    const [experimentInfo,setExperimentInfo] = useState([])
    const [experimentApproved,setExperimentApproved] = useState(false)

    useEffect(() => {
        var ref = "foo/proposedExperiments/" + id
        database.ref(ref).on("value",(snapshot) => {
            setExperimentInfo(snapshot.val())
            setIsFetched(true)
        })
    },[])

    const handleUpload = (e) => {
        e.preventDefault()
        const tempJson = experimentInfo
        tempJson['notes'] = e.target.notes.value
        if (experimentApproved){
            var ref = database.ref("foo/approvedExperiments/"+tempJson.key)
        } else {
            var ref = database.ref("foo/rejectedExperiments/"+tempJson.key)
        }
        var uploadJSON = ref.set(
            tempJson,
            (error) => {
            if (error) {
              alert("Error")
            } else {
              alert("Upload successful")
            }
          });
        // var deleteJSON = database.ref("foo/proposedExperiments/"+tempJson.key).remove();
    }
    
    return (
      <div className={classes.root}>
        {isFetched && <ExperimentInfo {...experimentInfo} />}
        <form noValidate autoComplete="off" onSubmit={handleUpload}>
            <TextareaAutosize id="notes" aria-label="minimum height" 
                style={{'minHeight': '5rem', 'width': '400px', 'display':'block' }} placeholder="Notes" />
            <div className={classes.uploadBtn}>
                <Button variant="contained" color="primary" type='submit' onClick={()=>(setExperimentApproved(true))}>Approve</Button>
                <Button variant="contained" color="secondary" type='submit'>Reject</Button>
            </div>
        </form>
      </div>
    );
  }