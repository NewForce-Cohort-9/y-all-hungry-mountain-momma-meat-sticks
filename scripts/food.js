import { updateTotalPrice } from './runningPrice.js'

const handleFoodChoice = (event) => {
    if (event.target.id === "food") {
        updateTotalPrice() 
    }
}

//locationId is user chosen location's id
export const foodOptions = async (locationId) => {
    //console.log("Location Id:", locationId) 

    const foodItemsResponse = await fetch("http://localhost:8088/foods")
    const foodItems = await foodItemsResponse.json()
    //console.log("Food Items:", foodItems) 

    const locationFoodItemsResponse = await fetch("http://localhost:8088/locationFoods")
    const locationFoodItems = await locationFoodItemsResponse.json()
    //console.log("Location Food Items:", locationFoodItems) 

    //Filter locationFoodItems based on the locationId
    //FilteredLocationFoodItems is an array containing only locationFood items which location id matches user's chosen locationId 
    const filteredLocationFoodItems = locationFoodItems.filter(lfItem => lfItem.locationId === locationId)
    //console.log("Filtered Location Food Items:", filteredLocationFoodItems)

    //Get a copy of all the foodIds of the filteredLocationFoodItems by .map() and store in availableFoodIds array
    const availableFoodIds = filteredLocationFoodItems.map(filteredLFItem => filteredLFItem.foodId)
    //console.log("Available Food Ids:", availableFoodIds)

    let foodOptionsHTML = `<select id="food">`
    foodOptionsHTML += `<option value="0">Food Items</option>`
    foodOptionsHTML += `<option value="none">None</option>`

    //Go through all the food, if food id matches filtered "availableFoodIds" then show that option
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
    if (foodContainer) {
        foodContainer.innerHTML = foodOptionsHTML
        foodContainer.addEventListener('change', handleFoodChoice)
    }
}




