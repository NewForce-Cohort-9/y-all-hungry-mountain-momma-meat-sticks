// import { locationOptions } from './locations.js'
// import { foodOptions } from './food.js'
// import { drinkOptions } from './drinks.js'
// import { dessertOptions } from './desserts.js'
// import { placeCustomerOrder } from './saveOrder.js'
// import { Orders } from './orders.js'
// import { updateTotalPrice } from './runningPrice.js'

// const container = document.querySelector("#container")

// const render = async () => {
//     const locationOptionsHTML = await locationOptions()
//     const foodOptionsHTML = await foodOptions()
//     const drinkOptionsHTML = await drinkOptions()
//     const dessertOptionsHTML = await dessertOptions()
//     const buttonHTML= await placeCustomerOrder()
//     const ordersHTML =await Orders()
//     //my change:
//     const updateTotalPriceHTML= updateTotalPrice ()

//     const composedHTML = `
//         <h1>Y'all Hungry?</h1>

//         <article class="choices">
//             <section class="choices__food options">
//                 ${foodOptionsHTML}
//             </section>

//             <section class="choices__drink options">
//                 ${drinkOptionsHTML}
//             </section>

//             <section class="choices__dessert options">
//                 ${dessertOptionsHTML}
//             </section>
//         </article>

//         <article class="locationAndOrders">
//             <section class="location">
//                 ${locationOptionsHTML}
//             </section>

//             <section class="orders">
//                 ${ordersHTML}
//                 ${buttonHTML}
//             </section>
//         </article>

//         <h2>Total: $<div id="totalPrice">${updateTotalPriceHTML}</div></h2>
//     `

//     container.innerHTML = composedHTML

//     // Add event listeners for price updating
//     document.getElementById('dessert').addEventListener('change', updateTotalPrice)
//     document.getElementById('drink').addEventListener('change', updateTotalPrice)
//     document.getElementById('food').addEventListener('change', updateTotalPrice)
// }

// document.addEventListener("newSubmissionCreated", render)

// render()


import { locationOptions } from './locations.js'
import { foodOptions, updateFoodOptions } from './food.js' // Added updateFoodOptions import
import { drinkOptions } from './drinks.js'
import { dessertOptions } from './desserts.js'
import { placeCustomerOrder } from './saveOrder.js'
import { Orders } from './orders.js'
import { updateTotalPrice } from './runningPrice.js'
import { setLocationChoice, setFoodChoice, setDrinkChoice, setDessertChoice } from './transientState.js' // Import these functions

const container = document.querySelector("#container")

const render = async () => {
    const locationOptionsHTML = await locationOptions()
    const foodOptionsHTML = await foodOptions(0) // Pass default location id 0
    const drinkOptionsHTML = await drinkOptions()
    const dessertOptionsHTML = await dessertOptions()
    const buttonHTML = await placeCustomerOrder()
    const ordersHTML = await Orders()
    
    // Removed updateTotalPriceHTML assignment since it's not needed here

    const composedHTML = `
        <h1>Y'all Hungry?</h1>

        <article class="choices">
            <section class="choices__food options">
                ${foodOptionsHTML}
            </section>

            <section class="choices__drink options">
                ${drinkOptionsHTML}
            </section>

            <section class="choices__dessert options">
                ${dessertOptionsHTML}
            </section>
        </article>

        <article class="locationAndOrders">
            <section class="location">
                ${locationOptionsHTML}
            </section>

            <section class="orders">
                ${ordersHTML}
                ${buttonHTML}
            </section>
        </article>

        <h2>Total: $<span id="totalPrice">0</span></h2>

    `

    container.innerHTML = composedHTML

    // Add event listeners for price updating and choice setting
    document.getElementById('dessert').addEventListener('change', (event) => {
        setDessertChoice(parseInt(event.target.value)) 
        updateTotalPrice()
    })
    document.getElementById('drink').addEventListener('change', (event) => {
        setDrinkChoice(parseInt(event.target.value)) 
        updateTotalPrice()
    })
    document.getElementById('food').addEventListener('change', (event) => {
        setFoodChoice(parseInt(event.target.value)) 
        updateTotalPrice()
    })
    document.getElementById('location').addEventListener('change', (event) => {
        const chosenLocation = parseInt(event.target.value)
        setLocationChoice(chosenLocation)  
    })
}

document.addEventListener("newSubmissionCreated", render)

render()
