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
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Register() {
    const history = useHistory();
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        $.ajax({
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            url: "https://localhost:5001/api/register",
            data: JSON.stringify({
                encrypted: btoa(username + ":" + password)
            })
        }).done((event) => {
            sessionStorage.setItem("AuthorizationToken", event)
            history.push("/recipes");
        }).fail(function (event) {
            console.log(event);
            alert("Invalid credentials!");
            setLoading(false);
        })
    }

    if(sessionStorage.getItem("AuthorizationToken"))
        history.push("/recipes");
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
                    <Grid item>
                        <TextField id="password" type="password"  onChange={e => setPassword(e.target.value)} label="Password" variant="outlined" />
                    </Grid>
                    {
                        loading ? <div>Loading</div> : <Grid item>
                            <Button
                                color='primary'
                                style={{ margin: '0.5em' }}
                                onClick={handleSubmit}
                                variant="contained">Register</Button>
                            <Button
                                color='secondary'
                                style={{ margin: '0.5em' }}
                                variant="contained"
                                onClick={()=>{history.push("/")}}>Abort</Button>
                        </Grid>
                    }
                </Grid>
            </form>
        </div>
    )
}

export default Register

