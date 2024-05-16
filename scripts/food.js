// import { setFoodChoice } from "./transientState.js";

// const handleFoodChoice = (event) => {
//     if (event.target.id === "food") {
//         setFoodChoice(parseInt(event.target.value));
//     }
// };

// export const foodOptions = async (locationId) => {
//     const response = await fetch("http://localhost:8088/locationFoods?locationId=" + locationId);
//     const locationFoods = await response.json();

//     document.addEventListener("change", handleFoodChoice);

//     let foodOptionsHTML = `<select id="food">`;
//     foodOptionsHTML += `<option value="0">Food Items</option>`;
//     for (const locationFood of locationFoods) {
//         foodOptionsHTML += `<option value="${locationFood.foodId}">${locationFood.name}</option>`;
//     }
//     foodOptionsHTML += `</select>`;

//     return foodOptionsHTML;
// };








//This works:
// import { updateTotalPrice } from './runningPrice.js';

// const handleFoodChoice = (event) => {
//     if (event.target.id === "food") {
//         updateTotalPrice(); // Update the total price whenever a food item is selected
//     }
// };

// export const foodOptions = async () => {
//     const response = await fetch("http://localhost:8088/foods");
//     const foodItems = await response.json();

//     let foodOptionsHTML = "";
//     foodOptionsHTML += `<select id="food">`;
//     foodOptionsHTML += `<option value="0">Food Items</option>`;
//     foodOptionsHTML += `<option value="none">None</option>`;
//     for (const food of foodItems) {
//         foodOptionsHTML += `<option value="${food.price}" data-price="${food.price}">${food.name}</option>`;
//     }
//     foodOptionsHTML += `</select>`;


//     return foodOptionsHTML;
// };







import { updateTotalPrice } from './runningPrice.js';

const handleFoodChoice = (event) => {
    if (event.target.id === "food") {
        updateTotalPrice(); // Update the total price whenever a food item is selected
    }
};

document.addEventListener('change', (event) => {
    if (event.target.id === 'location') {
        updateFoodOptions(event.target.value);
    }
});

export const foodOptions = async () => {
    const response = await fetch("http://localhost:8088/foods");
    return await response.json();
};

export const fetchLocationOptions = async () => {
    const response = await fetch("http://localhost:8088/locations");
    return await response.json();
};

export const fetchLocationFoodOptions = async () => {
    const response = await fetch("http://localhost:8088/locationFoods");
    return await response.json();
};

const populateLocationSelect = async () => {
    const locationItems = await fetchLocationOptions();
    const locationSelect = document.getElementById('location');
    
    if (locationSelect) {
        locationSelect.innerHTML = `<option value="0">Select Location</option>`;
        for (const location of locationItems) {
            locationSelect.innerHTML += `<option value="${location.id}">${location.name}</option>`;
        }
    }
};

const updateFoodOptions = async (locationId) => {
    const foodItems = await foodOptions();
    const locationFoodItems = await fetchLocationFoodOptions();

    const foodSelect = document.getElementById('food');
    if (foodSelect) {
        const availableFoodIds = locationFoodItems
            .filter(lf => lf.locationId === parseInt(locationId))
            .map(lf => lf.foodId);
        
        let foodOptionsHTML = `<option value="0">Food Items</option>`;
        foodOptionsHTML += `<option value="none">None</option>`;
        
        for (const food of foodItems) {
            if (availableFoodIds.includes(food.id)) {
                foodOptionsHTML += `<option value="${food.price}" data-price="${food.price}">${food.name}</option>`;
            }
        }
        
        foodSelect.innerHTML = foodOptionsHTML;
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    await populateLocationSelect();
    document.getElementById('location').addEventListener('change', (event) => {
        updateFoodOptions(event.target.value);
    });
    document.getElementById('food').addEventListener('change', handleFoodChoice);
});
