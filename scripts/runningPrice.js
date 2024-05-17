export const updateTotalPrice = () => {
    let total = 0

    const dessertSelect = document.getElementById('dessert')
    if (dessertSelect) {
        const selectedOption = dessertSelect.options[dessertSelect.selectedIndex];
        if (selectedOption.value !== "0") { 
            const dessertPrice = parseFloat(selectedOption.getAttribute('data-price'));
            if (!isNaN(dessertPrice)) {
                total += dessertPrice;
            }
        }
    }
 
    const drinkSelect = document.getElementById('drink')
    if (drinkSelect) {
        const selectedOption = drinkSelect.options[drinkSelect.selectedIndex];
        if (selectedOption.value !== "0") {
            const drinkPrice = parseFloat(selectedOption.getAttribute('data-price'));
            if (!isNaN(drinkPrice)) {
                total += drinkPrice;
            }
        }
    }

    const foodSelect = document.getElementById('food')
    if (foodSelect) {
        const selectedOption = foodSelect.options[foodSelect.selectedIndex];
        if (selectedOption.value !== "0") {
            const foodPrice = parseFloat(selectedOption.getAttribute('data-price'));
            if (!isNaN(foodPrice)) {
                total += foodPrice;
            }
        }
    }

    document.getElementById('totalPrice').textContent = total.toFixed(2)
}






