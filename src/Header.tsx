import React, { useState, useEffect } from 'react';
import { commonApi } from './services/api';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);

  const getAllRecipes = async () => {
    try {
      const response = await commonApi.get("/recipes/getall");
      setSelected(response.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  useEffect(() => {
    //multiple search term name, state
    const filteredSuggestions = selected.filter((suggestion: any) =>
      suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }, [searchTerm, selected]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div className="header w-3/6 flex justify-center items-center">
      <input
        type="text"
        placeholder="Search for dishes by name, state"
        value={searchTerm}
        className='inputboxstyling w-3/6 mt-2.5'
        onChange={handleSearch}
      />
      {searchTerm && suggestions.length > 0 && (
        <div className="dropdown">
          <ul className="suggestions">
            {suggestions.map((suggestion: any) => (
              <li key={suggestion._id.$oid} >
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
