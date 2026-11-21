/* ---------- EDIT YOUR ITEMS HERE ----------
   Each item has 3 flavours (variants). Each variant = [name, price, description].
   Photos: images/<img>-1.jpg, images/<img>-2.jpg, images/<img>-3.jpg
   (flavour 1 uses photo 1, flavour 2 uses photo 2, flavour 3 uses photo 3). */
const items = [
  { id: 1, type: "coffee", emoji: "☕", name: "Espresso", img: "espresso", variants: [
    ["Single Espresso", 250, "A rich, strong coffee made with one shot of espresso."],
    ["Double Espresso", 350, "A bold coffee made with two shots of espresso."],
    ["Ristretto", 280, "A short, concentrated espresso with a rich flavor."] ] },

  { id: 2, type: "coffee", emoji: "🥛", name: "Cappuccino", img: "cappuccino", variants: [
    ["Classic Cappuccino", 350, "Espresso with steamed milk and creamy foam."],
    ["Iced Cappuccino", 380, "Chilled espresso mixed with cold milk and foam."],
    ["Vanilla Cappuccino", 400, "Cappuccino blended with sweet vanilla flavor."] ] },

  { id: 3, type: "coffee", emoji: "☕", name: "Caffè Latte", img: "latte", variants: [
    ["Classic Latte", 380, "Espresso mixed with smooth steamed milk."],
    ["Vanilla Latte", 420, "A creamy latte with sweet vanilla flavor."],
    ["Hazelnut Latte", 420, "A smooth latte with rich hazelnut flavor."] ] },

  { id: 4, type: "coffee", emoji: "🍫", name: "Mocha", img: "mocha", variants: [
    ["Classic Mocha", 420, "Espresso blended with chocolate and steamed milk."],
    ["White Chocolate Mocha", 460, "A creamy coffee with sweet white chocolate."],
    ["Dark Chocolate Mocha", 450, "Espresso mixed with rich dark chocolate and milk."] ] },

  { id: 5, type: "coffee", emoji: "🧊", name: "Iced Cold Brew", img: "coldbrew", variants: [
    ["Classic Cold Brew", 400, "Smooth coffee slowly brewed in cold water."],
    ["Vanilla Cold Brew", 440, "Cold brew coffee with sweet vanilla flavor."],
    ["Caramel Cold Brew", 450, "Chilled coffee with rich caramel flavor."] ] },

  { id: 6, type: "coffee", emoji: "🍮", name: "Caramel Macchiato", img: "macchiato", variants: [
    ["Hot Caramel Macchiato", 450, "Espresso with steamed milk and caramel drizzle."],
    ["Iced Caramel Macchiato", 480, "Chilled milk, espresso and caramel sauce."],
    ["Extra Caramel Macchiato", 500, "A creamy caramel macchiato with extra caramel drizzle."] ] },

  { id: 7, type: "cafe", emoji: "🥐", name: "Butter Croissant", img: "croissant", variants: [
    ["Classic Butter Croissant", 280, "A flaky, buttery pastry with a golden crust."],
    ["Chocolate Croissant", 330, "A crispy pastry filled with rich chocolate."],
    ["Almond Croissant", 360, "A buttery croissant topped with sliced almonds."] ] },

  { id: 8, type: "cafe", emoji: "🍰", name: "Chocolate Cake", img: "cake", variants: [
    ["Classic Chocolate Cake", 450, "A soft chocolate cake with rich chocolate frosting."],
    ["Chocolate Fudge Cake", 500, "A moist cake filled with thick chocolate fudge."],
    ["Chocolate Truffle Cake", 520, "A smooth chocolate cake with creamy truffle topping."] ] },

  { id: 9, type: "cafe", emoji: "🧁", name: "Blueberry Muffin", img: "muffin", variants: [
    ["Classic Blueberry Muffin", 300, "A soft muffin filled with juicy blueberries."],
    ["Blueberry Cream Muffin", 350, "A fluffy muffin with creamy filling and blueberries."],
    ["Blueberry Crumble Muffin", 330, "A blueberry muffin topped with sweet crunchy crumbs."] ] },

  { id: 10, type: "cafe", emoji: "🥪", name: "Club Sandwich", img: "sandwich", variants: [
    ["Classic Club Sandwich", 650, "Toasted bread layered with chicken, egg and fresh vegetables."],
    ["Cheese Club Sandwich", 700, "A delicious club sandwich with melted cheese and chicken."],
    ["Grilled Chicken Club", 680, "Grilled chicken with fresh vegetables and creamy sauce."] ] },

  { id: 11, type: "cafe", emoji: "🍓", name: "Strawberry Cheesecake", img: "cheesecake", variants: [
    ["Classic Strawberry Cheesecake", 550, "Creamy cheesecake topped with fresh strawberries."],
    ["Strawberry Chocolate Cheesecake", 600, "Cheesecake combined with chocolate and strawberry topping."],
    ["Strawberry Swirl Cheesecake", 580, "Creamy cheesecake with sweet strawberry swirls."] ] },

  { id: 12, type: "cafe", emoji: "🍪", name: "Chocolate Brownie", img: "brownie", variants: [
    ["Classic Chocolate Brownie", 320, "A rich, soft brownie with a chocolate flavor."],
    ["Walnut Brownie", 350, "A chocolate brownie filled with crunchy walnuts."],
    ["Fudge Brownie", 370, "A dense, moist brownie with rich chocolate fudge."] ] }
];

/* Turn the short lists above into full objects with image paths */
items.forEach(item => {
  item.variants = item.variants.map((v, n) => ({
    name: v[0],
    price: v[1],
    desc: v[2],
    image: `images/${item.img}-${n + 1}.jpg`
  }));
});

/* ---------- Items added from inside the app (saved in this browser) ---------- */
const STORE_KEY = "amroma_custom_items";
let custom = [];
try { custom = JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); } catch (e) { custom = []; }
items.push(...custom);

function saveCustom() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(custom)); return true; }
  catch (e) { return false; }
}

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const search = document.getElementById("search");
const tabs = document.querySelectorAll(".tab");
const modal = document.getElementById("modal");
const addModal = document.getElementById("addModal");
const addForm = document.getElementById("addForm");
const blocksBox = document.getElementById("flavourBlocks");
let filter = "all";

/* Image with emoji fallback */
function imageHTML(src, emoji, cls) {
  if (!src) return `<div class="ph ${cls}">${emoji}</div>`;
  return `<img src="${src}" alt="" class="${cls}" onerror="this.outerHTML='<div class=\\'ph ${cls}\\'>${emoji}</div>'">`;
}

function render() {
  const q = search.value.trim().toLowerCase();
  const list = items.filter(i =>
    (filter === "all" || i.type === filter) &&
    (i.name.toLowerCase().includes(q) || i.variants.some(v => v.name.toLowerCase().includes(q))));

  grid.innerHTML = list.map(i => {
    const lowest = Math.min(...i.variants.map(v => v.price));
    const n = i.variants.length;
    return `
    <article class="card" data-id="${i.id}" tabindex="0">
      <div class="card-img">${imageHTML(i.variants[0].image, i.emoji, "fill")}</div>
      <div class="card-body">
        <span class="badge ${i.type}">${i.type === "coffee" ? "Coffee" : "Cafe Item"}</span>
        <h3>${i.name}</h3>
        <div class="row"><strong>From Rs ${lowest}</strong><span class="view">${n} flavour${n > 1 ? "s" : ""} →</span></div>
      </div>
    </article>`;
  }).join("");

  empty.hidden = list.length > 0;
}

function updateStats() {
  document.getElementById("statTotal").textContent  = items.length;
  document.getElementById("statCoffee").textContent = items.filter(i => i.type === "coffee").length;
  document.getElementById("statCafe").textContent   = items.filter(i => i.type === "cafe").length;
}

/* ---------- Item popup ---------- */
function openModal(id) {
  const item = items.find(i => i.id === id);
  const main = document.getElementById("mainImage");
  const thumbs = document.getElementById("thumbs");
  const badge = document.getElementById("mBadge");
  const del = document.getElementById("mDelete");

  badge.textContent = item.type === "coffee" ? "Coffee" : "Cafe Item";
  badge.className = "badge " + item.type;

  /* Show one flavour: its photo, name, description and price */
  const show = n => {
    const v = item.variants[n];
    main.innerHTML = imageHTML(v.image, item.emoji, "fill");
    document.getElementById("mTitle").textContent = v.name;
    document.getElementById("mDesc").textContent = v.desc;
    document.getElementById("mPrice").textContent = "Rs " + v.price;
    thumbs.querySelectorAll("button").forEach((b, k) => b.classList.toggle("active", k === n));
  };

  thumbs.innerHTML = item.variants.map((v, n) =>
    `<button data-n="${n}" title="${v.name}">${imageHTML(v.image, item.emoji, "fill")}</button>`).join("");
  thumbs.onclick = e => {
    const b = e.target.closest("button");
    if (b) show(+b.dataset.n);
  };

  /* Delete button only for items added from the app */
  del.hidden = !item.custom;
  del.onclick = () => {
    if (!confirm("Delete \"" + item.name + "\"?")) return;
    custom = custom.filter(c => c.id !== item.id);
    items.splice(items.findIndex(i => i.id === item.id), 1);
    saveCustom();
    closeModal();
    updateStats();
    render();
  };

  show(0);
  modal.hidden = false;
  document.body.classList.add("lock");
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("lock");
}

/* ---------- Add item popup ---------- */
function buildBlocks() {
  blocksBox.innerHTML = [1, 2, 3].map(n => `
    <fieldset class="flavour">
      <legend>Flavour ${n} ${n === 1 ? "(required)" : "(optional)"}</legend>
      <div class="field-row">
        <label>Flavour name
          <input class="v-name" type="text" placeholder="e.g. Classic Tiramisu" ${n === 1 ? "required" : ""}>
        </label>
        <label>Price (Rs)
          <input class="v-price" type="number" min="0" placeholder="450" ${n === 1 ? "required" : ""}>
        </label>
      </div>
      <label>Description
        <textarea class="v-desc" rows="2" placeholder="Short description"></textarea>
      </label>
      <label>Photo
        <input class="v-photo" type="file" accept="image/*">
      </label>
    </fieldset>`).join("");
}

function openAdd() {
  addForm.reset();
  buildBlocks();
  addModal.hidden = false;
  document.body.classList.add("lock");
}

function closeAdd() {
  addModal.hidden = true;
  document.body.classList.remove("lock");
}

/* Shrink the photo so it fits in browser storage */
function fileToDataURL(file, max = 800) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

addForm.addEventListener("submit", async e => {
  e.preventDefault();
  const saveBtn = addForm.querySelector(".save-btn");
  saveBtn.disabled = true;
  saveBtn.textContent = "Saving…";

  try {
    const type = document.getElementById("fType").value;
    const variants = [];

    for (const b of document.querySelectorAll(".flavour")) {
      const name = b.querySelector(".v-name").value.trim();
      if (!name) continue;
      const priceText = b.querySelector(".v-price").value;
      if (priceText === "") { alert("Please enter a price for \"" + name + "\"."); return; }
      const file = b.querySelector(".v-photo").files[0];
      variants.push({
        name,
        price: +priceText,
        desc: b.querySelector(".v-desc").value.trim(),
        image: file ? await fileToDataURL(file) : ""
      });
    }
    if (!variants.length) return;

    const item = {
      id: Date.now(),
      custom: true,
      type,
      emoji: document.getElementById("fEmoji").value.trim() || (type === "coffee" ? "☕" : "🍰"),
      name: document.getElementById("fName").value.trim(),
      variants
    };

    custom.push(item);
    if (!saveCustom()) {
      custom.pop();
      alert("Could not save. The browser storage is full - try smaller photos or delete an old item.");
      return;
    }
    items.push(item);
    closeAdd();
    updateStats();
    render();
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "Save Item";
  }
});

/* ---------- Events ---------- */
grid.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) openModal(+card.dataset.id);
});
grid.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const card = e.target.closest(".card");
    if (card) openModal(+card.dataset.id);
  }
});
document.getElementById("closeBtn").onclick = closeModal;
document.getElementById("addBtn").onclick = openAdd;
document.getElementById("addClose").onclick = closeAdd;
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
addModal.addEventListener("click", e => { if (e.target === addModal) closeAdd(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (!modal.hidden) closeModal();
    if (!addModal.hidden) closeAdd();
  }
});

tabs.forEach(t => t.addEventListener("click", () => {
  tabs.forEach(x => x.classList.remove("active"));
  t.classList.add("active");
  filter = t.dataset.filter;
  render();
}));
search.addEventListener("input", render);

updateStats();
render();