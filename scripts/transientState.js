const transientState={
    locationId: 0,
    foodId: 0,
    drinkId: 0, 
    dessertId: 0
}

export const setLocationChoice= (chosenLocation) => {
    transientState.locationId=chosenLocation
    console.log(transientState)
}

export const setFoodChoice = (chosenFood) => {
    transientState.foodId=chosenFood
    console.log(transientState)
}

export const setDrinkChoice = (chosenDrink) => {
    transientState.drinkId=chosenDrink
    console.log(transientState)
}

export const setDessertChoice = (chosenDessert) => {
    transientState.dessertId=chosenDessert
    console.log(transientState)
}



export const placeOrder= async()=>{
    const postOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"
    },body: JSON.stringify(transientState) 
}
 
const response = await fetch ("http://localhost:8088/orders", postOptions) 


const customEvent = new CustomEvent("newSubmissionCreated")
document.dispatchEvent(customEvent)

}