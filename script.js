const prices = {
    apples: 30.0, 
    bananas: 30.0,
    orange: 30.0,
    guava: 30.0,
    mango: 30.0,
    papaya: 30.0,
    watermelon: 30.0, 
    carrots: 20.0, 
    broccoli: 20.0,
    potato: 20.0,
    cabbage: 20.0,
    cucumber: 20.0,
    garlic: 20.0, 
    milk: 30.5, 
    milkpacket: 30.5, 
    cheese: 30.5,
    butter: 30.5,
    yogurt: 30.5,
    curd: 30.5,
    chicken: 50.0, 
    fish: 50.0, 
    pork: 50.0,
    prawns: 50.0, 
    flour: 10.0, 
    sugar: 10.0,
    bakingpowder: 10.0,
    salt: 100.0,
    oil: 10.0,
    chillipowder: 10.0,
};

function updateOrderSummary() {
    const tableBody = document.querySelector('#orderSummary tbody');
    tableBody.innerHTML = ''; 
    let totalPrice = 0;

    for (const item in prices) {
        const quantity = parseFloat(document.getElementById(item).value) || 0;
        if (quantity > 0) {
            const itemPrice = quantity * prices[item];
            totalPrice += itemPrice;

            const row = tableBody.insertRow();
            row.innerHTML = `<td>${item}</td><td>${quantity}</td><td>Rs.${itemPrice.toFixed(2)}</td>`;
        }
    }

    document.getElementById('totalPrice').textContent = `Rs.${totalPrice.toFixed(2)}`;
}

document.querySelectorAll('#orderForm input').forEach(input => {
    input.addEventListener('input', updateOrderSummary);
});

document.getElementById('buyNow').addEventListener('click', () => {
    const orderDetails = getOrderDetails();
    localStorage.setItem('orderData', JSON.stringify(orderDetails)); 
    window.location.href = 'order1.html'; 
});

document.getElementById('addToFavourites').addEventListener('click', () => {
    const orderDetails = getOrderDetails();
    localStorage.setItem('favouriteOrder', JSON.stringify(orderDetails));
    alert('Order saved as favourite.');
});

document.getElementById('applyFavourites').addEventListener('click', () => {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
    if (favouriteOrder) {
        for (const item of favouriteOrder) {
            document.getElementById(item.name).value = item.quantity;
        }
        updateOrderSummary();
    } else {
        alert('No favourite order found.');
    }
});

function getOrderDetails() {
    const orderDetails = [];
    for (const item in prices) {
        const quantity = parseFloat(document.getElementById(item).value) || 0;
        if (quantity > 0) {
            orderDetails.push({
                name: item,
                quantity: quantity,
                price: prices[item]
            });
        }
    }
    return orderDetails;
}
