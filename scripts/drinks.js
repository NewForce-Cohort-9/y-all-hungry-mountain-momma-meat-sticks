import { setDrinkChoice } from "./transientState.js"


const handleDrinkChoice = (event) => {
    if (event.target.id === "drink") {
        setDrinkChoice(parseInt(event.target.value))
    }
}

export const drinkOptions = async () => {
    const response = await fetch("http://localhost:8088/drinks") //check link!!!
    const drinks= await response.json()

    //debugger

    document.addEventListener("change", handleDrinkChoice)

    let drinkOptionsHTML =""

    drinkOptionsHTML +=`<select id="drink">`
    drinkOptionsHTML += `<option value="0">Drink Items</option>`  
    drinkOptionsHTML += `<option value="none">None</option>`
 

for (const drink of drinks){ //check name "drinks"
    drinkOptionsHTML+=`<option value="${drink.id}">${drink.name}</option>`
}

drinkOptionsHTML+= `</select>`

//debugger
return drinkOptionsHTML
}
