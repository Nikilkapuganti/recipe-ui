import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideMenuBar = () => {
    const navigate = useNavigate();

    const menus = [
        {
            optionRoute: '/dishSuggester',
            displayOptionName: 'Dish Suggester',
        },
        {
            optionRoute: '/recipesList',
            displayOptionName: 'Recipe List',
        },
    ];

    const navigatetoRoute = (route: string) => {
        navigate(route); 
    };

    return (
        <div className="fixed w-64 bg-primary sidenav flex flex-col justify-between h-full z-50 cursor-pointer">
            <ul>
                {menus.map((menu) => (
                    <li key={menu.displayOptionName} className="p-1">
                        <div
                            className="flex navchild px-2 py-1 text-white cursor-pointer"
                            onClick={() => navigatetoRoute(menu.optionRoute)}
                        >
                            {menu.displayOptionName}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideMenuBar;
