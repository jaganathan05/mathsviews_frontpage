import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login"
import './App.css'
import { Route } from "react-router-dom";
import Loader from "./Components/UI/Loader";
import Manager from "./Components/Manager/Manager";
function App(){


    return <div>
    
        <Route path='/signup' exact>
            <Signup/>
        </Route>
        <Route path='/login' exact >
        <Login/>
        </Route>
        <Route path='/' exact>
        <Loader/>
        </Route>
        <Route path='/Manager' exact>
            <Manager/>
        </Route>
            
    </div>
}

export default App;