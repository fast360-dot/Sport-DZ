// ===========================
// Sport DZ
// Shopping Cart
// ===========================

let cart = [];

// إضافة منتج
function addToCart(name, price) {

    cart.push({
        name: name,
        price: Number(price)
    });

    updateCart();

}

// تحديث السلة
function updateCart() {

    const cartList = document.getElementById("cart-list");
    const total = document.getElementById("total");
    const cartCount = document.getElementById("cart-count");
    const productInput = document.getElementById("product");

    cartList.innerHTML = "";

    let sum = 0;
    let names = [];

    cart.forEach((item, index) => {

        sum += item.price;
        names.push(item.name);

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${item.name} - ${item.price} DA</span>
            <button onclick="removeItem(${index})">حذف</button>
        `;

        cartList.appendChild(li);

    });

    total.textContent = sum;
    cartCount.textContent = cart.length;

    productInput.value = names.join(" , ");

}

// حذف منتج
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}

// إفراغ السلة
function clearCart() {

    cart = [];

    updateCart();

}

// تشغيل الصفحة
document.addEventListener("DOMContentLoaded", () => {

    updateCart();

    const form = document.querySelector("#order form");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        if (cart.length === 0) {

            alert("السلة فارغة");

            return;

        }

        alert("تم إرسال الطلب بنجاح ✅");

        console.log("الطلب:");

        console.log(cart);

        clearCart();

        form.reset();

    });

});