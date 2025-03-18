let products = [
    {
        id: 1,
        name1: "Men men",
        price: 20000,
        quanlity: 20,
        category: "Mon an dan toc Mong",
    },
    {
        id: 2,
        name1: "Mut",
        price: 80000,
        quanlity: 21,
        category: "Mon an dan toc Kinh",
    },
    {
        id: 3,
        name1: "Com lam",
        price: 20000,
        quanlity: 15,
        category: "Mon an dan toc Mong",
    },
    {
        id: 4,
        name1: "Banh dau xanh",
        price: 60000,
        quanlity: 30,
        category: "Mon an dan toc Kinh",
    }
];
let cart = [];

// menu
function showMenu() {
    console.log("===== MENU =====");
    console.log("1. Hien thi danh sach san pham theo ten danh muc");
    console.log("2. Chon san pham de mua bang cach nhap id san pham");
    console.log("3. Sap xep san pham trong cua hang theo gia: \n   1. Gia tang dan \n   2. Gia giam dan");
    console.log("4. Tinh so tien thanh toan trong gio hang");
    console.log("5. Thoat");
    console.log("================");
}

// function to show products by category
function showProduct() {
    let searchCategory = prompt("Nhap ten danh muc");
    let result = products.filter(function(product) {
        return product.category === searchCategory;
    });
    
    if (result.length === 0) {
        console.log("Khong tim thay san pham thuoc danh muc nay");
    } else {
        console.log("Danh sach san pham thuoc danh muc " + searchCategory + ":");
        result.forEach(function(product) {
            console.log(`ID: ${product.id}, Ten: ${product.name1}, Gia: ${product.price}, So luong: ${product.quanlity}`);
        });
    }
}

// Function to add product to cart
function addToCart() {
    let productId = parseInt(prompt("Nhap id san pham muon mua"));
    let product = products.find(function(item) {
        return item.id === productId;
    });
    
    if (!product) {
        console.log("Khong tim thay san pham");
        return;
    }
    
    let productQuantity = parseInt(prompt("Nhap so luong san pham muon mua"));
    
    if (isNaN(productQuantity) || productQuantity <= 0) {
        console.log("So luong khong hop le");
        return;
    }
    
    if (productQuantity > product.quanlity) {
        console.log(`So luong khong du. Hien chi con ${product.quanlity} san pham`);
        return;
    }
    
    // Check if product already exists in cart
    let existingCartItem = cart.find(item => item.id === productId);
    
    if (existingCartItem) {
        // Update quantity if product already in cart
        existingCartItem.cartQuantity += productQuantity;
        console.log(`Da cap nhat so luong san pham "${product.name1}" trong gio hang thanh ${existingCartItem.cartQuantity}`);
    } else {
        // Add new product to cart
        cart.push({
            id: product.id,
            name1: product.name1,
            price: product.price,
            cartQuantity: productQuantity,
            category: product.category
        });
        console.log(`Da them ${productQuantity} san pham "${product.name1}" vao gio hang`);
    }
    
    // Update product quantity in store
    product.quanlity -= productQuantity;
}

// arrange products by price
function arrange() {
    let option = prompt("Nhap lua chon:\n1. Gia tang dan\n2. Gia giam dan");
    
    if (option === "1") {
        products.sort(function(a, b) {
            return a.price - b.price;
        });
        console.log("Da sap xep san pham theo gia tang dan:");
    } else if (option === "2") {
        products.sort(function(a, b) {
            return b.price - a.price;
        });
        console.log("Da sap xep san pham theo gia giam dan:");
    } else {
        console.log("Lua chon khong hop le");
        return;
    }
    
    // Display sorted products
    products.forEach(function(product) {
        console.log(`ID: ${product.id}, Ten: ${product.name1}, Gia: ${product.price}, So luong: ${product.quanlity}`);
    });
}

// Calculate total
function calculateTotal() {
    if (cart.length === 0) {
        console.log("Gio hang trong");
        return;
    }
    
    console.log("Gio hang cua ban:");
    cart.forEach(function(item) {
        console.log(`- ${item.name1}: ${item.cartQuantity} x ${item.price} = ${item.cartQuantity * item.price} VND`);
    });
    
    let total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.cartQuantity);
    }, 0);
    
    console.log("Tong tien can thanh toan: " + total + " VND");
}

// Main program
let choose = 0;
do {
    showMenu();
    choose = prompt("Vui long chon chuc nang");
    
    switch (choose) {
        case "1":
            showProduct();
            break;
        case "2":
            addToCart();
            break;
        case "3":
            arrange();
            break;
        case "4":
            calculateTotal();
            break;
        case "5":
            console.log("Cam on ban da su dung dich vu. Tam biet!");
            break;
        default:
            console.log("Lua chon khong hop le, vui long chon lai");
            break;
    }
    
    if (choose !== "5") {
        console.log("\n");
    }
    
} while (choose !== "5");
