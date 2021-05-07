import { useState} from 'react'; 
import Button from '@material-ui/core/Button';

const Uploader = () => {
    const [result, setResult] = useState();  
    const [numExperiments, setExperiments] = useState(10); 
    const [acquisition, setAcquisition] = useState("greedy"); 
    const [file, setFile] = useState("");
    const handleUpload1 = (event) => {
        console.log(event.target.files);
        setFile(event.target.files[0]); 
    }
    // const ImageThumb = ({ image }) => {
    //     return <img src={URL.createObjectURL(image)} alt={image.name} />;
    // };
    const onDownload = () => {
        fetch(`http://127.0.0.1:5000/download/out`)
            .then(res => {
                console.log(res)
            })
    }
    const onClickHandler = () => {
        let data = new FormData() 
        let parameters = {numExperiments: numExperiments, acquisition: acquisition};
        let json = JSON.stringify(parameters); 
        const blob = new Blob([json], {
            type: 'application/json'
        });
        data.append("parameters", blob);
        data.append('file', file)
        console.log(data); 
        let options = {
            method: 'POST',
            headers: {"Authorization": localStorage.getItem("token")},
            body: data
          }
          fetch(`http://127.0.0.1:5000/upload`, options)
          .then(response => response.body)
          .then(body => {
              const reader = body.getReader()
              console.log(reader)
              reader.read().then(function processText({done, value}){
                  let temp = ""
                  for (var i = 0; i < value.length; i++) {
                    // Get the character for the current iteration
                    var char = String.fromCharCode(value[i]);
                    // Check if the char is a new line
                    if (char.match(/[^\r\n]+/g) !== null) {
                        
                        // Not a new line so lets append it to our header string and keep processing
                        temp += char;
                    } else {
                        // We found a new line character, stop processing
                        temp+= char;
                    }
                }
                setResult(temp);
                console.log(temp)
                let csvData = new Blob([temp], { type: 'text/csv' });  
                let csvUrl = URL.createObjectURL(csvData);
 
                let hiddenElement = document.createElement('a');
                hiddenElement.href = csvUrl;
                hiddenElement.target = '_blank';
                hiddenElement.download = 'example' + '.csv';
                hiddenElement.click();
              })
          })
          .catch(err => {
              console.log(err)
          })
        //   .then(result => {
        //         alert(result.message)
        //     })
    }
    return (
        <div id="upload-box">
            <div className='input-set'>
                <label>Acquisition Function</label>
                <select name="acquisitionFunction" 
                        id="acqusitionFunction" 
                        onChange = {(e) => setAcquisition(e.target.value)}>
                    <option value="greedy">Greedy Selection</option>
                    <option value="random">Random Selection</option>
                    <option value="mcal">MCAL Selection</option>
                    <option value="uncertainty">Uncertainty Selection</option>
                </select>
            </div>
            <div className='input-set'
                onChange = {(e) => setExperiments(e.target.value)}>
                <label>Number of experiments to output</label>
                <input id='outputNumber' type='number' className='number-input'/>
            </div>
            <input type="file" onChange={handleUpload1}/>
            <p>Filename: {file.name}</p>
            <p>File type: {file.type}</p>
            <p>File size: {file.size} bytes</p>
            {/* {file && <ImageThumb image={file} />} */}
            <Button variant="contained" color="primary" type="submit" onClick={onClickHandler}>
                    Upload
            </Button>
            <p>{ numExperiments }</p>
            <p>{ acquisition }</p>
            {/* <button type="submit" onClick={onClickHandler}>Upload</button>  */}
            {/* <button type = "submit" onClick={onDownload}>Download</button> */}
        </div>
    );
}
 
export default Uploader;