import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UploadExperimentFiles from './UploadExperimentFiles';
import InputExperimentData from "./InputExperimentData";
import { UserContext } from "../UserContext"; 
import Experiments from './Experiments';
import { Redirect } from 'react-router';



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
          <Typography component={'span'}>{children}</Typography>
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

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { user, setUser } = useContext(UserContext)
  if (user == null) {
    return (
      <Redirect to="/" />
    )
  } else if (user.role == 'non-admin') {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Input Experiment" href="/input" {...a11yProps(0)} />
            <LinkTab label="Upload Experiments" href="/upload" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <InputExperimentData />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UploadExperimentFiles />
        </TabPanel>
      </div>
    );
  } else if (user.role == "admin") {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Upload Experiments" href="/upload" {...a11yProps(0)} />
            <LinkTab label="Proposed Experiments" href="/input" {...a11yProps(1)} />
            <LinkTab label="Approved Experiments" href="/upload" {...a11yProps(2)} />
            <LinkTab label="Denied Experiments" href="/upload" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <UploadExperimentFiles />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Experiments type="proposed" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Experiments type="approved"/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Experiments type="denied"/>
        </TabPanel>
      </div>
    );
  }
}
