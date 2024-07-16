import Signup from "./Components/Authentication/Signup";
import './App.css'
import { Route } from "react-router-dom";
import Loader from "./Components/UI/Loader";
function App(){


    return <div>
    
        <Route path='/signup' exact>
            <Signup/>
        </Route>
        <Route path='/' exact>
        <Loader/>
        </Route>
            
    </div>
}

export default App;