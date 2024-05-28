const categories = ['Haushalt', 'Spielzeug', 'Technik', 'Wohnen'];
const products = {
    Haushalt: [
        { name: 'Haushalt-Produkt-1: Mixer', price: 5.99, range: 1 },
        { name: 'Haushalt-Produkt-2: Grill', price: 19.99, range: 2 },
        { name: 'Haushalt-Produkt-3: Waschmaschine', price: 69.99, range: 3 },
        { name: 'Haushalt-Produkt-4: Staubsauger', price: 399.99, range: 4 },
    ],
    Spielzeug: [
        { name: 'Spielzeug-Produkt-1: Legoset', price: 7.49, range: 1 },
        { name: 'Spielzeug-Produkt-2: Spielzeugauto', price: 29.99, range: 2 },
        { name: 'Spielzeug-Produkt-3: Fußball', price: 89.99, range: 3 },
        { name: 'Spielzeug-Produkt-4: Rutsche', price: 599.99, range: 4 },
    ],
    Technik: [
        { name: 'Technik-Produkt-1: SD-karte', price: 9.99, range: 1 },
        { name: 'Technik-Produkt-2: CPU-Lüfter ', price: 39.99, range: 2 },
        { name: 'Technik-Produkt-3: Tatastur(Mechanisch)', price: 149.99, range: 3 },
        { name: 'Technik-Produkt-4: Smartphone', price: 999.99, range: 4 },
    ],
    Wohnen: [
        { name: 'Wohnen-Produkt-1: Kissen', price: 11.99, range: 1 },
        { name: 'Wohnen-Produkt-2: Lampe', price: 49.99, range: 2 },
        { name: 'Wohnen-Produkt-3: Hocker', price: 199.99, range: 3 },
        { name: 'Wohnen-Produkt-4: Sofa', price: 899.99, range: 4 },
    ]
};

const holidays = {
    // Für Testzwecke Datum ändern
    Test: {
        start: '05-24',
        end: '06-26',
        discounts: {
            Haushalt: { 1: 50, 2: 25, 3: 15, 4: 10 },
            Spielzeug: { 1: 50, 2: 25, 3: 15, 4: 10 },
            Technik: { 1: 50, 2: 25, 3: 15, 4: 10 },
            Wohnen: { 1: 50, 2: 25, 3: 15, 4: 10 }
        }
    },
    Weihnachten: {
        start: '12-24',
        end: '12-26',
        discounts: {
            Haushalt: { 1: 50, 2: 25, 3: 15, 4: 10 },
            Spielzeug: { 1: 50, 2: 25, 3: 15, 4: 10 },
            Technik: { 1: 50, 2: 25, 3: 15, 4: 10 },
            Wohnen: { 1: 50, 2: 25, 3: 15, 4: 10 }
        }
    },
    BlackFriday: {
        start: '11-24',
        end: '11-24',
        discounts: { Technik: { 1: 50, 2: 25, 3: 15, 4: 10 } }
    },
    Thanksgiving: {
        start: '11-23',end: '11-23',
        end: '11-23',
        discounts: { Haushalt: { 1: 50, 2: 25, 3: 15, 4: 10 } }
    },
    Ostern: {
        start: '04-09',
        end: '04-10',
        discounts: { Spielzeug: { 1: 50, 2: 25, 3: 15, 4: 10 } }
    }
};

let cart = [];

function generateProducts(category) {
    return products[category];
}

function randomPrice(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}
function showCategory(category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    const currentHoliday = getCurrentHoliday();
    const discounts = currentHoliday ? holidays[currentHoliday].discounts[category] || {} : {};

    products[category].forEach(product => {
        const discount = discounts[product.range] || 0;
        const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);
        productList.innerHTML += `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Preis: $${product.price}</p>
                ${currentHoliday ? `<p style="color:red;">Rabattierter Preis: $${discountedPrice}</p>` : ''}
                <button onclick="addToCart('${category}', ${products[category].indexOf(product)}, ${discount})">In den Warenkorb</button>
            </div>
        `;
    });
}

function addToCart(category, index, discount) {
    const product = products[category][index];
    const finalPrice = (product.price * (1 - discount / 100)).toFixed(2);
    cart.push({ ...product, price: finalPrice });
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <li>
                ${item.name} - $${item.price}
                <button onclick="removeFromCart(${index})">x</button>
            </li>
        `;
        total += parseFloat(item.price);
    });

    document.getElementById('total-price').innerText = `Gesamtpreis: $${total.toFixed(2)}`;
}

function getCurrentHoliday() {
    const today = new Date();
    const formattedToday = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    for (const holiday in holidays) {
        const { start, end } = holidays[holiday];
        if (isDateInRange(formattedToday, start, end)) {
            return holiday;
        }
    }
    return null;
}

function isDateInRange(current, start, end) {
    const [currentMonth, currentDay] = current.split('-').map(Number);
    const [startMonth, startDay] = start.split('-').map(Number);
    const [endMonth, endDay] = end.split('-').map(Number);

    const currentDate = new Date(2024, currentMonth - 1, currentDay);
    const startDate = new Date(2024, startMonth - 1, startDay);
    const endDate = new Date(2024, endMonth - 1, endDay);

    return currentDate >= startDate && currentDate <= endDate;
}

function getNextHoliday() {
    const today = new Date();
    const currentYear = today.getFullYear();
    let nextHoliday = null;
    let minTimeDiff = Infinity;

    for (const holiday in holidays) {
        const { start } = holidays[holiday];
        const [month, day] = start.split('-');
        const holidayDate = new Date(currentYear, month - 1, day);

        if (holidayDate < today) {
            holidayDate.setFullYear(currentYear + 1); // If the date is in the past, use the next year
        }

        const timeDiff = holidayDate - today;

        if (timeDiff < minTimeDiff) {
            minTimeDiff = timeDiff;
            nextHoliday = {
                name: holiday,
                date: holidayDate
            };
        }
    }

    return nextHoliday;
}

function updateHolidayCountdown() {
    const nextHoliday = getNextHoliday();
    const currentHoliday = getCurrentHoliday();

    if (currentHoliday) {
        const today = new Date();
        const end = holidays[currentHoliday].end;
        const [endMonth, endDay] = end.split('-').map(Number);
        const endDate = new Date(today.getFullYear(), endMonth - 1, endDay);
        const timeDiff = endDate - today;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById('next-holiday').innerText = `Der Feiertagsale "${currentHoliday}" dauert noch ${days} Tage, ${hours} Stunden, ${minutes} Minuten und ${seconds} Sekunden.`;
    } else if (nextHoliday) {
        const today = new Date();
        const timeDiff = nextHoliday.date - today;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById('next-holiday').innerText = `Nächster Feiertag: ${nextHoliday.name} in ${days} Tagen, ${hours} Stunden, ${minutes} Minuten und ${seconds} Sekunden.`;
    }
}

// Initialize the page with the first category
showCategory('Haushalt');
updateHolidayCountdown();
setInterval(updateHolidayCountdown, 1000);

