import React, {useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory } from "react-router-dom";
import $ from 'jquery';
import { Modal } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: '1em'
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            width: 500,
        },
        image: {
            width: 100,
            height: 100,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        rightText: {
          textAlign: "right",
          
        }
    }),
);

type RecipeProps = {
    id: number,
    title: string,
}

function Article(props: RecipeProps) {
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const deleteEntity = () => {
        $.ajax({
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": sessionStorage.getItem("AuthorizationToken")
            },
            url: "https://localhost:5001/api/journal/delete/" + props.id,
        }).done((event) => {
            window.location.reload();
        }).fail(function (event) {
            console.log(event);
            alert("Canoot delete item")
        })
    }

    const updateEntity = () => {
        sessionStorage.setItem(
            "targetObject", JSON.stringify(props)
        );
        history.push("/recipes/update");
    }

    const openDetails = () => {
        sessionStorage.setItem(
            "targetObject", JSON.stringify(props)
        );
        history.push("/recipes/details");
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={classes.paper} style={{backgroundColor: "#FFF"}}>
            Are you sure you want to delete this object?
          <Button variant="contained" color="primary" onClick={deleteEntity}>Confirm</Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>Abort</Button>
        </div>
      );

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Grid container direction="column">
                            <ButtonBase onClick={openDetails} className={classes.image}>
                                Show Steps and Ingredients
                            </ButtonBase>
                            <Button
                                    color='primary'
                                    style={{ margin: '0.5em' }}
                                    variant="contained"
                                    onClick={updateEntity}>Update</Button>
                            <Button
                                    color='secondary'
                                    style={{ margin: '0.5em' }}
                                    variant="contained"
                                    onClick={handleOpen}>Delete</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="h5">
                                    {props.title}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default Article

