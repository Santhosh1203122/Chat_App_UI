import React from 'react';
import './App.scss';
import SideBarContainer from './Containers/side-bar-container'
import MessageAreaContainer from './Containers/message-area-container';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';

const store = configureStore();

const App = () => {
  return (
    <div className="App">

      <Provider store={store}>
        <div className="side-bar">
          <SideBarContainer />
        </div>
        <div className="main-area">
          <MessageAreaContainer />
        </div>
      </Provider>
    </div>
  );
}

export default App;
