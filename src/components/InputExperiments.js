import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import ParameterTextBox from './ParameterTextBox';
import TemperatureSlider from './TemperatureSlider';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import firebase, { storage,database } from "../firebase";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            display: 'flex',
        },
    },
}));



function InputExperiments() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);
    const [requiredData, setRequiredData] = useState()

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
        console.log(nodeIds)

    };

    // Input Data Set
    const inputDataset = {
        concentration: { val: 0, unit: "mol" },
        solvent: { val: 0, unit: "liters" },
        annealingTemperature: { val: 0, unit: "celcius" },
        annealingTime: { val: 0, unit: "sec" },
        processingTemperature: { val: 0, unit: "celcius" },
        processingSpeed: { val: 0, unit: "rev/sec" },
        inkTemperature: { val: 0, unit: "celcius" }
    }

    function InputData(){
        var rows=[]
        Object.keys(inputDataset).forEach(key => {
            var text = key.slice(0,1).toUpperCase() + key.slice(1, key.length);
            rows.push(<div key={key}>
                <label>{text}</label>
                <TextField
                    id={key}
                    variant="outlined"
                    placeholder= "0"
                    style={{'marginBottom':'10px', 'display':'inline', 'marginLeft':'100px'}}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">{inputDataset[key].unit}</InputAdornment>,
                    }} 
                />
            </div>)
        })
        return rows; 
    }

    const handleUpload = e => {
        e.preventDefault();
        const experimentName = e.target.experimentName.value.toLowerCase();
        const abstract = e.target.abstract.value;
        Object.keys(inputDataset).forEach(key => {
            inputDataset[key].val = e.target[key].value
        });
        console.log(inputDataset);
        var uploadJSON = database.ref("foo/unapprovedExperiments/"+experimentName).set({
            name: experimentName,
            abstract: abstract,
            data: inputDataset
        },(error) => {
            if (error) {
              alert("Error")
            } else {
              alert("Upload successful")
            }
          });
        // uploadJSON.on
    }


    return (
        <div className="experiment-tab">
            <form noValidate autoComplete="off" onSubmit={handleUpload}>
            <div className="experiment-tab-data">
            <label>Experiment Name</label>
            <input id="experimentName" type='text' ></input>
                <label style={{ 'display': 'block' }}>Experiment Description</label>
                <TextareaAutosize id="abstract" aria-label="minimum height" style={{ 'minHeight': '5rem', 'width': '400px' }} placeholder="Abstract" />
                <InputData />
                {/* <TreeView
                    // className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    selected={selected}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                >
                    <TreeItem nodeId="1" label="Mixer">
                        <div >
                            <TemperatureSlider />
                        </div>
                    </TreeItem>
                    <TreeItem nodeId="5" label="Coater">
                        <TreeItem nodeId="6" label="Material-UI">
                            <TreeItem nodeId="7" label="src">
                                <TreeItem nodeId="8" label="index.js" />
                                <TreeItem nodeId="9" label="tree-view.js" />
                            </TreeItem>
                        </TreeItem>
                    </TreeItem>
                    <TreeItem nodeId="10" label="Hotplate">
                        <TreeItem nodeId="11" label="Calendar" />
                        <TreeItem nodeId="12" label="Chrome" />
                        <TreeItem nodeId="13" label="Webstorm" />
                    </TreeItem>
                </TreeView> */}
            </div>
            <div className="upload-btn">
                <Button variant="contained" color="primary" type="submit">
                    Upload
                </Button>
            </div>
        </form>
        </div>
    );
}

export default InputExperiments;
