document.addEventListener("DOMContentLoaded", () => {
  function getMenu() {
    return fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    )
      .then((response) => response.json())
      .catch((err) => {
        console.error("Failed to load data", err);
      });
  }

  function displayMenu(menu) {
    const menuItems = document.querySelector(".menu-items");
    menu.slice(0, 3).forEach((item) => {
      menuItems.innerHTML += `
          <div class="card">
            <img src="${item.imgSrc}" alt="burger">
            <div class="container">
              <div class="text">
                <h4>${item.name}</h4>
                <p>$${item.price}/-</p>
              </div>
              <button type="button">+</button>
            </div>
          </div>
        `;
    });

    // Construct an array of objects with id, name, and price
    const menuData = menu.map((item) => {
      return { id: item.id, name: item.name, price: item.price };
    });

    console.log("Menu:", menuData); // Log the menu data to console
  }

  function TakeOrder(menu) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let burgers = [];

        for (let i = 0; i < 3; i++) {
          idx = Math.floor(Math.random() * menu.length);
          burgers.push(menu[idx].name);
        }

        const order = {burgers: burgers};

        resolve(order);
      }, 2500);
    });
  }

  function orderPrep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }

  function payOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }

  function thankyouFnc() {
    alert("Thank you for eating with us today!");
  }

  getMenu()
    .then((menu) => {
      displayMenu(menu); // Display the menu
      return TakeOrder(menu);
    })
    .then((order) => {
      console.log("Your order:", order);
      return orderPrep();
    })
    .then((prepStatus) => {
      console.log("Preparation status:", prepStatus);
      return payOrder();
    })
    .then((payment) => {
      console.log("Payment Status:", payment);
      if (payment.paid) {
        return thankyouFnc();
      }
    })
    .catch((err) => {
      console.error("Error in restaurant process", err);
    });

    // toggle sidebar
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menu-toggle');
    menuIcon.addEventListener('click',()=>{
     sidebar.classList.toggle('active');
     menuIcon.classList.toggle('is-active');
    })
});
