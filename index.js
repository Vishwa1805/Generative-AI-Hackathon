const productsByCategory = {
  Shoes: [
    {
      name: "ADIDAS STEP N PACE SHOES",
      desc: "Comfortable running shoes for everyday use.",
      price: 2000,
      image: "images/sports_shoe.jpg"
    },
    {
      name: "Bata Men's Leather Boot's",
      desc: "Durable leather boots for stylish wear.",
      price: 1500,
      image: "images/leather_boots.jpg"
    },
    {
      name: "SPARX Men MESH Sneaker",
      desc: "Trendy sneakers combining comfort and style.",
      price: 799,
      image: "images/sneakers.jpg"
    }
  ],
  Electronics: [
    {
      name: "Samsung Galaxy M14 5G",
      desc: "Smoky Teal, 4GB, 128GB Storage, Exynos 1330 (5 nm), FHD+ LCD - 90Hz ",
      price: 13999,
      image: "images/smartphone.jpg"
    },
    {
      name: "HP 15 Laptop",
      desc: "AMD Ryzen 3 7320U (8GB LPDDR5, 512GB SSD) FHD, Anti-Glare, Micro-Edge, 15.6 inch/39.6cm, Win 11, Office 21, Silver, 1.59kg, fc0154AU, AMD Radeon Graphics, 1080p FHD Camera",
      price: 89999,
      image: "images/laptop.jpg"
    },
    {
      name: "Kodak Mini Shot 2 Retro 2in1 + 68 Sheets Bundle",
      desc: " The Kodak Mini Shot 2 Retro is a polaroid camera with a built-in photo printer, so you can print your images or cancel them after you have taken them. With this instant cameras, you can also print photos directly from the gallery of your mobile device via Bluetooth. This instant photo camera is compatible with Apple iPhone, iPad & Android devices.",
      price: 10999,
      image: "images/camera.jpg"
    },
    {
      name: "boAt Immortal 400",
      desc: "Change the way you game with Immortal 400 — our all-new gaming headphones with 7.1 Channel Virtual Surround Audio. The 50mm drivers will increase your immersion and awareness on the battlefield. Let everybody feel your vibe with its RGB LED lights. It comes with smooth audio, mic driver customization and a remote control to seamlessly control audio, mic, & LEDs while in-game. Its cosy earmuffs & over the ear comfort is made for persistent gamers who enjoy taking that extra mile. So, what are you waiting for? #LevelUpWithboAt by bringing home Immortal 400.",
      price: 2300,
      image: "images/headphones.jpg"
    }
  ],
  Clothing: [
    {
      name: "Classic Fit T-Shirt",
      desc: "100% cotton stylish T-shirt(XL).",
      price: 459,
      image: "images/tshirt.jpg"
    },
    {
      name: "TAGAS Men's Regular Jacket",
      desc: "Casual Wear || Low-Cut Standing Collar || Full Sleeve | Latest Stylish Jacket For Men ||Regular Fit Zip-Up Casual jacket|| bomber jacket for men(MJ-9015)",
      price: 650,
      image: "images/jacket.jpg"
    }
  ],
  Accessories: [
    {
      name: "Jockey CP11",
      desc: "SMicrofiber Blend Solid Cap with Adjustable Back Closure",
      price: 590,
      image: "images/hat.jpg"
    },
    {
      name: "VINCENT CHASE EYEWEAR",
      desc: "Full Rim Round Sunglasses| Polarized And 100% UV Protected | Men & Women | Medium | VC S13112",
      price: 599,
      image: "images/sunglasses.jpg"
    },
    {
      name: "Fastrack Analog Men's Watch-NL1474SM01",
      desc: "Dial Color: Silver ; Case Shape: Asymmetrical; Dial Glass Material: Mineral Glass. The case thickness is 6.87 mm | Band Color: Silver ; Band Material: Stainless Steel | Watch Movement Type: Quartz; Watch Display Type: Analog | Case Material: Metal; Case Diameter: 45 x 36 millimeters, Case shape: Special, Case Thickness (mm):6.87 mm, Case | Length(6H-12H) (mm):45.00 mm, Case Width(3H-9H) (mm):36.00 mm | Water Resistance Depth: 50 meters; Lock Mechanism : Diver's Clasp",
      price: 1000,
      image: "images/watch.jpg"
    },
    {
      name: "Skybags Casual Backpack",
      desc: "28L, 2 Main Compartments, Bottle Pocket, Front Pocket, Padded Shoulder Straps | Azure | Brat",
      price: 480,
      image: "images/backpack.jpg"
    }
  ]
};

let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

const productsContainer = document.getElementById("products");
const detailContent = document.getElementById("detail-content");
const searchBox = document.getElementById("search-box");
const filterBtn = document.getElementById("filter");
const cartBtn = document.getElementById("cart");
const clearSearchBtn = document.getElementById("clear-search");
const backToProductsBtn = document.getElementById("back-to-products");
const cartCountSpan = document.getElementById("cart-count");
const darkModeToggleBtn = document.getElementById("dark-mode-toggle");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.count, 0);
  if (totalItems > 0) {
    cartCountSpan.textContent = totalItems;
    cartCountSpan.style.display = "inline-block";
  } else {
    cartCountSpan.textContent = "";
    cartCountSpan.style.display = "none";
  }
}

function renderProducts(filter = "") {
  productsContainer.innerHTML = "";
  let hasResults = false;

  for (const category in productsByCategory) {
    const filteredProducts = productsByCategory[category].filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
    if (filteredProducts.length) {
      hasResults = true;
      const categorySection = document.createElement("div");
      categorySection.className = "category-section";
      categorySection.innerHTML = `<h3 class="category-title">${category}</h3>`;

      const grid = document.createElement("div");
      grid.className = "product-grid";

      filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `${product.name}, price ₹${product.price}`);

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <strong>${product.name}</strong>
          <div class="price">₹${product.price}</div>
        `;

        card.addEventListener("click", () => showProductDetail(product));
        card.addEventListener("keydown", e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showProductDetail(product);
          }
        });

        grid.appendChild(card);
      });

      categorySection.appendChild(grid);
      productsContainer.appendChild(categorySection);
    }
  }

  if (!hasResults) {
    productsContainer.innerHTML = `<p class="no-results">No products found for "<strong>${filter}</strong>".</p>`;
  }
}

function addToCart(name, price) {
  const idx = cart.findIndex(item => item.name === name);
  if (idx !== -1) {
    cart[idx].count++;
  } else {
    cart.push({ name, price, count: 1 });
  }
  saveCart();
  alert(`"${name}" added to cart.`);
}

function showProductDetail(product) {
  detailContent.innerHTML = `
    <img src="${product.image}" alt="${product.name}" style="width:100%; max-height:300px; object-fit:contain; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" />
    <h3>${product.name}</h3>
    <p>${product.desc}</p>
    <p><strong>Price:</strong> ₹${product.price}</p>
    <button id="add-to-cart-btn" aria-label="Add ${product.name} to cart">Add to Cart</button>
  `;
  backToProductsBtn.hidden = false;

  document.getElementById("add-to-cart-btn").addEventListener("click", () => addToCart(product.name, product.price));

  detailContent.parentElement.scrollTop = 0;
}

function clearSearch() {
  searchBox.value = "";
  renderProducts();
  searchBox.focus();
  clearSearchBtn.hidden = true;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark-mode", document.body.classList.contains("dark") ? "true" : "false");
}

function initDarkMode() {
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
  }
}

// Event Listeners
filterBtn.addEventListener("click", () => renderProducts(searchBox.value.trim()));
cartBtn.addEventListener("click", () => window.location.href = "cart.html");
clearSearchBtn.addEventListener("click", clearSearch);
searchBox.addEventListener("input", e => {
  clearSearchBtn.hidden = !e.target.value.trim();
  renderProducts(e.target.value.trim());
});
backToProductsBtn.addEventListener("click", () => {
  detailContent.innerHTML = `<p>Select a product to see details.</p>`;
  backToProductsBtn.hidden = true;
});
darkModeToggleBtn.addEventListener("click", toggleDarkMode);

// Initialization
initDarkMode();
renderProducts();
updateCartCount();
