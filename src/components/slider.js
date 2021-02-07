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
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { CenterFocusStrong, VolumeUp } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        width:250,
        position: Center,
    },
    input:{
        width: 42,
    },
});
export default function InputSlider(){
    const classes = useStyles();
    const [value, setValue] = React.useState(20);
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    return (
        <div className={classes.root}>
            <Typography id="input-slider" gutterBottom>
                Parameter1
            </Typography>
            <Grid item xs>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  />
                    
                </Grid>
                <Grid item>
                    <Input 
                    className={classes.input}
                    value={value}
                    margin="dense"
                    onChange={handleInputChange}
                    inputProps={{
                        step:10,
                        //min
                        //max
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                    />

            </Grid>
        </div>
    ); 
}