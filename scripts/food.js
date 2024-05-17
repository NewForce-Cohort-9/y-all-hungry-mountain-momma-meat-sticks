import { updateTotalPrice } from './runningPrice.js';
import { setFoodChoice } from './transientState.js';

const handleFoodsChoice = (event) => {
    if (event.target.id === "food") {
        setFoodChoice(parseFloat(event.target.value)); 
        updateTotalPrice(); 
    }
};

document.addEventListener("change", handleFoodsChoice);

export const foodOptions = async () => {
    const response = await fetch("http://localhost:8088/foods");
    const foodItems = await response.json();

    let foodOptionsHTML = "";
    foodOptionsHTML += `<select id="food">`;
    foodOptionsHTML += `<option value="0">Food Items</option>`;
    foodOptionsHTML += `<option value="none">None</option>`;
    for (const food of foodItems) {
        foodOptionsHTML += `<option value="${food.id}" data-price="${food.price}">${food.name}</option>`;
    }
    foodOptionsHTML += `</select>`;

    return foodOptionsHTML;
};
