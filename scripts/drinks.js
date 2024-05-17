import { updateTotalPrice } from './runningPrice.js'
import { setDrinkChoice } from './transientState.js';

const handleDrinksChoice = (event) => {
    if (event.target.id === "drink") {
        //setDrinkChoice(parseInt(event.target.value)) // changes made here
        updateTotalPrice() // Update the total price whenever a drink is selected
    }
}

// const handleDrinksChoice = (event) => {
//     if (event.target.id === "drink") {
//         setDrinkChoice(parseInt(event.target.value));
//         updateTotalPrice(); // Update the total price whenever a drink is selected
//}}

//document.addEventListener("change", handleDrinksChoice)


export const drinkOptions = async (locationId) => {
    //console.log("Location Id:", locationId) 

    const drinkItemsResponse = await fetch("http://localhost:8088/drinks")
    const drinkItems = await drinkItemsResponse.json()
    console.log("Drink Items:",drinkItems)

    const locationDrinkItemsResponse = await fetch("http://localhost:8088/locationDrinks")
    const locationDrinkItems = await locationDrinkItemsResponse.json()
    console.log("Location Drink Items:",locationDrinkItems)

    const filteredLocationDrinkItems = locationDrinkItems.filter(ldItem=>ldItem.locationId===locationId)
    console.log("Filtered Location Drink Items:", filteredLocationDrinkItems)

    const availableDrinkIds = filteredLocationDrinkItems.map(filteredLDItem=>filteredLDItem.drinkId)
    console.log("Available Drink Ids:", availableDrinkIds)

    let drinksOptionsHTML = ""
    drinksOptionsHTML += `<select id="drink">`
    drinksOptionsHTML += `<option value="0">Drinks Items</option>`
    drinksOptionsHTML += `<option value="none">None</option>`
    for (const drink of drinkItems) {
        if(availableDrinkIds.includes(drink.id)){
        drinksOptionsHTML += `<option value="${drink.id}" data-price="${drink.price}">${drink.name}</option>`;
    }
}
    drinksOptionsHTML += `</select>`

    return drinksOptionsHTML
}

export const updateDrinkOptions = async (locationId) => {
    const drinksOptionsHTML = await drinkOptions(locationId)
    const drinkContainer = document.querySelector(".choices__drink.options")
    if (drinkContainer){
        drinkContainer.innerHTML = drinksOptionsHTML
        drinkContainer.addEventListener("change", handleDrinksChoice)
    }
}