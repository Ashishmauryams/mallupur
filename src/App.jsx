import Login from "./mallupurVillage/loginsign/Login"
import Register from "./mallupurVillage/loginsign/Register"
import "./index.scss";
import Front from "./mallupurVillage/fontPage/Front";
import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./mallupurVillage/layout/AppLayout";


function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>

      <Route path="/" element={<Front/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<AppLayout/>}/>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
