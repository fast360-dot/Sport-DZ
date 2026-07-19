// ===========================
// Sport DZ
// Google Sheets + Shopping Cart
// ===========================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzLqFGzqqor3T_3k8HdeDwxHu688zOcepASWX8LF-5QC2h6PRChy-xacMYt0kgyGs2G/exec";

let cart = [];

// إضافة منتج
function addToCart(name, price) {

    cart.push({
        name: name,
        price: Number(price)
    });

    updateCart();

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

}// تشغيل الصفحة
document.addEventListener("DOMContentLoaded", () => {

    updateCart();

    const form = document.querySelector("#order form");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        if (cart.length === 0) {

            alert("السلة فارغة");

            return;

        }

        const data = {

            name: document.getElementById("name").value,
            lastname: document.getElementById("lastname").value,
            phone: document.getElementById("phone").value,
            state: document.getElementById("state").value,
            city: document.getElementById("city").value,
            address: document.getElementById("address").value,
            products: document.getElementById("product").value,
            size: document.getElementById("size").value,
            quantity: document.getElementById("quantity").value,
            notes: document.getElementById("notes").value

        };

        try {

            const response = await fetch(SCRIPT_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)

            });            if (!response.ok) {

                throw new Error("فشل إرسال الطلب");

            }

            const result = await response.json();

            console.log(result);

            alert("تم إرسال الطلب بنجاح ✅");

            form.reset();

            clearCart();

        } catch (error) {

            console.error(error);

            alert("حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى.");

        }

    });

});
