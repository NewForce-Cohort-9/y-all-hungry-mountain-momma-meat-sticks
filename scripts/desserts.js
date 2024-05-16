import { setDessertChoice } from "./transientState.js"
import { updateTotalPrice } from './runningPrice.js'

const handleDessertsChoice = (event) => {
    if (event.target.id === "dessert") {
        setDessertChoice(parseInt(event.target.value))
        updateTotalPrice() // Update the total price whenever a dessert is selected
    }
}

export const dessertOptions = async () => {
    const response = await fetch("http://localhost:8088/desserts")
    const desserts = await response.json()

    let dessertsOptionsHTML = ""
    dessertsOptionsHTML += `<select id="dessert">`
    dessertsOptionsHTML += `<option value="0">Desserts Items</option>`
    dessertsOptionsHTML += `<option value="none">None</option>`
    for (const dessert of desserts) {
        dessertsOptionsHTML += `<option value="${dessert.price}" data-price="${dessert.price}">${dessert.name}</option>`
    }
    dessertsOptionsHTML += `</select>`

    return dessertsOptionsHTML
}
