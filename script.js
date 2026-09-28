const orderData = {
  "WH1025": {
    type: "Order",
    customer: "ABC Retail Pvt Ltd",
    status: "Ready for Dispatch",
    sku: "EL-4582",
    quantity: "120 Units",
    location: "Zone A · Rack 17",
    date: "28 Sep 2026"
  },
  "WH1026": {
    type: "Order",
    customer: "XYZ Electronics",
    status: "Picking",
    sku: "EL-7821",
    quantity: "80 Units",
    location: "Zone B · Rack 12",
    date: "28 Sep 2026"
  },
  "WH1027": {
    type: "Order",
    customer: "Nova Home Products",
    status: "In Storage",
    sku: "EL-3320",
    quantity: "65 Units",
    location: "Zone C · Rack 08",
    date: "29 Sep 2026"
  }
};

const skuData = {
  "SKU1005": {
    type: "SKU",
    item: "Fastener Kit",
    stock: "0 Units",
    reserved: "40 Units",
    available: "0 Units",
    location: "Zone C · Rack 04",
    status: "Stock-Out"
  },
  "SKU1005": {
    type: "SKU",
    item: "Fastener Kit",
    stock: "0 Units",
    reserved: "40 Units",
    available: "0 Units",
    location: "Zone C · Rack 04",
    status: "Stock-Out"
  },
  "SKU1017": {
    type: "SKU",
    item: "Drawer Runner",
    stock: "0 Units",
    reserved: "25 Units",
    available: "0 Units",
    location: "Zone A · Rack 12",
    status: "Stock-Out"
  },
  "SKU1032": {
    type: "SKU",
    item: "Hinges Pack",
    stock: "0 Units",
    reserved: "60 Units",
    available: "0 Units",
    location: "Zone B · Rack 19",
    status: "Stock-Out"
  },
  "SKU1008": {
    type: "SKU",
    item: "Cabinet Hinge",
    stock: "840 Units",
    reserved: "160 Units",
    available: "680 Units",
    location: "Zone B · Rack 12",
    status: "Available"
  }
};

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");
const toast = document.getElementById("toast");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const key = searchInput.value.trim().toUpperCase();
  if (!key) {
    renderEmpty("Enter an Order ID or SKU to search.");
    return;
  }

  if (orderData[key]) {
    const x = orderData[key];
    searchResult.innerHTML = `
      <div class="result-box">
        <div class="result-title">
          <strong>${key} · ${x.customer}</strong>
          <span class="status">${x.status}</span>
        </div>
        <div class="result-grid">
          <div><span>SKU</span><b>${x.sku}</b></div>
          <div><span>Quantity</span><b>${x.quantity}</b></div>
          <div><span>Warehouse Location</span><b>${x.location}</b></div>
          <div><span>Planned Date</span><b>${x.date}</b></div>
        </div>
      </div>`;
    return;
  }

  if (skuData[key]) {
    const x = skuData[key];
    const statusClass = x.status === "Stock-Out" ? "style=\"background:#fff1f1;color:#c84d4d\"" : "";
    searchResult.innerHTML = `
      <div class="result-box">
        <div class="result-title">
          <strong>${key} · ${x.item}</strong>
          <span class="status" ${statusClass}>${x.status}</span>
        </div>
        <div class="result-grid">
          <div><span>Stock</span><b>${x.stock}</b></div>
          <div><span>Reserved</span><b>${x.reserved}</b></div>
          <div><span>Available to Dispatch</span><b>${x.available}</b></div>
          <div><span>Warehouse Location</span><b>${x.location}</b></div>
        </div>
      </div>`;
    return;
  }

  renderEmpty(`No demo record found for "${key}". Try WH1025, WH1026, SKU1005 or SKU1008.`);
});

function renderEmpty(message) {
  searchResult.innerHTML = `<div class="result-empty">${message}</div>`;
}

const chartDays = [
  {day:"Mon", received:180, dispatched:165},
  {day:"Tue", received:210, dispatched:198},
  {day:"Wed", received:195, dispatched:190},
  {day:"Thu", received:220, dispatched:205},
  {day:"Fri", received:240, dispatched:228},
  {day:"Sat", received:205, dispatched:200}
];

function buildChart() {
  const max = Math.max(...chartDays.map(d => d.received));
  const chart = document.getElementById("barChart");
  const heroBars = document.getElementById("heroBars");

  chart.innerHTML = chartDays.map(d => `
    <div class="chart-col">
      <div class="col-bars">
        <span class="received" style="height:${(d.received/max)*100}%"></span>
        <span class="dispatched" style="height:${(d.dispatched/max)*100}%"></span>
      </div>
      <small>${d.day}</small>
    </div>
  `).join("");

  heroBars.innerHTML = chartDays.map(d => `
    <div title="${d.day}">
      <i style="height:${(d.received/max)*100}%"></i>
      <i style="height:${(d.dispatched/max)*100}%"></i>
    </div>
  `).join("");
}

buildChart();

const enquiryForm = document.getElementById("enquiryForm");
const formMessage = document.getElementById("formMessage");

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(enquiryForm);
  const name = data.get("name");
  formMessage.textContent = `Thank you, ${name}. Your enquiry has been recorded for this demo.`;
  enquiryForm.reset();
  showToast("Enquiry submitted successfully in demo mode.");
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});
