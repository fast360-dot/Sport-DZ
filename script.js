import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAydnVX4mbnbcoVYLsPuVY3OXdu5103IYg",
    authDomain: "sport-dz-f255c.firebaseapp.com",
    projectId: "sport-dz-f255c",
    storageBucket: "sport-dz-f255c.firebasestorage.app",
    messagingSenderId: "1094868870226",
    appId: "1:1094868870226:web:e2fe5535291f450117ab8b",
    measurementId: "G-CD6EM1E8XY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let cart = [];

window.addToCart = function (name, price) {

    cart.push({
        name,
        price: Number(price)
    });

    updateCart();

};

window.removeItem = function (index) {

    cart.splice(index, 1);

    updateCart();

};

function clearCart() {

    cart = [];

    updateCart();

}

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

}document.addEventListener("DOMContentLoaded", () => {

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
            quantity: Number(document.getElementById("quantity").value),
            notes: document.getElementById("notes").value,
            total: Number(document.getElementById("total").textContent)

        };

        try {

            await addDoc(collection(db, "orders"), {

                ...data,

                createdAt: serverTimestamp()

            });

            alert("تم إرسال الطلب بنجاح ?");

            form.reset();

            clearCart();
			        } catch (error) {

            console.error(error);

            alert("حدث خطأ أثناء إرسال الطلب.");

        }

    });

});
