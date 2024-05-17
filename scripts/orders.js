export const Orders = async () => {
    const fetchResponse = await fetch("http://localhost:8088/orders?_expand=location&_expand=food&_expand=drink&_expand=dessert");
    const orders = await fetchResponse.json();

    let ordersHTML = '<article class="orderList">';

    ordersHTML += orders.map(
        (order) => {
            const foodPrice = order.food ? order.food.price : 0;
            const drinkPrice = order.drink ? order.drink.price : 0;
            const dessertPrice = order.dessert ? order.dessert.price : 0;
            let orderPrice = foodPrice + drinkPrice + dessertPrice;

            // Round the orderPrice to 2 decimal places
            orderPrice = orderPrice.toFixed(2);

            // Format the price with a $ sign
            const orderPriceFormatted = parseFloat(orderPrice).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });

            const orderFood = order.food ? order.food.name : "No Wiener for you?!  What're you doing here???";
            const orderDrink = order.drink ? order.drink.name: "No Drink";
            const orderDessert = order.dessert ? order.dessert.name: "No Dessert";

            const orderFoodImage = order.food ? `<img class="food-image" src="${order.food.image}" />` :  ""  // Added .food-image class
            const orderDrinkImage = order.drink ? `<img class="drink-image" src="${order.drink.image}" />` : "" // Added .drink-image class
            const orderDessertImage = order.dessert ? `<img class="dessert-image" src="${order.dessert.image}" />` : "" // Added .dessert-image class
            return `
                <section class="order card">
                    <p>${orderFoodImage}  ${orderFood}</p>
                    <p>${orderDrinkImage}  ${orderDrink}</p>
                    <p>${orderDessertImage}  ${orderDessert}</p>
                    <p>Total Price: ${orderPriceFormatted}</p>
                </section>`
        }
    ).join("");

    ordersHTML += `</article>`;

    return ordersHTML;
};
