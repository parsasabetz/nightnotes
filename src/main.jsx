// react
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


// 3rd parties
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './mui/theme.js';


// style reset
import "./styles/index.scss";


// Apollo Client
const CLIENT = new ApolloClient({
    uri: "https://api-ca-central-1.hygraph.com/v2/clk8fhxgv1g0u01ur7y9e5tzs/master ",
    cache: new InMemoryCache(),
    connectToDevTools: true,
})






// React Render
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={ CLIENT }>
                <ThemeProvider theme={ theme }>
                    <App />
                </ThemeProvider>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
)