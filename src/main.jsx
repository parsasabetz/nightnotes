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
    uri: import.meta.env.VITE_REACT_APP_GRAPHCMS_URI,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    onError: ({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, path, extensions }) => {
            console.error(
              `[GraphQL error]: Message: ${message}, Path: ${path}, Extensions: ${JSON.stringify(extensions)}`
            );
          });
        }
        if (networkError) {
          console.error(`[Network error]: ${networkError}`);
        }
      },
      // Set debug option to true
      debug: true,
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