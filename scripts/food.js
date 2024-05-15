// import { setFoodChoice } from "./transientState.js"

// // let foods = [];
// // let locationFoods = [];

// const handleFoodChoice = (event) => {
//     if (event.target.id === "food") {
//         setFoodChoice(parseInt(event.target.value))
//     }
// }

// export const updateFoodOptions = (locationId) => {
//     let foodOptionsHTML = `<select id="food">`;
//     foodOptionsHTML += `<option value="0">Food Items</option>`;

//     const availableFoods = locationFoods
//         .filter(lf => lf.locationId === locationId)
//         .map(lf => lf.foodId);

//     if (availableFoods.length > 0) {
//         for (const food of foods) {
//             if (availableFoods.includes(food.id)) {
//                 foodOptionsHTML += `<option value="${food.id}">${food.name}</option>`;
//             }
//         }
//     } else {
//         foodOptionsHTML += `<option value="none">None</option>`;
//     }

//     foodOptionsHTML += `</select>`;

//     document.querySelector(".choices__food").innerHTML = foodOptionsHTML;
//     document.querySelector("#food").addEventListener("change", handleFoodChoice);
// };










// import { setFoodChoice } from "./transientState.js"

// // let foods = [];
// // let locationFoods = [];

// const handleFoodChoice = (event) => {
//     if (event.target.id === "food") {
//         setFoodChoice(parseInt(event.target.value))
//     }
// }

// export const foodOptions = async () => {
//     const response = await fetch("http://localhost:8088/foods") //check link!!!
//     const foods= await response.json()

//     const nextResponse = await fetch("http://localhost:8088/locationFoods") //check link!!!
//     const locationFoods= await nextResponse.json()

//     //debugger

//     document.addEventListener("change", handleFoodChoice)

//     let foodOptionsHTML =""

//     foodOptionsHTML +=`<select id="food">`
//     foodOptionsHTML += `<option value="0">Food Items</option>` 
//     foodOptionsHTML += `<option value="none">None</option>`

// for (const food of foods){ //check name "foods"
//     foodOptionsHTML+=`<option value="${food.id}">${food.name}</option>`
// }


// foodOptionsHTML+= `</select>`

// //debugger
// return foodOptionsHTML
// }






import { setFoodChoice } from "./transientState.js";

const handleFoodChoice = (event) => {
    if (event.target.id === "food") {
        setFoodChoice(parseInt(event.target.value));
    }
};

export const foodOptions = async (locationId) => {
    const response = await fetch("http://localhost:8088/locationFoods?locationId=" + locationId);
    const locationFoods = await response.json();

    document.addEventListener("change", handleFoodChoice);

    let foodOptionsHTML = `<select id="food">`;
    foodOptionsHTML += `<option value="0">Food Items</option>`;
    for (const locationFood of locationFoods) {
        foodOptionsHTML += `<option value="${locationFood.foodId}">${locationFood.name}</option>`;
    }
    foodOptionsHTML += `</select>`;

    return foodOptionsHTML;
};

