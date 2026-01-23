// c:/Users/nreed/OneDrive/Desktop/FarmSite/js/admin/inventory.js
import { toMoney, showToast } from './utils.js';
import { FarmService } from '../services.js';

let dataStore;
let showModal;
let refreshData;

const INCOME_CATEGORIES = ['Farm Fresh Eggs', 'Plants & Produce', 'Meat/Livestock', 'Baked Goods', 'Arts & Crafts', 'Merch', 'Other'];

function renderInventory() {
    console.log("Rendering Inventory:", dataStore.inventory);
    const catSelect = document.getElementById('invCat');
    
    if (catSelect && catSelect.innerHTML === "") {
        catSelect.innerHTML = `<option value="">-- Cat --</option>` + INCOME_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    const tbody = document.getElementById('inventoryList');
    const template = document.getElementById('inventory-row-template');
    tbody.innerHTML = "";
    
    if (!Array.isArray(dataStore.inventory) || !template) return;
    
    dataStore.inventory.forEach((item, index) => {
        const clone = template.content.cloneNode(true);
        const row = clone.querySelector('tr');

        if (item.active === false) {
            row.classList.add("opacity-50", "bg-gray-100", "dark:bg-gray-700");
        } else {
            row.classList.add("bg-white", "dark:bg-gray-800");
        }
        
        const rawPrice = toMoney(item.price) || 0;
        const displayPrice = '$' + rawPrice.toFixed(2);
        
        const isOutOfStock = (parseFloat(item.qty) || 0) <= 0;

        clone.querySelector('.name-cell').textContent = item.name;

        const categorySelect = clone.querySelector('.category-select');
        categorySelect.innerHTML += INCOME_CATEGORIES.map(c => `<option value="${c}" ${item.category === c ? 'selected' : ''}>${c}</option>`).join('');
        categorySelect.addEventListener('change', (e) => updateInv(index, 'category', e.target.value));

        const qtyInput = clone.querySelector('.qty-input');
        qtyInput.value = item.qty || '';
        qtyInput.addEventListener('change', (e) => updateInv(index, 'qty', e.target.value));

        const priceInput = clone.querySelector('.price-input');
        priceInput.value = displayPrice;
        priceInput.addEventListener('change', (e) => updateInv(index, 'price', e.target.value));

        const activeCheckbox = clone.querySelector('.active-checkbox');
        activeCheckbox.checked = item.active !== false;
        activeCheckbox.addEventListener('change', (e) => updateInv(index, 'active', e.target.checked));

        const sellButton = clone.querySelector('.sell-button');
        if (isOutOfStock) {
            sellButton.classList.add("bg-red-600", "cursor-not-allowed", "opacity-50");
            sellButton.textContent = "OUT";
        } else {
            sellButton.classList.add("bg-green-600", "hover:bg-green-700");
            sellButton.textContent = "💲 SELL";
            sellButton.addEventListener('click', () => quickSell(index));
        }

        clone.querySelector('.restock-button').addEventListener('click', () => restockInv(index));
        clone.querySelector('.remove-button').addEventListener('click', () => removeInv(item.id));

        tbody.appendChild(clone);
    });
}

async function quickSell(index) {
    const item = dataStore.inventory[index];
    const title = `Sell: ${item.name}`;
    const html = `
        <div class="space-y-4">
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400">Quantity</label>
                <input type="number" id="modalQty" value="1" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400">Unit Price ($)</label>
                <input type="number" id="modalPrice" value="${toMoney(item.price) || 0}" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" id="modalDiscount" class="w-5 h-5 accent-red-600">
                <label for="modalDiscount" class="text-sm font-bold text-red-600 dark:text-red-400">50% Off / Damaged Item</label>
            </div>
        </div>
    `;

    showModal(title, html, async () => {
        const qtyToSell = document.getElementById('modalQty').value;
        const priceFromModal = document.getElementById('modalPrice').value;
        const isDiscounted = document.getElementById('modalDiscount').checked;

        if (!qtyToSell || isNaN(qtyToSell) || toMoney(qtyToSell) <= 0) {
            alert("Please enter a valid quantity.");
            return false;
        }

        if (!priceFromModal || isNaN(priceFromModal) || toMoney(priceFromModal) < 0) {
            alert("Please enter a valid price.");
            return false;
        }

        const qty = toMoney(qtyToSell);
        const unitPrice = toMoney(priceFromModal);
        
        let sourceName = "Farmstand: " + item.name;
        let finalUnitPrice = unitPrice;

        if (isDiscounted) {
            finalUnitPrice = unitPrice / 2;
            sourceName += " (Discounted)";
        }

        const currentQty = toMoney(item.qty);
        const newQty = !isNaN(currentQty) ? (currentQty - qty).toString() : item.qty;
        
        await FarmService.updateInventoryItem(item.id, { qty: newQty });

        const total = finalUnitPrice * qty;
        
        await FarmService.createLedgerItem({
            date: new Date().toISOString(),
            description: sourceName,
            category: item.category || "Plants & Produce",
            amount: total.toFixed(2),
            unitPrice: unitPrice.toFixed(2),
            type: 'income'
        });

        await refreshData();
        showToast(`Sold ${qty} ${item.name}!`);
        return true;
    });
}

async function addInventory() {
    const name = document.getElementById('invName').value;
    const cat = document.getElementById('invCat').value;
    const price = document.getElementById('invPrice').value;
    const qty = document.getElementById('invQty').value;

    if(name && price) { 
        await FarmService.createInventoryItem({ 
            name: name, 
            category: cat,
            price: toMoney(price) || 0,
            qty: toMoney(qty) || 0,
            active: true 
        });
        document.getElementById('invName').value=""; 
        document.getElementById('invCat').value="";
        document.getElementById('invPrice').value = "";
        document.getElementById('invQty').value = "";
        await refreshData();
        showToast("Inventory Added");
    }
}

async function restockInv(index) {
    const item = dataStore.inventory[index];
    if (!item) return;

    const title = `Restock: ${item.name}`;
    const html = `
        <div>
            <label for="restockQty" class="text-sm font-bold text-gray-600 dark:text-gray-400">Quantity to Add</label>
            <input type="number" id="restockQty" value="1" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 mt-1">
        </div>
    `;

    showModal(title, html, async () => {
        const qtyToAdd = toMoney(document.getElementById('restockQty').value);
        if (isNaN(qtyToAdd) || qtyToAdd <= 0) {
            alert("Please enter a valid positive number to restock.");
            return false;
        }

        const currentQty = toMoney(item.qty) || 0;
        const newQty = (currentQty + qtyToAdd).toString();
        
        await FarmService.updateInventoryItem(item.id, { qty: newQty });
        await refreshData();
        showToast(`🔄 ${item.name} restocked by ${qtyToAdd}!`);
        return true;
    });
}

async function updateInv(index, field, value) { 
    const item = dataStore.inventory[index];
    if (!item) return;
    const payloadValue = (field === 'price') ? toMoney(value) : value;
    await FarmService.updateInventoryItem(item.id, { [field]: payloadValue });
    await refreshData();
    showToast("💾 Inventory updated & synced!");
}

async function removeInv(id) { 
    if(confirm("Delete item?")) {
        await FarmService.deleteInventoryItem(id);
        await refreshData();
    }
}

export function initInventory(config) {
    FarmService.init(config.pb);
    dataStore = config.dataStore;
    showModal = config.showModal;
    refreshData = config.refreshData;

    window.restockInv = restockInv;
    window.updateInv = updateInv;
    window.removeInv = removeInv;
    
    document.getElementById('toggleAddInvBtn')?.addEventListener('click', () => {
        document.getElementById('invAddContainer').classList.toggle('hidden');
    });

    document.getElementById('addInventoryBtn')?.addEventListener('click', addInventory);

    return renderInventory;
}
