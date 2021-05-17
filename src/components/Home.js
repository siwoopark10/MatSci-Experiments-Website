import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Button color="primary" style={{ textDecoration: 'none' }}><Link to="/propose">Propose Experiments</Link></Button>
            <Button color="secondary" style={{ 'textDecoration': 'none' }}><Link to="/approve">Approve Experiments</Link></Button>
        </div>
    )
}