import React from 'react';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '2em'
    },
}));

function Header() {
    const classes = useStyles();
    const history = useHistory();
    const logout = () => {
        sessionStorage.clear();
        history.push("/");
    }
    return (
        <div className={classes.root}>
            <Grid container
                spacing={6}
                alignItems="center"
                justify="center"
            >
                <Grid item>
                    <Button variant="contained" color='secondary' onClick={logout}>Logout</Button>
                </Grid>
            </Grid>
            
        </div>
    )
}

Header.propTypes = {

}

export default Header

