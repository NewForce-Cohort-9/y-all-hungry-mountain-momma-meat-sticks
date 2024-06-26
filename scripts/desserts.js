import { updateTotalPrice } from './runningPrice.js';
import { setDessertChoice } from './transientState.js';

const handleDessertsChoice = (event) => {
    if (event.target.id === "dessert") {
        setDessertChoice(parseFloat(event.target.value));
        updateTotalPrice();
    }
}

export const dessertOptions = async (locationId) => {
    console.log("Location Id:", locationId);

    const dessertItemsResponse = await fetch("http://localhost:8088/desserts");
    const dessertItems = await dessertItemsResponse.json();
    console.log("Dessert Items:", dessertItems);

    const locationDessertItemsResponse = await fetch("http://localhost:8088/locationDesserts");
    const locationDessertItems = await locationDessertItemsResponse.json();
    console.log("Location Dessert Items:", locationDessertItems);

    const filteredLocationDessertItems = locationDessertItems.filter(lfItem => lfItem.locationId === locationId);
console.log("Filtered Location Dessert Items:", filteredLocationDessertItems);

const availableDesserts = filteredLocationDessertItems.map(filteredLFItem => {
    const dessert = dessertItems.find(dessert => dessert.id === filteredLFItem.dessertId);
    return { ...dessert, quantity: filteredLFItem.quantity };
});
console.log("Available Desserts:", availableDesserts);

let dessertOptionsHTML = "";
dessertOptionsHTML += `<h1>Choose your Dessert!</h1>`;
dessertOptionsHTML += `<select id="dessert">`;
dessertOptionsHTML += `<option value="0">None</option>`;
for (const dessert of availableDesserts) {
    dessertOptionsHTML += `<option value="${dessert.id}" data-price="${dessert.price}">${dessert.name} (Available: ${dessert.quantity})</option>`;
}
dessertOptionsHTML += `</select>`;


    return dessertOptionsHTML;
}

export const updateDessertOptions = async (locationId) => {
    const dessertOptionsHTML = await dessertOptions(locationId);
    const dessertContainer = document.querySelector(".choices__dessert.options");
    dessertContainer.innerHTML = dessertOptionsHTML;
    dessertContainer.addEventListener('change', handleDessertsChoice);
}
