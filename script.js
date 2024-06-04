document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('itemForm');
    const stockTable = document.getElementById('stockTable').getElementsByTagName('tbody')[0];
    const totalValueElement = document.getElementById('totalValue');

    const sections = {
        home: document.getElementById('home-section'),
        addItem: document.getElementById('add-item-section'),
        stock: document.getElementById('stock-section')
    };

    const navHome = document.getElementById('nav-home');
    const navAddItem = document.getElementById('nav-add-item');
    const navStock = document.getElementById('nav-stock');

    navHome.addEventListener('click', () => {
        showSection('home');
        document.querySelector('.total-section').style.display = 'none';
    });

    navAddItem.addEventListener('click', () => {
        showSection('addItem');
        document.querySelector('.total-section').style.display = 'none';
    });

    navStock.addEventListener('click', () => {
        showSection('stock');
        document.querySelector('.total-section').style.display = 'block';
    });

    let stock = [];

    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const itemName = document.getElementById('itemName').value;
        const itemQuantity = parseInt(document.getElementById('itemQuantity').value, 10);
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);

        const existingItemIndex = stock.findIndex(item => item.name === itemName);

        if (existingItemIndex !== -1) {
            stock[existingItemIndex].quantity += itemQuantity;
            stock[existingItemIndex].price = itemPrice;
        } else {
            stock.push({ name: itemName, quantity: itemQuantity, price: itemPrice });
        }

        itemForm.reset();
        renderStockTable();
    });

    function deleteItem(itemName) {
        stock = stock.filter(item => item.name !== itemName);
        renderStockTable();
    }

    function renderStockTable() {
        stockTable.innerHTML = '';
        let totalValue = 0;

        stock.forEach(item => {
            const row = stockTable.insertRow();

            const nameCell = row.insertCell(0);
            const quantityCell = row.insertCell(1);
            const priceCell = row.insertCell(2);
            const totalCell = row.insertCell(3);
            const actionsCell = row.insertCell(4);

            nameCell.textContent = item.name;
            quantityCell.textContent = item.quantity;
            priceCell.textContent = `$${item.price.toFixed(2)}`;
            const totalItemValue = item.quantity * item.price;
            totalCell.textContent = `$${totalItemValue.toFixed(2)}`;
            actionsCell.innerHTML = `<i class="fas fa-trash-alt" onclick="deleteItem('${item.name}')"></i>`;

            totalValue += totalItemValue;
        });

        totalValueElement.textContent = totalValue.toFixed(2);
    }

    function showSection(section) {
        Object.keys(sections).forEach(key => {
            sections[key].style.display = 'none';
            sections[key].classList.remove('active');
        });
        sections[section].style.display = 'block';
        setTimeout(() => {
            sections[section].classList.add('active');
        }, 0);
    }

    window.deleteItem = deleteItem; // Make the deleteItem function available globally

    // Show the home section by default
    showSection('home');
});
