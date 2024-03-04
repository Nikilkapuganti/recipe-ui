
import {
  createBrowserRouter, Route, Routes, useNavigate,
} from "react-router-dom";
import DishSuggester from '../DishSuggester';
import App from "../App";


const router = (

  <Routes>
    <Route path='/dishSuggester' element={<DishSuggester />}></Route>
    <Route path='/recipesList' element={<App />}></Route>
    <Route path="/" element={<App />} ></Route>
  </Routes>


)

export default router