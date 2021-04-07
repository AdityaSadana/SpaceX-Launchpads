import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Info from './Info';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/info/:id">
          <Info />
        </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
