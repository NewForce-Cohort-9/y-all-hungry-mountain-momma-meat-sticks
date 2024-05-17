import { updateTotalPrice } from './runningPrice.js'
import { setDessertChoice } from './transientState.js' 

const handleDessertsChoice = (event) => {
    if (event.target.id === "dessert") {
        setDessertChoice(parseFloat(event.target.value)) 
        updateTotalPrice() 
    }
}

export const dessertOptions = async (locationId) => {
    console.log("Location Id:", locationId)

    const dessertItemsResponse = await fetch("http://localhost:8088/desserts")
    const dessertItems = await dessertItemsResponse.json()
    console.log("Dessert Items:", dessertItems)
    
    //document.addEventListener("change", handleDessertsChoice)

    const locationDessertItemsResponse = await fetch("http://localhost:8088/locationDesserts")
    const locationDessertItems = await locationDessertItemsResponse.json()
    console.log("Location Dessert Items:", locationDessertItems)

    const filteredLocationDessertItems = locationDessertItems.filter(lfItem => lfItem.locationId === locationId)
    console.log("Filtered Location Dessert Items:", filteredLocationDessertItems)

    const availableDessertIds = filteredLocationDessertItems.map(filteredLFItem => filteredLFItem.dessertId)
    console.log("Available Dessert Ids:", availableDessertIds)

    let dessertOptionsHTML = `<select id="dessert">`
    dessertOptionsHTML += `<option value="0">Dessert Items</option>`
    dessertOptionsHTML += `<option value="none">None</option>`

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
        dessertContainer.addEventListener('change', handleDessertsChoice)
    }
}
