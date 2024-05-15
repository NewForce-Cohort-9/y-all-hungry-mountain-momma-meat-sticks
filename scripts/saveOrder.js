import { placeOrder } from "./transientState.js"


     const handleCustomerOrderClick = (clickEvent) => {
        if (clickEvent.target.id === "saveOrder") {
            placeOrder()
        }
    }

export const placeCustomerOrder = () => {

    document.addEventListener("click", handleCustomerOrderClick)

    return "<div><button id='saveOrder'>Place Order</button></div>" 
     
}