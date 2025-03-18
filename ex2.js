function createBook(id, name, price, quantity, category) {
    return { id, name, price, quantity, category };
}

let books = [
    createBook(1, "Sach A", 100, 10, "Van hoc"),
    createBook(2, "Sach B", 200, 5, "Khoa hoc"),
    createBook(3, "Sach C", 150, 8, "Van hoc"),
];

let cart = [];

function showBooksByCategory(category) {
    let filteredBooks = books.filter(book => book.category === category);
    console.table(filteredBooks);
}

function addBook(id, name, price, quantity, category) {
    books.push(createBook(id, name, price, quantity, category));
    console.log("Da them sach moi vao kho!");
}

function searchBook(query) {
    let result = books.filter(book => book.name.includes(query) || book.id == query);
    console.table(result);
}

function buyBook(id, quantity) {
    let book = books.find(book => book.id === id);
    if (book && book.quantity >= quantity) {
        book.quantity -= quantity;
        let cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push(createBook(id, book.name, book.price, quantity, book.category));
        }
        console.log("Mua hang thanh cong!");
    } else {
        console.log("Khong du so luong hoac sach khong ton tai!");
    }
}

function sortBooks(ascending = true) {
    books.sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
    console.table(books);
}

function showCartSummary() {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    console.log(`Tong so luong sach da mua: ${totalQuantity}`);
    console.log(`Tong tien: ${totalPrice} VND`);
}

function showStockQuantity() {
    let totalStock = books.reduce((sum, book) => sum + book.quantity, 0);
    console.log(`Tong so luong sach trong kho: ${totalStock}`);
}
