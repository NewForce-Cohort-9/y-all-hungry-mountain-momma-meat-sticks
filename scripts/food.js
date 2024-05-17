import { updateTotalPrice } from './runningPrice.js'
import { setFoodChoice } from './transientState.js' 

const handleFoodsChoice = (event) => {
    if (event.target.id === "food") {
        setFoodChoice(parseFloat(event.target.value)) 
        updateTotalPrice() 
    }
}

export const foodOptions = async (locationId) => {
    console.log("Location Id:", locationId)

    const foodItemsResponse = await fetch("http://localhost:8088/foods")
    const foodItems = await foodItemsResponse.json()
    console.log("Food Items:", foodItems)

    //document.addEventListener("change", handleFoodsChoice)

    const locationFoodItemsResponse = await fetch("http://localhost:8088/locationFoods")
    const locationFoodItems = await locationFoodItemsResponse.json()
    console.log("Location Food Items:", locationFoodItems)

    const filteredLocationFoodItems = locationFoodItems.filter(lfItem => lfItem.locationId === locationId)
    console.log("Filtered Location Food Items:", filteredLocationFoodItems)

    const availableFoodIds = filteredLocationFoodItems.map(filteredLFItem => filteredLFItem.foodId)
    console.log("Available Food Ids:", availableFoodIds)


    let foodOptionsHTML = "";
    foodOptionsHTML += `<h1>Choose your Wiener!</h1>`
    foodOptionsHTML += `<select id="food">`;
    foodOptionsHTML += `<option value="0">None</option>`;
    for (const food of foodItems) {
        if (availableFoodIds.includes(food.id)) {
            foodOptionsHTML += `<option value="${food.id}" data-price="${food.price}">${food.name}</option>`
        }
    }

    foodOptionsHTML += `</select>`

    return foodOptionsHTML
}

export const updateFoodOptions = async (locationId) => {
    const foodOptionsHTML = await foodOptions(locationId)
    const foodContainer = document.querySelector(".choices__food.options")
    foodContainer.innerHTML = foodOptionsHTML
    foodContainer.addEventListener('change', handleFoodsChoice)
}
