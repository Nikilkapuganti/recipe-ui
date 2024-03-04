import { useEffect, useState } from "react";
import { commonApi } from "./services/api";
import Table from "./components/Table";
import { Dish } from "./Interfaces/dish";
import Select from 'react-select';

function DishSuggester() {
  const [recipes, setAllRecipeData] = useState([]);
  const [ingredients, setIngredients]: any = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  useEffect(() => {
    getAllRecipes();
  }, []);

  useEffect(() => {
    // Filter recipes based on selected ingredients
    if (selectedIngredients.length > 0) {
      const filtered = recipes.filter((recipe: any) =>
        selectedIngredients.every((ingredient) =>
          recipe.ingredients.split(", ").includes(ingredient)
        )
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes([]);
    }
  }, [selectedIngredients, recipes]);

  const getAllRecipes = async () => {
    try {
      const response = await commonApi.get("/recipes/getall");
      setAllRecipeData(response.data);
      const uniqueIngredients: string[] = Array.from(
        new Set(
          response.data.flatMap((recipe: any) =>
            recipe.ingredients.split(", ")
          )
        )
      );
      setIngredients(uniqueIngredients.map((ingredient) => ({ value: ingredient, label: ingredient })));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const editRecipe = (data: Dish) => {
    setSelectedDish(data);
    setShowDetail(true);
  };

  return (
    <div className="p-2">
      <div className="mt-4 w-3/6">
        <label>Select ingredients:</label>
        <Select
          className="inputboxstyling"
          isMulti
          options={ingredients}
          onChange={(selectedOptions) => setSelectedIngredients(selectedOptions.map((option: any) => option.value))}
          value={ingredients.filter((option: any) => selectedIngredients.includes(option.value))}
        />
      </div>
      <div className="mt-4">
        <h2>Filtered Recipes</h2>
        <div className="p-6">
          {filteredRecipes.length > 0 && (
            <Table
              headers={Object.keys(filteredRecipes[0])}
              data={filteredRecipes}
              onEdit={editRecipe}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DishSuggester;
