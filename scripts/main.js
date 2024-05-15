import { locationOptions } from './locations.js'
import { foodOptions } from './food.js'
import { drinkOptions } from './drinks.js'
import { dessertOptions } from './desserts.js'
import { placeCustomerOrder } from './saveOrder.js'
import { Orders } from './orders.js'


const container = document.querySelector("#container")

const render = async () => {
    const locationOptionsHTML = await locationOptions()
    const foodOptionsHTML = await foodOptions()
    const drinkOptionsHTML = await drinkOptions()
    const dessertOptionsHTML = await dessertOptions()
    const buttonHTML= await placeCustomerOrder()
    const ordersHTML =await Orders()

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
        
    `

    container.innerHTML = composedHTML
    
}

 document.addEventListener("newSubmissionCreated", render)

 render()


