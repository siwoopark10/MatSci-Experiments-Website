import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { database } from '../firebase'
import {
    BrowserRouter as Router,
    Redirect,
    Link,
    useParams,
    useHistory
} from "react-router-dom";
import { Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { UserContext } from '../UserContext';


export default function ExperimentDetail() {
    // const classes = useStyles();
    const [isFetched, setIsFetched] = useState(false)
    var { uid, type, id } = useParams();
    var history = useHistory()
    const { user, setUser } = useContext(UserContext)
    const [experimentInfo, setExperimentInfo] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [experimentApproved, setExperimentApproved] = useState(false)

    function ExperimentInfo(props) {
        // const classes = useStyles();
        var dataKey = Object.keys(props.data)
        return (
            <div>
                <h2 className='title'>Experiment Name: {props.name}</h2>
                <label className='data-label'>Description: {props.abstract}</label>
                <label className='data-label'>Proposed by: {props.firstName} {props.lastName} from {props.orgName}</label>
                {dataKey.map((key) => (<label key={key} className='data-label'>{key.slice(0, 1).toUpperCase() + key.slice(1, key.length)}: {props.data[key].val} {props.data[key].unit}</label>))}
                {type != "proposed" && <label className='data-label'>Notes: {props.notes}</label>}
            </div>)
    }

    useEffect(() => {
        var ref = "experiments/" + type + "/" + id
        database.ref(ref).on("value", (snapshot) => {
            setExperimentInfo(snapshot.val())
            setIsFetched(true)
        })
    }, [])

    const handleUpload = (e) => {
        e.preventDefault()
        const tempJson = experimentInfo
        tempJson['notes'] = e.target.notes.value
        if (experimentApproved) {
            var ref = database.ref("experiments/approved/" + tempJson.experimentKey)
        } else {
            var ref = database.ref("experiments/denied/" + tempJson.experimentKey)
        }
        var uploadJSON = ref.set(
            tempJson,
            (error) => {
                if (error) {
                    alert("Error")
                } else {
                    console.log("uploaded")
                }
            });
        var deleteJSON = database.ref("experiments/proposed/" + tempJson.experimentKey).remove();
        setRedirect(true)
        setIsFetched(false)
    }

    const backToReview = () => {
        const url = "/" + user.id + "/review/"
        history.push(url)
    }

    if (user == null) {
        return (
            <Redirect to="/" />
        )
    } else if (!redirect) {
        return (
            <div className='container2'>
                {isFetched && <ExperimentInfo {...experimentInfo} />}
                {type == "proposed"
                    ? <form noValidate autoComplete="off" onSubmit={handleUpload}>
                        <TextareaAutosize id="notes" aria-label="minimum height"
                            style={{ 'minHeight': '5rem', 'width': '400px', 'display': 'block' }} placeholder="Notes" />
                        <div className='approve-deny-btn'>
                            <Button variant="contained" color="primary" type='submit' onClick={() => (setExperimentApproved(true))}>Approve</Button>
                            <Button variant="contained" color="secondary" type='submit'>Deny</Button>
                        </div>
                    </form>
                    : <div className='approve-deny-btn'>
                        <Button variant="contained" color="primary" type='submit' onClick={backToReview}>Back to Review</Button>
                    </div>}
            </div>
        );
    } else {
        { backToReview }
    }
}