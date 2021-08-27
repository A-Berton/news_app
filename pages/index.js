import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react';
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/Layout";
import { Card, Form, Button, Container } from 'react-bulma-components';

import Fetch from "isomorphic-fetch";
import Error from "./_error.js";
//import Router from 'next/dist/next-server/lib/router/router';

export default function News({news}) {
    const [searchQuery, setSearchQuery] = useState("");

    // we can use handleChange with multiple search queries (last section 3 video)
    const handleTextChange = (e) => {
        setSearchQuery(e.target.value);
    } 

    const handleSubmit = (e) =>{
        e.preventDefault();
        Router.push(`/?searchTerm=${searchQuery}`);
    }

    const searchForm = () =>(
        <form onSubmit={handleSubmit}>
            <Container>
                <Form.Field>
                    <Form.Input className="input is-normal is loading" id="formInput" placeholder="What do you want to read?" type="text" value={searchQuery} onChange={handleTextChange}/>
                    <Button>Search</Button>
                </Form.Field>
            </Container>
        </form>
        
    )
  return (
      <Layout mainTitle="News">
          <Container>
            <h2 className="title is-2" id="top">List of news</h2>
                <hr/>
                {searchForm()}
                <hr/>
                {news.map((n,index) =>(
                    <Card key={index} className="card">
                        <Card.Content className="card-content">
                            <h3 className="title is-3">{n.headline.main}</h3>
                            <div className="content">
                                <p>{n.abstract}</p>
                                <Link href={n.web_url} >
                                    <a className="linktonews" target="_blank">{n.web_url}</a>
                                </Link>
                            </div>
                        </Card.Content>
                    </Card>
                ))}      
          </Container>
        </Layout>
  )
}


News.getInitialProps = async ({query}) => {
    let news;
    try {
        const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query.searchTerm}&api-key=RQnL30ZHR9G8GmJTfdMhIbHAGe2AWhHN`);
        news = await res.json();
    } catch (err) {
        console.log("ERROR", err);
        //if there is an error we want to reset news to empty array
        news = [];
    }
    return{
        news: news.response.docs
    };
}
