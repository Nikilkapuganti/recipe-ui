// App.tsx

import React, { useEffect, useState } from 'react';
import { commonApi } from './services/api';
import toast from './components/toast';
import Popup from './components/Popup';
import ImportRecipe from './ImportRecipe';
import RecipeDetails from './RecipeDetails';
import Table from './components/Table';
import { Dish } from './Interfaces/dish';
import { useForm } from 'react-hook-form';

function App() {
  const [importPopup, setImportPopup] = useState(false);
  const [recipeData, setAllRecipeData] = useState<Dish[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAllRecipes();
  }, []);

  const getAllRecipes = async () => {
    try {
      const response = await commonApi.get('/recipes/getall');
      setAllRecipeData(response.data);
      setShowPopup(false);
      return response.data;
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const togglePopup = (data: Dish | null) => {
    setSelectedDish(data);
    setShowPopup(!showPopup);
    reset();
  };

  const editRecipe = (data: Dish) => {
    setSelectedDish(data);
    setShowDetail(true);
  };

  const closeRecipeDetails = () => {
    setShowDetail(false);
  };

  const closeImportRecipe = () => {
    setImportPopup(false);
  };

  const onRecipeUpdated = async () => {
    await getAllRecipes();
  };

  return (
    <div className="App p-2">
      <div className='flex justify-between mt-4'>
        <h1 className="text-xl">Recipes List</h1>
        <div className=''>
          <button className="ml-2 btnprimary" onClick={() => togglePopup(null)}>
            Add Recipe
          </button>
          <button className="ml-2 btnprimary" onClick={() => setImportPopup(true)}>
            Import Recipe
          </button>
        </div>
      </div>
      {importPopup && <ImportRecipe onClose={closeImportRecipe} />}
      <div className="p-6">
        {recipeData.length > 0 && <Table headers={Object.keys(recipeData[0])} data={recipeData} onEdit={editRecipe} />}
      </div>
      {showDetail && selectedDish && (
        <RecipeDetails dishData={selectedDish} onClose={closeRecipeDetails} onRecipeUpdated={onRecipeUpdated} />
      )}
      {showPopup && <RecipeDetails onClose={() => setShowPopup(false)} onRecipeUpdated={onRecipeUpdated} />}
    </div>
  );
}
export default App;
