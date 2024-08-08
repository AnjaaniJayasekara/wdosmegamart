document.addEventListener('DOMContentLoaded', () => {
    const orderData = JSON.parse(localStorage.getItem('orderData')) || [];
    const orderSummaryTableBody = document.querySelector('#order-summary-table tbody');
    let totalPrice = 0;

    orderData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs.${(item.price * item.quantity).toFixed(2)}</td>
        `;
        orderSummaryTableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('order-total-price').textContent = `Rs.${totalPrice.toFixed(2)}`;

    const paymentMethodSelect = document.getElementById('payment-method');
    const cardDetailsSection = document.getElementById('card-details');

    paymentMethodSelect.addEventListener('change', () => {
        if (paymentMethodSelect.value === 'credit-card' || paymentMethodSelect.value === 'debit-card') {
            cardDetailsSection.style.display = 'block';
        } else {
            cardDetailsSection.style.display = 'none';
        }
    });

    document.getElementById('details-form').addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const paymentMethod = paymentMethodSelect.value;

        if (name && email && phone && address && paymentMethod) {
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 5); 

            alert(`Thank you for your purchase, ${name}! Your order will be delivered on ${deliveryDate.toDateString()}.`);
        } else {
            alert('Please fill in all fields.');
        }
    });
});
