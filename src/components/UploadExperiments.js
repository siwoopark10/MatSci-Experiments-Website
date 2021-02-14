import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import firebase, { storage } from "../firebase";

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

    const handleUpload = () => {
        for (let i = 0;i<experiments.length;i++) {
            uploadFilesAsPromise(experiments[i]);
        }       
    }
    function uploadFilesAsPromise(file){
        console.log(file);
        return new Promise(function (resolve,reject){
            const uploadFile = storage.ref(`experiments/${file.name}`).put(file);
            
            uploadFile.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("experiments")
                        .child(file.name)
                        .getDownloadURL()
                        .then(url => {
                        console.log(url);
                    });
                }
            ) 
        })
    }

    return <div>
          <input type="file" onChange={handleChange} multiple />
          <br></br>
          <label id="experimentList"/>
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </div>
}

export default UploadExperiments;