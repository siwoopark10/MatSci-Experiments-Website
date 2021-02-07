import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
// import InputRange from 'react-input-range';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function TemperatureSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Temperature range

      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
      {/* <InputRange
        maxValue = {20}
        minValue = {0}
        value={this.state.value}
        onChange={handleChange}
        /> */}
        
      <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            // onBlur={handleBlur}
            inputProps={{
              step: 10,
              // min: 0,
              // max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
    </div>
  );
}
