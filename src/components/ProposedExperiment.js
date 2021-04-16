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

function ExperimentInfo(props) {
    // const classes = useStyles();
    var dataKey = Object.keys(props.data)
    return (
        <div>
            <h2 className='title'>Experiment Name: {props.name}</h2>
            <label className='data-label'>Description: {props.abstract}</label>
            <label className='data-label'>Proposed by: {props.fName} {props.lName}</label>
            {dataKey.map((key) => (<label key={key} className='data-label'>{key.slice(0,1).toUpperCase() + key.slice(1,key.length)}: {props.data[key].val} {props.data[key].unit}</label>))}
        </div>)
}


export default function ProposedExperiment() {
    // const classes = useStyles();
    const [isFetched, setIsFetched] = useState(false)
    var { id } = useParams();
    const [experimentInfo,setExperimentInfo] = useState([])
    const [redirect, setRedirect] = useState(false)
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
        var deleteJSON = database.ref("foo/proposedExperiments/"+tempJson.key).remove();
        setRedirect(true)
        setIsFetched(false)
        
    }
    if (!redirect){
        return (
        <div className='container2'>
            {isFetched && <ExperimentInfo {...experimentInfo} />}
            <form noValidate autoComplete="off" onSubmit={handleUpload}>
                <TextareaAutosize id="notes" aria-label="minimum height" 
                    style={{'minHeight': '5rem', 'width': '400px', 'display':'block' }} placeholder="Notes" />  
                    <div className='approve-reject-btn'>
                        <Button variant="contained" color="primary" type='submit' onClick={()=>(setExperimentApproved(true))}>Approve</Button>
                        <Button variant="contained" color="secondary" type='submit'>Reject</Button>
                    </div>
            </form>
        </div>
        );
    } else {
        return(
            <Redirect to="/approve" />
        )
    }
  }