import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/recipes' component={RecipeCreate}></Route>
        <Route path='/home/:id' component={Detail}></Route>
      </Switch>      
    </div>
    </BrowserRouter>
  );
}
export default App;
