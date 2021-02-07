import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ParameterTextBox from './ParameterTextBox';
import TemperatureSlider from './TemperatureSlider';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputSlider from './InputSlider';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));



// function FilesList(e) {
//   var i;
//   for (i = 0; i < e.target.files.length; i++) {
//     console.log(e.target.files[i].name);
//   }
//   setFileUpload(e.target.files[0].name)

//   var output = document.getElementById('fileList');
//   var children = "";
//   for (var i = 0; i < input.files.length; ++i) {
//     children += '<li>' + input.files.item(i).name + '</li>';
//   }
//   output.innerHTML = '<ul>' + children + '</ul>';
// }



export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [fileUpload, setFileUpload] = useState(null);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Input Experiment" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Generate Experiments" href="/trash" {...a11yProps(1)} />
          <LinkTab label="More Info" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
          <ParameterTextBox />
          <TemperatureSlider />

        <ParameterTextBox />
        <TemperatureSlider />
        <TemperatureSlider />
        <TemperatureSlider />
        <TemperatureSlider />
        <TemperatureSlider />
        <TemperatureSlider />
        {/* <InputSlider /> */}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <input type="file" onChange={(e) => {
            var output = document.getElementById('fileList');
            var children = "";
            for (var i = 0; i < e.target.files.length; ++i) {
              children += '<li>' + e.target.files[i].name + '</li>';
            }
            output.innerHTML = '<ul>' + children + '</ul>';
          }} multiple /><br></br>
          <label id="fileList"/>
          <Button variant="contained" color="primary">
            Upload
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel>
    </div>
  );
}
