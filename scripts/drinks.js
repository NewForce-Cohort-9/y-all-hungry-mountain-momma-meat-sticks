import { updateTotalPrice } from './runningPrice.js'

const handleDrinksChoice = (event) => {
    if (event.target.id === "drink") {
        updateTotalPrice() // Update the total price whenever a drink is selected
    }
}

export const drinkOptions = async () => {
    const response = await fetch("http://localhost:8088/drinks")
    const drinks = await response.json()

    let drinksOptionsHTML = ""
    drinksOptionsHTML += `<select id="drink">`
    drinksOptionsHTML += `<option value="0">Drinks Items</option>`
    drinksOptionsHTML += `<option value="none">None</option>`
    for (const drink of drinks) {
        drinksOptionsHTML += `<option value="${drink.price}" data-price="${drink.price}">${drink.name}</option>`
    }
    drinksOptionsHTML += `</select>`

    return drinksOptionsHTML
}
