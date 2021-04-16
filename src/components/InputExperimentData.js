import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { storage,database } from "../firebase";

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '25ch',
    },
  }));

export default function InputExperimentData() {
    const classes = useStyles();

    // Input Data Set
    const inputDataset = {
        concentration: { val: 0, unit: "mol" },
        solvent: { val: 0, unit: "liters" },
        annealingTemperature: { val: 0, unit: "\u00b0C" },
        annealingTime: { val: 0, unit: "sec" },
        processingTemperature: { val: 0, unit: "\u00b0C" },
        processingSpeed: { val: 0, unit: "rev/sec" },
        inkTemperature: { val: 0, unit: "\u00b0C" }
    }

    function InputData(){
        var rows=[]
        Object.keys(inputDataset).forEach(key => {
            var text = key.slice(0,1).toUpperCase() + key.slice(1, key.length);
            rows.push(<div key={key} className='experiment-parameter'>
                <label>{text}</label>
                <TextField
                    id={key}
                    variant="outlined"
                    placeholder= "0"
                    className={clsx(classes.margin, classes.textField, 'data-text-field')}
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="start">{inputDataset[key].unit}</InputAdornment>,
                    }} 
                />
            </div>)
        })
        return rows; 
    }

    // Upload JSON to database
    const handleUpload = e => {
        e.preventDefault();
        const experimentKey = database.ref("foo/proposedExperiments").push().key;
        const experimentName = e.target.experimentName.value.toLowerCase();
        const abstract = e.target.abstract.value;
        const fName = e.target.fName.value;
        const lName = e.target.lName.value;
        const orgName = e.target.orgName.value;
        Object.keys(inputDataset).forEach(key => {
            inputDataset[key].val = e.target[key].value
        });
        console.log(inputDataset);
        var uploadJSON = database.ref("foo/proposedExperiments/"+experimentKey).set({
            name: experimentName,
            fName: fName,
            lName: lName,
            orgName: orgName,
            key: experimentKey,
            abstract: abstract,
            data: inputDataset
        },(error) => {
            if (error) {
              alert("Error")
            } else {
              alert("Upload successful")
              e.target.reset();
            }
          });
    }

    return (
        <div className='container'>
            <form noValidate autoComplete="off" onSubmit={handleUpload}>
                <div className='title'>
                    <h2>Propose New Experiment</h2>
                </div>
                    <label>Experiment Name</label>
                    <input id="experimentName" type='text' ></input>
                    <label>First Name</label>
                    <input id="fName" type='text' ></input>
                    <label>Last Name</label>
                    <input id="lName" type='text' ></input>
                    <label>Organization Name</label>
                    <input id="orgName" type='text' ></input>
                    <label>Experiment Description</label>
                    <TextareaAutosize id="abstract" aria-label="minimum height" 
                        placeholder="Abstract" />
                <InputData />
                <div className='form-submit'>
                    <Button variant="contained" color="primary" type="submit">
                        Upload
                    </Button>
                </div>
            </form>
        </div>
    );
}

