import React from 'react';
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
import firebase, { storage } from "../firebase";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            display: 'flex',
        },
    },
}));

function InputData(props) {
    console.log(props);
    let text = props.id.slice(0,1).toUpperCase() + props.id.slice(1, props.id.length);
    return (<div>
        <label>{text}</label>
        <TextField
            id={props.id}
            variant="outlined"
            defaultValue = "0"
            style={{'marginBottom':'10px', 'display':'inline', 'marginLeft':'100px'}}
            InputProps={{
                endAdornment: <InputAdornment position="start">{props.unit}</InputAdornment>,
            }} 
        />
    </div>)
}

export default function InputExperiments() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
        nodeIds.map(n => console.log("expanded nodeIDs: " + n))
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
        console.log(nodeIds)

    };

    // Input Data Set
    const inputDataset = {
        concentration: {val:0, unit:"mol"},
        solvent:{val:0, unit:"liters"},
        annealingTemperature:{val:0, unit:"celcius"},
        annealingTime:{val:0, unit:"sec"},
        processingTemperature:{val:0, unit:"celcius"},
        processingSpeed:{val:0, unit:"rev/sec"},
        inkTemperature:{val:0, unit:"celcius"}
    }
    var inputVariables= []
    Object.keys(inputDataset).forEach(key => {
        inputVariables.push(key)
    })

    // Upload JSON
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

    return (
        <div>
            <label style={{'display':'block'}}>Experiment Description</label>
            <TextareaAutosize aria-label="minimum height" style={{ 'min-height': '5rem', 'width': '400px' }} placeholder="Abstract" />
            <form noValidate autoComplete="off">
                {inputVariables.map(input => <InputData id= {input} unit={inputDataset[input].unit} />)}  
            </form>

            <TreeView
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
                    {/* <TreeItem nodeId="2" label="Calendar" />
                    <TreeItem nodeId="3" label="Chrome" />
                    <TreeItem nodeId="4" label="Webstorm" /> */}
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
            </TreeView>
            <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </div>
    );
}
