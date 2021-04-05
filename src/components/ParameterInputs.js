import Button from '@material-ui/core/Button';
import firebase, { storage } from "../firebase";

function ParameterInputs(){
    const downloadExperiment = () =>{
        firebase.database().ref("experiments").once('value', function(snapshot){
            document.getElementById("Experiment") = snapshot.val()
        });
    }
   

return <div>
    <label id = "Experiment">
    <Button variant="contained" color="primary" onClick={downloadExperiment}>
            Download Experiment here
          </Button>
          </label>
</div>
}
export default ParameterInputs;
