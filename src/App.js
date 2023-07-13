import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Route,Routes } from 'react-router-dom';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { Admin } from './components/Admin';
import { AdminAdd } from './components/AdminAdd';
import { Cart } from './components/Cart';
import { Error } from './components/Error';
import LogOut  from './components/LogOut';
import reducer from './Reducer/Reducer';
import {reducer1 ,reducer2} from './Reducer/Reducer';
import { useEffect, useReducer ,useState} from 'react';
import { MyOrder } from './components/MyOrder';
import { LoadingAni } from './components/LoadingAni';


function App() {
  const [width,setWidth]=useState("");
  const [state,dispatch] = useReducer(reducer,0);
  const [state1,dispatch1] = useReducer(reducer1,0);
  const [state2,dispatch2] = useReducer(reducer2,0);
  
  const handNav = async(req,res)=>{
    try{
      const res = await fetch('http://localhost:5000/h',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',

        },
        credentials:'include'
      })
      const data = await res.json();
      if(data.email!=='admin@gmail.com'){
        dispatch1({type:'admin',payload:false})
      }   
    }
    catch(err){
      dispatch({type:'User', payload:false})
     
    }
  }
  useEffect(()=>{
    setWidth(window.innerWidth);
  },[])
useEffect(()=>{
  handNav()
  
},[])
const Lirou=()=>{
return(<>
  <Routes>
    <Route path='/' element={<Home dispatch = {dispatch} state = {state2}/>}></Route>
      <Route path='/register' element={<Registration></Registration>}></Route>
      <Route path='/login' element={<Login dispatch = {dispatch} dispatch1 ={dispatch1}></Login>}></Route>
      <Route path='/logout' element={<LogOut dispatch = {dispatch}></LogOut>}></Route>
      <Route path='*' element={<Error/>}></Route>
  </Routes>
</>)}

const Lorou=()=>{
return(<>
  <Routes>
    <Route path='/' element={<Home dispatch = {dispatch} state = {state2}/>}></Route>
    <Route path='/logout' element={<LogOut dispatch = {dispatch}></LogOut>}></Route>
    <Route path='/myorders' element={<MyOrder></MyOrder>}></Route>
    {state1===false? <Route path='/cart' element={<Cart/>}></Route> : <Route path='/admin' element={<Admin/>}></Route>}
    {state1===false? <Route path='/cart' element={<Cart/>}></Route> : <Route path='/admin/crtprod' element={<AdminAdd/>}></Route>}
    <Route path='*' element={<Error/>}></Route>
  </Routes>
</>)
}
  return (
    <div className="App">
    <Navbar state = {state} state1 ={state1} dispatch={dispatch2} width = {width}/> 
    
    {state===false? <Lirou></Lirou>:<Lorou></Lorou>}
   
    
    </div>
  );
}

export default App;
