// import { setLocationChoice } from "./transientState.js"

// // let locations = [];

// const handleLocationChoice = (event) => {
//     if (event.target.id === "location") {
//         setLocationChoice(parseInt(event.target.value))
//     }
// }

// export const locationOptions = async () => {
//     const response = await fetch("http://localhost:8088/locations") //check link!!!
//     const locations= await response.json()

//     //debugger

//     document.addEventListener("change", handleLocationChoice)

//     let locationOptionsHTML =""

//     locationOptionsHTML +=`<select id="location">`
//     locationOptionsHTML += `<option value="0">Location Items</option>`   

// for (const location of locations){ //check name "locations"
//     locationOptionsHTML+=`<option value="${location.id}">${location.name}</option>`
   
// }

// locationOptionsHTML+= `</select>`

// // document.querySelector(".choices__location").innerHTML = locationOptionsHTML;//try to get food-location link

// //locationOptionsHTML+=`You're picking up your order at ${location.name}`
// //debugger

// // locationOptionsHTML += `<div id="locationMessage"></div>`
// return locationOptionsHTML
// }

import { setLocationChoice } from "./transientState.js";
import { foodOptions } from './food.js';

const handleLocationChoice = async (event) => {
    if (event.target.id === "location") {
        const locationId = parseInt(event.target.value);
        setLocationChoice(locationId);
        const foodOptionsHTML = await foodOptions(locationId);
        document.querySelector(".choices__food").innerHTML = foodOptionsHTML;
    }
};

export const locationOptions = async () => {
    const response = await fetch("http://localhost:8088/locations");
    const locations = await response.json();

    document.addEventListener("change", handleLocationChoice);

    let locationOptionsHTML = `<select id="location">`;
    locationOptionsHTML += `<option value="0">Location Items</option>`;
    for (const location of locations) {
        locationOptionsHTML += `<option value="${location.id}">${location.name}</option>`;
    }
    locationOptionsHTML += `</select>`;

    return locationOptionsHTML;
};
