function createPhone(id, name, price, quantity, company) {
    return { id, name, price, quantity, company };
}

let phones = [
    createPhone(1, "iPhone 13", 2000, 5, "Apple"),
    createPhone(2, "Samsung Galaxy S21", 1500, 8, "Samsung"),
    createPhone(3, "Xiaomi Mi 11", 1000, 10, "Xiaomi"),
];

let cart = [];

function showPhonesByCompany(company) {
    let filteredPhones = phones.filter(phone => phone.company === company);
    console.table(filteredPhones);
}

function addPhone(id, name, price, quantity, company) {
    phones.push(createPhone(id, name, price, quantity, company));
    console.log("Da them dien thoai moi vao cua hang!");
}

function searchPhone(query) {
    let result = phones.filter(phone => phone.name.includes(query) || phone.id == query);
    console.table(result);
}

function buyPhone(id, quantity) {
    let phone = phones.find(phone => phone.id === id);
    if (phone && phone.quantity >= quantity) {
        phone.quantity -= quantity;
        let cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push(createPhone(id, phone.name, phone.price, quantity, phone.company));
        }
        console.log("Mua hang thanh cong!");
    } else {
        console.log("Khong du so luong hoac dien thoai khong ton tai!");
    }
}

function checkout() {
    if (cart.length === 0) {
        console.log("Gio hang trong!");
    } else {
        cart = [];
        console.log("Thanh toan thanh cong! Gio hang da duoc xoa.");
    }
}

function sortPhones(ascending = true) {
    phones.sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
    console.table(phones);
}

function showTotalStockValue() {
    let totalValue = phones.reduce((sum, phone) => sum + phone.price * phone.quantity, 0);
    console.log(`Tong gia tri dien thoai trong kho: ${totalValue} VND`);
}

function showTotalQuantityByCompany() {
    let companyStock = {};
    phones.forEach(phone => {
        if (!companyStock[phone.company]) {
            companyStock[phone.company] = 0;
        }
        companyStock[phone.company] += phone.quantity;
    });
    console.table(companyStock);
}
