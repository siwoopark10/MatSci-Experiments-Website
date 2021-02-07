import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
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