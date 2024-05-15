import { setLocationChoice } from "./transientState.js"


const handleLocationChoice = (event) => {
    if (event.target.id === "location") {
        setLocationChoice(parseInt(event.target.value))
    }
}

export const locationOptions = async () => {
    const response = await fetch("http://localhost:8088/locations") //check link!!!
    const locations= await response.json()

    //debugger

    document.addEventListener("change", handleLocationChoice)

    let locationOptionsHTML =""

    locationOptionsHTML +=`<select id="location">`
    locationOptionsHTML += `<option value="0">Location Items</option>`   

for (const location of locations){ //check name "locations"
    locationOptionsHTML+=`<option value="${location.id}">${location.name}</option>`
   
}

locationOptionsHTML+= `</select>`



//locationOptionsHTML+=`You're picking up your order at ${location.name}`
//debugger

locationOptionsHTML += `<div id="locationMessage"></div>`;
return locationOptionsHTML
}

