import React, { useEffect, useState } from 'react';
import { commonApi } from './services/api';
import toast from './components/toast';
import Popup from './components/Popup';
import { Dish } from './Interfaces/dish';
import { useForm, SubmitHandler } from 'react-hook-form';

interface RecipeDetailsProps {
  onClose: () => void;
  onRecipeUpdated: () => void;
  dishData?: Dish;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ onClose, onRecipeUpdated, dishData }) => {
  const labelStyling: React.CSSProperties = {
    float: 'left',
    padding: '0.25rem',
    textAlign: 'right',
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Dish>(); // Specify Dish as the generic parameter for useForm

  useEffect(() => {
    if (dishData) {
      // If dishData is provided, populate the form fields for editing
      setValue('name', dishData.name);
      setValue('ingredients', dishData.ingredients);
      setValue('diet', dishData.diet);
      setValue('prep_time', dishData.prep_time);
      setValue('cook_time', dishData.cook_time);
      setValue('flavor_profile', dishData.flavor_profile); 
      setValue('course', dishData.course);
      setValue('state', dishData.state);
      setValue('region', dishData.region);
    } else {
      reset(); 
    }
  }, [dishData, reset, setValue]);

  const onSubmit: SubmitHandler<Dish> = async (data) => {
    try {
      if (dishData && '_id' in dishData) {
        // we are editing an existing recipe
        await commonApi.post(`/recipe/${dishData._id}/update`, data);
        toast.notifySuccess('Recipe updated successfully');
      } else {
        // we are adding a new recipe
        await commonApi.post('/create/recipe', [data]);
        toast.notifySuccess('Recipe added successfully');
        onClose();
      }
      onRecipeUpdated();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Popup header={dishData ? 'Edit Recipe' : 'Add Recipe'} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="flex flex-row mt-1">
          <div className="w-3/6">
            <label style={labelStyling}>Name</label>
            <input
              type="text"
              className={errors.name ? 'inputboxstyling is-invalid' : 'inputboxstyling'}
              {...register('name', { required: true })}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="errorMsg">Name is required.</p>
            )}
          </div>
          <div className="w-3/6 pl-2">
            <label style={labelStyling}>Diet</label>
            <input
              type="text"
              className={errors.diet ? 'inputboxstyling is-invalid' : 'inputboxstyling'}
              {...register('diet', { required: true })}
            />
            {errors.diet && errors.diet.type === 'required' && (
              <p className="errorMsg">Diet is required.</p>
            )}
          </div>
        </div>

        <div className="flex flex-row mt-1">
          <div className="w-3/6">
            <label style={labelStyling}>Ingredients</label>
            <textarea
              className={errors.ingredients ? 'inputboxstyling is-invalid' : 'inputboxstyling'}
              {...register('ingredients', { required: true })}
            />
            {errors.ingredients && errors.ingredients.type === 'required' && (
              <p className="errorMsg">Ingredients is required.</p>
            )}
          </div>
          <div className="w-3/6 pl-2">
            <label style={labelStyling}>Prep_Time</label>
            <input
              type="text"
              className={errors.prep_time ? 'inputboxstyling is-invalid' : 'inputboxstyling'}
              {...register('prep_time', { required: true, pattern: /^\d{1,3}$/ })}
            />
            {errors.prep_time && errors.prep_time.type === 'required' && (
              <p className="errorMsg">Prep_Time is required.</p>
            )}
            {errors.prep_time && errors.prep_time.type === 'pattern' && (
              <p className="errorMsg">Please enter up to 3 digits.</p>
            )}
          </div></div>

        <div className="flex flex-row mt-1">
          <div className="w-3/6 ">
            <label style={labelStyling}>Cook_Time</label>
            <input type="text" className={errors.cook_time ? 'inputboxstyling is-invalid' : 'inputboxstyling'}  {...register(`cook_time`, { required: true, pattern: /^\d{1,3}$/ })} />
            {errors.cook_time && errors.cook_time.type === "required" && (
              <p className="errorMsg">Cook Time is required.</p>
            )}
            {errors.cook_time && errors.cook_time.type === 'pattern' && (
              <p className="errorMsg">Please enter up to 3 digits.</p>
            )}
          </div>
          <div className="w-3/6 pl-2">
            <label style={labelStyling}>Flavour</label>
            <input type="text" className={errors.flavor_profile ? 'inputboxstyling is-invalid' : 'inputboxstyling'}  {...register(`flavor_profile`, { required: true })} />
            {errors.flavor_profile && errors.flavor_profile.type === "required" && (
              <p className="errorMsg">flavour_profile is required.</p>
            )}

          </div>

        </div>
        <div className="flex flex-row mt-1">
          <div className="w-3/6 ">
            <label style={labelStyling}>Course</label>
            <input type="text" className={errors.course ? 'inputboxstyling is-invalid' : 'inputboxstyling'}  {...register(`course`, { required: true })} />
            {errors.course && errors.course.type === "required" && (
              <p className="errorMsg">Course is required.</p>
            )}
          </div>
          <div className="w-3/6 pl-2">
            <label style={labelStyling}>State</label>
            <input type="text" className={errors.state ? 'inputboxstyling is-invalid' : 'inputboxstyling'}  {...register(`state`, { required: true })} />
            {errors.state && errors.state.type === "required" && (
              <p className="errorMsg">State is required.</p>
            )}
          </div>

        </div>
        <div className="flex flex-row mt-1">
          <div className="w-3/6 ">
            <label style={labelStyling}>Region</label>
            <input type="text" className={errors.course ? 'inputboxstyling is-invalid' : 'inputboxstyling'}  {...register(`region`, { required: true })} />
            {errors.region && errors.region.type === "required" && (
              <p className="errorMsg">Course is required.</p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-2 items-center">
          <button className="btnprimary" type="submit">
            {dishData ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default RecipeDetails;
