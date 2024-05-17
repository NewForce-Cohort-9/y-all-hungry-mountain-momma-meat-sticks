const transientState = {
    locationId: 0,
    foodId: 0,
    drinkId: 0, 
    dessertId: 0
};

export const setLocationChoice = (chosenLocation) => {
    
    transientState.locationId = chosenLocation === 0 ? 0 : chosenLocation;
    console.log("Updated Location State:", transientState);
};

export const setFoodChoice = (chosenFood) => {
    
    transientState.foodId = chosenFood === 0 ? 0 : chosenFood;
    console.log("Updated Food State:", transientState);
};

export const setDrinkChoice = (chosenDrink) => {
 
    transientState.drinkId = chosenDrink === 0 ? 0 : chosenDrink;
    console.log("Updated Drink State:", transientState);
};

export const setDessertChoice = (chosenDessert) => {
    transientState.dessertId = chosenDessert === 0 ? 0 : chosenDessert;
    console.log("Updated Dessert State:", transientState);
};

export const resetTransientState = () => {
    // Reset all state variables to 0
    transientState.locationId = 0;
    transientState.foodId = 0;
    transientState.drinkId = 0;
    transientState.dessertId = 0;
    console.log("State after reset:", transientState);
};

export const placeOrder = async () => {
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transientState)
    };

    const response = await fetch("http://localhost:8088/orders", postOptions);
    console.log("Order placed:", transientState);

    // Reset the state after placing the order to clean up for a new order
    resetTransientState();

    const customEvent = new CustomEvent("newSubmissionCreated");
    document.dispatchEvent(customEvent);
};
