// import { setDessertChoice } from "./transientState.js"
// import { updateTotalPrice } from './runningPrice.js'

// const handleDessertsChoice = (event) => {
//     if (event.target.id === "dessert") {
//         setDessertChoice(parseInt(event.target.value))
//         updateTotalPrice() // Update the total price whenever a dessert is selected
//     }
// }

// document.addEventListener("change", handleDessertsChoice)



// export const dessertOptions = async () => {
//     const response = await fetch("http://localhost:8088/desserts")
//     const desserts = await response.json()

//     let dessertsOptionsHTML = ""
//     dessertsOptionsHTML += `<select id="dessert">`
//     dessertsOptionsHTML += `<option value="0">Desserts Items</option>`
//     dessertsOptionsHTML += `<option value="none">None</option>`
//     for (const dessert of desserts) {
//         dessertsOptionsHTML += `<option value="${dessert.id}" data-price="${dessert.price}">${dessert.name}</option>`;
//     }
//     dessertsOptionsHTML += `</select>`

//     return dessertsOptionsHTML
// }

import { updateTotalPrice } from './runningPrice.js'
import { setDessertChoice } from './transientState.js';

const handleDessertChoice = (event) => {
    if (event.target.id === "dessert") {
        //setDessertChoice(parseInt(event.target.value)) // changes made here
        updateTotalPrice() 
    }
}

//locationId is user chosen location's id
export const dessertOptions = async (locationId) => {
    //console.log("Location Id:", locationId) 

    const dessertItemsResponse = await fetch("http://localhost:8088/desserts")
    const dessertItems = await dessertItemsResponse.json()
    console.log("Dessert Items:", dessertItems) 

    const locationDessertItemsResponse = await fetch("http://localhost:8088/locationDesserts")
    const locationDessertItems = await locationDessertItemsResponse.json()
    console.log("Location Dessert Items:", locationDessertItems) 

    //Filter locationDessertItems based on the locationId
    //FilteredLocationDessertItems is an array containing only locationDessert items which location id matches user's chosen locationId 
    const filteredLocationDessertItems = locationDessertItems.filter(lfItem => lfItem.locationId === locationId)
    console.log("Filtered Location Dessert Items:", filteredLocationDessertItems)

    //Get a copy of all the dessertIds of the filteredLocationDessertItems by .map() and store in availableDessertIds array
    const availableDessertIds = filteredLocationDessertItems.map(filteredLFItem => filteredLFItem.dessertId)
    console.log("Available Dessert Ids:", availableDessertIds)

    let dessertOptionsHTML = `<select id="dessert">`
    dessertOptionsHTML += `<option value="0">Dessert Items</option>`
    dessertOptionsHTML += `<option value="none">None</option>`

    //Go through all the dessert, if dessert id matches filtered "availableDessertIds" then show that option
    for (const dessert of dessertItems) {
        if (availableDessertIds.includes(dessert.id)) {
            dessertOptionsHTML += `<option value="${dessert.id}" data-price="${dessert.price}">${dessert.name}</option>`
        }
    }

    dessertOptionsHTML += `</select>`

    return dessertOptionsHTML
}


export const updateDessertOptions = async (locationId) => {
    const dessertOptionsHTML = await dessertOptions(locationId)
    const dessertContainer = document.querySelector(".choices__dessert.options")
    if (dessertContainer) {
        dessertContainer.innerHTML = dessertOptionsHTML
        dessertContainer.addEventListener('change', handleDessertChoice)
    }
}




