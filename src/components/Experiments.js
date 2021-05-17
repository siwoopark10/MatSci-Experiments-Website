import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { database } from "../firebase";
import { UserContext } from '../UserContext';


// const useStyles = makeStyles(theme => ({
//     root: {
//         padding: 10,
//         '& > *': {
//             margin: theme.spacing(1),
//             width: '25ch',
//             display: 'flex',
//         },
//     },
//     link: {
//         fontSize:'1.5rem',
//         padding:5
//     }
// })); 

export default function Experiments({ type }) {
    // const classes = useStyles();
    const [experimentList, setExperimentList] = useState([])
    const { user, setUser } = useContext(UserContext)
    const typeTitle = type.charAt(0).toUpperCase() + type.slice(1)

    useEffect(() => {
        database.ref("experiments/" + type).get().then((snapshot) => {
            if (snapshot.exists()) {
                setExperimentList(Object.values(snapshot.val()))
            }
            else {
                console.log("No data available");
            }
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    if (user == null) {
        return (
            <Redirect to="/" />
        )
    } else {
        return (
            <div className='container2'>
                <div className='title'>
                    <h2>{typeTitle} Experiments</h2>
                </div>
                {experimentList.map((item) => {
                    // change url, change reject to deny
                    var url = "/" + user.id + "/review/" + type + "/" + item.experimentKey
                    return (
                        <div key={item.key}>
                            <div className='link'>
                                <Link to={url}>{item.name}</Link>
                            </div>
                        Proposed by {item.firstName} {item.lastName} from {item.orgName}
                        </div>
                    )
                })}
            </div>
        )
    }
}

