import { updateTotalPrice } from './runningPrice.js';
import { setFoodChoice } from './transientState.js';

const handleFoodChoice = (event) => {
    if (event.target.id === "food") {
        const chosenFoodId = parseInt(event.target.value);
        setFoodChoice(chosenFoodId)
        updateTotalPrice(); // Update the total price whenever a food item is selected
    }
};

document.addEventListener("change", handleFoodChoice)


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
