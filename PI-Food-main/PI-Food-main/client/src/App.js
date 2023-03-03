import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/creates' component={RecipeCreate}></Route>
        <Route path='/detail/:id' component={Detail}></Route>
      </Switch>      
    </div>
    </BrowserRouter>
  );
}
export default App;
