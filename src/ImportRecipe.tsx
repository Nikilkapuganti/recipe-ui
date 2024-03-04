// ImportRecipe component

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Dish } from './Interfaces/dish';
import Popup from './components/Popup';
import { useFieldArray, useForm } from 'react-hook-form';
import { commonApi } from './services/api';
import toast from './components/toast';

interface ImportRecipeProps {
  onClose: () => void; // Define the type of onClose prop
}

const ImportRecipe: React.FC<ImportRecipeProps> = ({ onClose }) => {
  const [importing, setImporting] = useState(false);
  const [recipeData, setAllRecipeData] = useState<Dish[]>([]);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  useEffect(() => {
    getAllRecipes();
  }, []);

  const getAllRecipes = async () => {
    try {
      const response = await commonApi.get('/recipes/getall');
      setAllRecipeData(response.data);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const togglePopup = () => {
    onClose();
    reset();
  };

  const fileReaderData = async (oEvent: any) => {
    try {
      setImporting(true);

      let oFile = oEvent.target.files[0];
      var reader = new FileReader();

      reader.onload = async (e: any) => {
        try {
          var data = e.target.result;
          data = new Uint8Array(data);
          var workbook = XLSX.read(data, { type: 'array' });
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          var dishes: Dish[] = XLSX.utils.sheet_to_json(worksheet, {});

          const filteredDishes: Dish[] = dishes.filter((dish: any) => {
            for (const key in dish) {
              if (dish[key] === -1 || dish[key] === undefined) {
                return false;
              }
            }
            return true;
          });

          await commonApi.post('/create/recipe', filteredDishes);
          setAllRecipeData(filteredDishes);
          toast.notifySuccess('Created');
          togglePopup(); // Close the popup
          await getAllRecipes();
        } catch (error) {
          console.error('Error processing Excel data:', error);
          toast.notifyError('Error processing Excel data');
        } finally {
          setImporting(false);
        }
      };

      reader.readAsArrayBuffer(oFile);
    } catch (error) {
      console.error('Error reading file:', error);
      toast.notifyError('Error reading file');
      setImporting(false);
    }
  };

  return (
    <>
      <Popup header="Import Recipes" onClose={togglePopup}>
        <div className="formcontainer flex flex-col">
          <div className="row flex flex-row w-full">
            <div className="col-md-6 w-6/12 p-2">
              <label className="controllabel">Select File</label>
              <input type="file" className="dn" onChange={(event: any) => fileReaderData(event)} />
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default ImportRecipe;
