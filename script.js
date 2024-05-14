/**
 * Массив для хранения транзакций
 * @type {Array<Object>}
 */
let transactions = [];

/**
 * Счетчик для генерации уникальных идентификаторов транзакций
 * @type {number}
 */
let idCounter = 0;

/**
 * Функция для добавления новой транзакции
 * @param {Event} event - событие отправки формы
 */
function addTransaction(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    /**
     * Объект транзакции
     * @type {Object}
     * @property {number} id - уникальный идентификатор транзакции
     * @property {Date} date - дата и время добавления транзакции
     * @property {number} amount - сумма транзакции
     * @property {string} category - категория транзакции
     * @property {string} description - описание транзакции
     */
    const transaction = {
        id: idCounter++,
        date: new Date(),
        amount: parseFloat(amount),
        category: category,
        description: description
    };

    transactions.push(transaction);

    const table = document.getElementById('transaction-table');
    const row = table.insertRow();

    row.insertCell().innerText = transaction.id;
    row.insertCell().innerText = transaction.date.toLocaleString();
    row.insertCell().innerText = transaction.category;
    row.insertCell().innerText = transaction.description.split(' ').slice(0, 4).join(' ');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить';
    deleteButton.addEventListener('click', () => {
        const index = transactions.findIndex(t => t.id === transaction.id);
        transactions.splice(index, 1);
        table.deleteRow(row.rowIndex);
        calculateTotal();
    });
    row.insertCell().appendChild(deleteButton);

    row.className = transaction.amount >= 0 ? 'positive' : 'negative';

    row.addEventListener('click', () => {
        document.getElementById('full-description').innerText = `ID: ${transaction.id}\nДата и Время: ${transaction.date.toLocaleString()}\nКатегория: ${transaction.category}\nОписание: ${transaction.description}\nСумма: ${transaction.amount}`;
    });

    calculateTotal();
}

/**
 * Функция для подсчета общей суммы транзакций
 */
function calculateTotal() {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById('total-amount').innerText = total.toFixed(2);
}

document.getElementById('transaction-form').addEventListener('submit', addTransaction);
