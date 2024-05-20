import { updateTotalPrice } from './runningPrice.js'
import { setDrinkChoice } from './transientState.js' 

const handleDrinksChoice = (event) => {
    if (event.target.id === "drink") {
        setDrinkChoice(parseFloat(event.target.value)) 
        updateTotalPrice() 
    }
}

export const drinkOptions = async (locationId) => {
    console.log("Location Id:", locationId)

    const drinkItemsResponse = await fetch("http://localhost:8088/drinks")
    const drinkItems = await drinkItemsResponse.json()
    console.log("Drink Items:", drinkItems)

    //document.addEventListener("change", handleDrinksChoice)

    const locationDrinkItemsResponse = await fetch("http://localhost:8088/locationDrinks")
    const locationDrinkItems = await locationDrinkItemsResponse.json()
    console.log("Location Drink Items:", locationDrinkItems)

    const filteredLocationDrinkItems = locationDrinkItems.filter(lfItem => lfItem.locationId === locationId);
    console.log("Filtered Location Drink Items:", filteredLocationDrinkItems);
    
    const availableDrinks = filteredLocationDrinkItems.map(filteredLFItem => {
        const drink = drinkItems.find(drink => drink.id === filteredLFItem.drinkId);
        return { ...drink, quantity: filteredLFItem.quantity };
    });
    console.log("Available Drinks:", availableDrinks);
    
    let drinkOptionsHTML = "";
    drinkOptionsHTML += `<h1>Choose your Drink!</h1>`;
    drinkOptionsHTML += `<select id="drink">`;
    drinkOptionsHTML += `<option value="0">None</option>`;
    for (const drink of availableDrinks) {
        drinkOptionsHTML += `<option value="${drink.id}" data-price="${drink.price}">${drink.name} (Available: ${drink.quantity})</option>`;
    }
    drinkOptionsHTML += `</select>`;
    
    return drinkOptionsHTML
}

export const updateDrinkOptions = async (locationId) => {
    const drinkOptionsHTML = await drinkOptions(locationId)
    const drinkContainer = document.querySelector(".choices__drink.options")
    drinkContainer.innerHTML = drinkOptionsHTML
    drinkContainer.addEventListener('change', handleDrinksChoice)
}
