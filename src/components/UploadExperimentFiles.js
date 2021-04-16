import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import firebase, { storage,database } from "../firebase";

// const useStyles = makeStyles(theme => ({
//     experimentTab: {
//         padding: '5px',
//       },
//       experimentTabData: {
//         padding: '10px 20px',
//         border: '2px solid black',  
//         borderRadius: '10px',
//         justifyContent: 'space-evenly'
//       },
//       uploadBtn: {
//         margin: '10px 0',
//       }
// }));

export default function UploadExperimentFiles() {
    // const classes = useStyles();
    const [fileName, setFileName] = useState([''])
    const [url, setUrl] = useState('')
    const [acquisitionFunction, setAcquisitionFunction] = useState('')
    const [outputNumber, setOutputNumber] = useState('')
    const [experimentName, setExperimentName] = useState('')

    // Upload each file as a promise to firebase storage
    const handleUpload = e => {
        e.preventDefault();
        setAcquisitionFunction(e.target.acquisitionFunction.value)
        setOutputNumber(e.target.outputNumber.value)
        setExperimentName(e.target.experimentName.value)
        const file = e.target.file
        console.log(acquisitionFunction, outputNumber, experimentName);
        const uploadFile = storage.ref('fileExperiments/'+ experimentName +"/"+ fileName).put(file);
        uploadFile.on(
            "state_changed",
            snapshot => { console.log("uploading in progress");},
            error => {
                alert(error);
            },
            () => {
                alert("Uploaded to storage")
                uploadFile.snapshot.ref.getDownloadURL().then(url => {
                        console.log(url);
                        setUrl(url)
                    });
                e.target.reset();
            }
        )
    }

    useEffect(() => {
        if (url != ''){
            database.ref('foo/fileExperiments/' + experimentName).set({
                experimentName: experimentName,
                acquisitionFunction: acquisitionFunction,
                outputNumber: outputNumber,
                fileUrl: url
            },(error) => {
                if (error) {
                  alert("Error")
                } else {
                  alert("Uploaded to database")
                }
              })
        }
    },[url])

    return (
        <div className="container">
        <form noValidate autoComplete="off" onSubmit={handleUpload}>
                <div className='title'>
                    <h2>Upload New Experiment File</h2>
                </div>
                    <label>Experiment Name</label>
                    <input id="experimentName" type='text' />
                <div className='input-set'>
                    <label>Acquisition Function</label>
                    <select name="acquisitionFunction" id="acqusitionFunction">
                        <option value="greedy">Greedy Selection</option>
                        <option value="random">Random Selection</option>
                        <option value="mcal">MCAL Selection</option>
                        <option value="uncertainty">Uncertainty Selection</option>
                    </select>
                </div>
                <div className='input-set'>
                    <label>Number of experiments to output</label>
                    <input id='outputNumber' type='number' className='number-input'/>
                </div>
                <div className='input-set'>
                    <input id='experimentFile' type="file" onChange={(e)=>{setFileName(e.target.files[0].name)}} />
                </div>
            <div className='form-submit'>
                <Button variant="contained" color="primary" type="submit">
                    Upload
                </Button>
            </div>
            </form>
        </div>
    )
}