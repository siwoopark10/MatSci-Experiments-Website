import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';


function ParameterTextBox(){
    const classes = useStyles();
    const getData=() =>{
        console.log("get Data")
    }
    return (
        <div className = {classes.root}>
            <TextField id="parameter1" 
            label="Enter Parameter1" 
            color="secondary" 
            variant="outlined"
            onChange={getData}>
            </TextField> 
            <TextField id="parameter2" 
            label="Enter Parameter2" 
            color="secondary" 
            variant="outlined"
            onChange={getData}>
            </TextField> 
            <TextField id="parameter3" 
            label="Enter Parameter3" 
            color="secondary" 
            variant="outlined"
            onChange={getData}>
            </TextField> 
            <TextField id="parameter4" 
            label="Enter Parameter4" 
            color="secondary" 
            variant="outlined"
            onChange={getData}>
            </TextField> 
            <TextField id="parameter5" 
            label="Enter Parameter5" 
            color="secondary" 
            variant="outlined"
            onChange={getData}>
            </TextField> 
            <TextField id="parameter6" 
            label="Enter Parameter6" 
            color="secondary" 
            variant="outlined"
            onChange={getData}>
            </TextField> 
        </div>

    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
    },
}));

export default ParameterTextBox;