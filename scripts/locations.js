import { setLocationChoice } from "./transientState.js"
import { updateFoodOptions } from "./food.js"

const handleLocationChoice = async (event) => {
    if (event.target.id === "location") {
        const locationId = parseInt(event.target.value)
        //console.log("Selected Location ID:", locationId)

        //created a variable locationId to store location id instead of setLocationChoice(parseInt(event.target.value))
        setLocationChoice(locationId)
        await updateFoodOptions(locationId) // Pass locationId to updateFoodOptions
    }
}



export const locationOptions = async () => {
    const response = await fetch("http://localhost:8088/locations")
    const locations = await response.json()

    document.addEventListener("change", handleLocationChoice)

    let locationOptionsHTML = `<select id="location">`
    locationOptionsHTML += `<option value="0">Location Items</option>`
    for (const location of locations) {
        locationOptionsHTML += `<option value="${location.id}">${location.name}</option>`
    }
    locationOptionsHTML += `</select>`

    return locationOptionsHTML
}