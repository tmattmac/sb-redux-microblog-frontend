import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Navbar from './Navbar';
import Routes from './Routes';
import { Container, CssBaseline } from '@material-ui/core';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Container>
          <Routes />
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
