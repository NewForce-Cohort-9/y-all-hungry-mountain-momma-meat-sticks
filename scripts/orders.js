export const Orders = async () => {
    const fetchResponse = await fetch("http://localhost:8088/orders?_expand=location&_expand=food&_expand=drink&_expand=dessert");
    const orders = await fetchResponse.json()

    let ordersHTML = '<article class="orderList">'

    ordersHTML += orders.map(
        (order) => {
            const foodPrice = order.food ? order.food.price : 0
            const drinkPrice = order.drink ? order.drink.price : 0
            const dessertPrice = order.dessert ? order.dessert.price : 0
            let orderPrice = foodPrice + drinkPrice + dessertPrice;

            // Round the orderPrice to 2 decimal places
            orderPrice = orderPrice.toFixed(2)

            // Format the price with a $ sign
            const orderPriceFormatted = parseFloat(orderPrice).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })

            const orderFood = order.food ? order.food.name : "None"
            const orderDrink = order.drink ? order.drink.name : "None"
            const orderDessert = order.dessert ? order.dessert.name : "None"

            
            return `
                <section class="order card">
                    <p>(Food image)  ${orderFood}</p>
                    <p>(Drink image)  ${orderDrink}</p>
                    <p>(Dessert image)  ${orderDessert}</p>
                    <p>Total Price: ${orderPriceFormatted}</p>
                </section>`
        }
    ).join("");

    ordersHTML += `</article>`

    return ordersHTML
}
