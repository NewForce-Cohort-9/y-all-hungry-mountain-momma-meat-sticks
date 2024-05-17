export const updateTotalPrice = () => {
    let total = 0

    const dessertSelect = document.getElementById('dessert')
    if (dessertSelect) {
        const selectedOption = dessertSelect.options[dessertSelect.selectedIndex]
        const dessertPrice = parseFloat(selectedOption.getAttribute('data-price'))
        console.log('Selected dessert price:', dessertPrice)
        if (!isNaN(dessertPrice)) {
            total += dessertPrice
        }
    }

    

    const drinkSelect = document.getElementById('drink')
    if (drinkSelect) {
        const selectedOption = drinkSelect.options[drinkSelect.selectedIndex]
        const drinkPrice = parseFloat(selectedOption.getAttribute('data-price'))
        console.log('Selected drink price:', drinkPrice)
        if (!isNaN(drinkPrice)) {
            total += drinkPrice
        }
    }

    

    const foodSelect = document.getElementById('food')
    if (foodSelect) {
        const selectedOption = foodSelect.options[foodSelect.selectedIndex]
        const foodPrice = parseFloat(selectedOption.getAttribute('data-price'))
        console.log('Selected food price:', foodPrice)
        if (!isNaN(foodPrice)) {
            total += foodPrice
        }
    }

    

    document.getElementById('totalPrice').textContent = total.toFixed(2)
}






