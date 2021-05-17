import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { storage,database } from "../firebase";
import axios from 'axios'
import Uploader from './Upload';

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
        const options = {
            url: 'http://127.0.0.1:5000/upload',
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
              a: 10,
              b: 20
            }
        };
          
        axios(options)
            .then(response => {
                console.log(response.status);
        });
        // console.log(acquisitionFunction, outputNumber, experimentName);
        // let formData = new FormData();
        // formData.append("file", file);
        // const options = {
        //     method: "post",
        //     url: 'http://127.0.0.1:5000/upload/file',
        //     data: formData,
        // };
        // // send the request
        // axios(options).then(res => {
        //     console.log("Hello World")
        // }).catch((error) => {
        //     console.log(error)
        //     // errors intercepted in interceptor.
        // });
        // fetch('http://127.0.0.1:5000/upload/file', {
        //     method: 'POST',
        //     'headers': new Headers({
        //         // 'Content-Type': undefined,
        //         'Accept': '*/*',
        //         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        //         'Access-Control-Allow-Headers': 'origin,X-Requested-With,content-type,accept',
        //         'Access-Control-Allow-Credentials': 'true' 
        
        //     }),
        //     body: formData
            
        // }).then(res => {
        //     let response = res
        //     console.log(res)
        // });

        const uploadFile = storage.ref('fileExperiments/'+ experimentName +"/"+ fileName).put(file);
        uploadFile.on(
            "state_changed",
            snapshot => { console.log("uploading in progress")},
            error => {
                alert(error);
            },
            () => {
                // alert("Uploaded to storage")
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
                //   alert("Uploaded to database")
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
                {/* <div className='input-set'>
                    <label>Acquisition Function</label>
                    <select name="acquisitionFunction" id="acqusitionFunction" >
                        <option value="greedy">Greedy Selection</option>
                        <option value="random">Random Selection</option>
                        <option value="mcal">MCAL Selection</option>
                        <option value="uncertainty">Uncertainty Selection</option>
                    </select>
                </div>
                <div className='input-set'>
                    <label>Number of experiments to output</label>
                    <input id='outputNumber' type='number' className='number-input'/>
                </div> */}
                {/* <div className='input-set'>
                    <input id='experimentFile' type="file" onChange={(e)=>{setFileName(e.target.files[0].name)}} />
                </div>
            <div className='form-submit'>
                <Button variant="contained" color="primary" type="submit">
                    Upload
                </Button>
            </div> */}
            </form>
            <Uploader />
        </div>
    )
}