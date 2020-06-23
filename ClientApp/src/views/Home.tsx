import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import $ from 'jquery';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));

function Home() {
    const history = useHistory();
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        sessionStorage.setItem("user", username);
    }

    if(sessionStorage.getItem("user"))
        history.push("/journals");
    return (
        <div className={classes.root}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item>
                        <TextField id="username" onChange={e => setUsername(e.target.value)} label="Username" variant="outlined" />
                    </Grid>
                    {
                        loading ? <div>Loading</div> : <Grid item>
                            <Button
                                color='primary'
                                style={{ margin: '0.5em' }}
                                onClick={handleSubmit}
                                variant="contained">Login</Button>
                        </Grid>
                    }
                </Grid>
            </form>
        </div>
    )
}

export default Home

