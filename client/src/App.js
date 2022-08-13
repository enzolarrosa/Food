import './App.css';
import Landing from './components/landingPage'
import {Route, Switch} from 'react-router-dom'
import Nav from './components/nav'
import Home from './components/home'
import Create from './components/create'
import Detail from './components/detail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
         <Landing />
        </Route>
        <Route path='/home'>
         <Nav />
         <Home/>
        </Route>
        <Route path='/create'>
         <Create/>
        </Route>
        <Route path='/detail/:id'>
         <Detail/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
