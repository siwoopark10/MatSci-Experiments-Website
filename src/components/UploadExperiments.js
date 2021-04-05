import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import firebase, { storage,database } from "../firebase";

function UploadExperiments() {
    const [experiments, setExperiments] = useState([])

    const handleChange = e => {
        var output = document.getElementById('experimentList');
        var children = "";
        console.log(e.target.files);
        for (var i = 0; i < e.target.files.length; ++i) {
            children += '<li>' + e.target.files[i].name + '</li>';
        }
        setExperiments(e.target.files)
        output.innerHTML = '<ul>' + children + '</ul>';
    }

    const handleUpload = e => {
        e.preventDefault();
        for (let i = 0; i < experiments.length; i++) {
            uploadFilesAsPromise(experiments[i],e.target.experimentName.value.toLowerCase());
        }
    }
    function uploadFilesAsPromise(file,experimentName) {
        console.log(experimentName);
        return new Promise(function (resolve, reject) {
            const uploadFile = storage.ref('unapprovedExperiments/'+ experimentName+"/"+ file.name).put(file);
            uploadFile.on(
                "state_changed",
                snapshot => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                      case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                      case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    } },
                error => {
                    console.log(error);
                },
                () => {
                    alert("Files are uploaded to "+ experimentName)
                    uploadFile.snapshot.ref.getDownloadURL().then(url => {
                            console.log(url);
                            // possible improvements: find a way to add urls all at once, check for duplicate files
                            database.ref("unapprovedExperiments").child(experimentName).get().then(function(snapshot) {
                                if (snapshot.exists()) {
                                    console.log(snapshot.val());
                                    alert(experimentName+" exits in database");
                                    var newPostKey = firebase.database().ref().child('posts').push().key;
                                    var storageFiles = url
                                    var updates = {};
                                    updates['/unapprovedExperiments/' + experimentName + '/inputFiles/'+newPostKey] = storageFiles;
                                    firebase.database().ref().update(updates);
                                }
                                else {
                                    alert(experimentName +" doesn't exist in database");
                                }
                            }).catch(function(error) {
                                console.error(error);
                            });
                        });
                }
            )
        })
    }

    return (
        <div className="experiment-tab">
        <form noValidate autoComplete="off" onSubmit={handleUpload}>
            <div className="experiment-tab-data">
            <label>Experiment Name</label>
            <input id="experimentName" type='text' ></input>
            <br></br>
                <input type="file" onChange={handleChange} multiple />
                <br></br>
                <label id="experimentList" />
            </div>
            <div className="upload-btn">
                <Button variant="contained" color="primary" type="submit">
                    Upload
            </Button>
            </div>
            </form>
        </div>
    )
}

export default UploadExperiments;