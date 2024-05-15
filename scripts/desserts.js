import { setDessertChoice } from "./transientState.js"


const handleDessertsChoice = (event) => {
    if (event.target.id === "desserts") {
        setDessertChoice(parseInt(event.target.value))
    }
}

export const dessertOptions = async () => {
    const response = await fetch("http://localhost:8088/desserts") //check link!!!
    const dessertss= await response.json()

    //debugger

    document.addEventListener("change", handleDessertsChoice)

    let dessertsOptionsHTML =""

    dessertsOptionsHTML +=`<select id="desserts">`
    dessertsOptionsHTML += `<option value="0">Desserts Items</option>` 
    dessertsOptionsHTML+=`<option value="none">None</option>`  

for (const desserts of dessertss){ //check name "dessertss"
    dessertsOptionsHTML+=`<option value="${desserts.id}">${desserts.name}</option>`
}

dessertsOptionsHTML+= `</select>`

//debugger
return dessertsOptionsHTML
}
