import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import {Grid} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        // parameter6:{
        //     paddingBottom: 10,
        //     height: 100,
        // }
    //    parameter6:"margin: "
    },
}));

function ParameterTextBox(){
    const classes = useStyles();
    const getData=() =>{
        console.log("get Data")
    }
    return (
        <div className = {classes.root}>
            
            <Grid container direction={"column"} spacing={5}>
             <Grid item>
                <TextField 

                id="parameter1" 
                label="Enter Parameter1" 
                color="secondary" 
                variant="outlined"
                onChange={getData}>
                </TextField>
            </Grid>
            {/* <Grid item>
                <TextField id="parameter2" 
                label="Enter Parameter2" 
                color="secondary" 
                variant="outlined"
                onChange={getData}>
                </TextField> 
            </Grid>
            <Grid item>
                <TextField id="parameter3" 
                label="Enter Parameter3" 
                color="secondary" 
                variant="outlined"
                onChange={getData}>
                </TextField> 
            </Grid>
            <Grid item>
                <TextField id="parameter4" 
                label="Enter Parameter4" 
                color="secondary" 
                variant="outlined"
                onChange={getData}>
                </TextField> 
            </Grid>
            <Grid item>
                <TextField id="parameter5" 
                label="Enter Parameter5" 
                color="secondary" 
                variant="outlined"
                onChange={getData}>
                </TextField> 
            </Grid>
            <Grid item>
                <TextField id="parameter6" 
                label="Enter Parameter6" 
                
                color="secondary" 
                variant="outlined"
                
                onChange={getData}>
                </TextField> 
            </Grid> */}
            </Grid>
        </div>
    );
}

export default ParameterTextBox;