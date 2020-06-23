import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Article from './components/Article';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


type ArticleProps = {
    id: number,
    summary: string
}

function Journals() {
    const classes = useStyles();
    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const [article, setArticle] = useState("");
    const [journal, setJournal] = useState("");

    const getArticles = (value: string) => {
        $.ajax({
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            url: "https://localhost:5001/api/Articles/"+value,
        }).done((event) => {
            setArticles(event);
            setJournal(value);
        }).fail(function (event) {
            console.log(event);
        })
    };

    const postArticle = () => {
        $.ajax({
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            url: "https://localhost:5001/api/Articles",
            data: JSON.stringify({
                summary: article,
                user: sessionStorage.getItem("user"),
                journal: journal
            })
        }).done((event) => {
            console.log("success");
        }).fail(function (event) {
            console.log(event);
        })
    };

    return  (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {
                    articles.map(
                        articleObj => <Article
                            id={articleObj.id}
                            title={JSON.stringify(articleObj)}
                        />
                    )
                }
            </Grid>
            <Grid container spacing={3}>
                <Grid item><TextField onChange={(event)=>{getArticles(event.target.value);}} placeholder="journal name"/></Grid>
                <Grid item><TextField onChange={(event)=>{setArticle(event.target.value);}} placeholder="article summary"/>
                </Grid>
                <Grid item><Button onClick={()=>{postArticle();}}>Press Me!</Button></Grid>
            </Grid>
        </div>
    )
}

Journals.propTypes = {

}

export default Journals

