import { setDessertChoice } from "./transientState.js"


const handleDessertsChoice = (event) => {
    if (event.target.id === "dessert") {
        setDessertChoice(parseInt(event.target.value))
    }
}

export const dessertOptions = async () => {
    const response = await fetch("http://localhost:8088/desserts") //check link!!!
    const desserts= await response.json()

    //debugger

    document.addEventListener("change", handleDessertsChoice)

    let dessertsOptionsHTML =""

    dessertsOptionsHTML +=`<select id="dessert">`
    dessertsOptionsHTML += `<option value="0">Desserts Items</option>` 
    dessertsOptionsHTML+=`<option value="none">None</option>`  

for (const dessert of desserts){ //check name "desserts"
    dessertsOptionsHTML+=`<option value="${dessert.id}">${dessert.name}</option>`
}

dessertsOptionsHTML+= `</select>`

//debugger
return dessertsOptionsHTML
}
