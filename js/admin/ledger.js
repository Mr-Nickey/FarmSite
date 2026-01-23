// c:/Users/nreed/OneDrive/Desktop/FarmSite/js/admin/ledger.js
import { toMoney, showToast } from './utils.js';
import { FarmService } from '../services.js';

let dataStore;
let refreshData;
let renderMonthlyGoal;
let renderLongTermGoal;
let renderInsights;
let renderYearlyLedger;

const CATEGORIES = ['Feed', 'Seeds/Plants', 'Vet/Meds', 'Supplies', 'Repairs', 'Utilities', 'Equipment', 'Marketing', 'Loss/Waste', 'Other', 'Refunds'];
const INCOME_CATEGORIES = ['Farm Fresh Eggs', 'Plants & Produce', 'Meat/Livestock', 'Baked Goods', 'Arts & Crafts', 'Merch', 'Donations', 'Other'];

function updateTotalsDisplay() {
    let totalExpenses = 0;
    (dataStore.ledger.items || []).forEach(i => {
        totalExpenses += toMoney(i.amount);
    });

    let totalManualIncome = 0;
    (dataStore.ledger.income || []).forEach(i => {
        totalManualIncome += toMoney(i.amount);
    });

    const donations = toMoney((dataStore.ledger.systemIncome || {}).donations);
    const monthlyGoal = (dataStore.goals || []).find(g => !g.is_long_term) || {};
    const monthlyBreakdown = monthlyGoal.breakdown || {};
    const kofiIncome = toMoney(monthlyBreakdown.kofi);
    const merchIncome = toMoney(monthlyBreakdown.merch);

    const grandTotalIncome = totalManualIncome + donations + kofiIncome + merchIncome;

    document.getElementById('dispExpense').innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('dispIncome').innerText = `$${grandTotalIncome.toFixed(2)}`;
    document.getElementById('footerExpTotal').innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('footerIncTotal').innerText = `$${totalManualIncome.toFixed(2)}`;
    
    const profit = grandTotalIncome - totalExpenses;
    const tax = profit > 0 ? profit * 0.30 : 0;
    
    const taxEl = document.getElementById('dispTax');
    taxEl.innerText = `$${tax.toFixed(2)}`;
    taxEl.className = profit > 0 ? "text-lg font-bold text-red-600 leading-none" : "text-lg font-bold text-green-600 leading-none";

    const profitEl = document.getElementById('dispProfit');
    if (profitEl) {
        profitEl.innerText = profit < 0 ? `-$${Math.abs(profit).toFixed(2)}` : `$${profit.toFixed(2)}`;
        profitEl.className = profit < 0 ? "text-lg font-bold text-red-600 leading-none" : "text-lg font-bold text-green-600 leading-none";
    }
    
    if (document.getElementById('dispDiscounts')) {
        document.getElementById('dispDiscounts').innerText = `$0.00`;
    }

    renderMonthlyGoal();
    renderLongTermGoal();
    renderInsights();
    renderYearlyLedger();
}

function renderLedger() {
    const fullMonth = dataStore.ledger.month || "";
    const parts = fullMonth.split(" ");
    if (parts.length >= 2) {
        document.getElementById('ledgerMonthSelect').value = parts[0];
        document.getElementById('ledgerYear').value = parts[1];
    } else {
        const d = new Date();
        document.getElementById('ledgerMonthSelect').value = d.toLocaleString('default', { month: 'short' });
        document.getElementById('ledgerYear').value = d.getFullYear();
    }
    
    document.getElementById('ledgerNotes').value = dataStore.ledger.notes || "";
    
    const expBody = document.getElementById('expenseTableBody');
    expBody.innerHTML = (dataStore.ledger.items || []).map((item) => {
        const qty = toMoney(item.qty) || 1;
        let unitPrice = toMoney(item.unitPrice);
        if (unitPrice === 0 && toMoney(item.amount) > 0 && qty > 0) {
            unitPrice = toMoney(item.amount) / qty;
        }
        const totalCost = qty * unitPrice;
        
        return `
        <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <td class="p-1"><input type="date" value="${(item.date||'').split(' ')[0]}" onchange="updateLedgerItem('${item.id}', 'date', this.value, 'expense')" class="w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent outline-none dark:text-gray-200 text-xs"></td>
            <td class="p-1"><input type="text" value="${item.description||''}" onchange="updateLedgerItem('${item.id}', 'description', this.value, 'expense')" class="w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent outline-none dark:text-gray-200" placeholder="Item Name"></td>
            <td class="p-1">
                <select onchange="updateLedgerItem('${item.id}', 'category', this.value, 'expense')" class="w-full bg-transparent text-xs border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none dark:text-gray-300">
                    <option value="">-- Select --</option>
                    ${CATEGORIES.map(c => `<option value="${c}" ${item.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </td>
            <td class="p-1"><input type="text" value="${item.weight||''}" onchange="updateLedgerItem('${item.id}', 'weight', this.value, 'expense')" class="w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent outline-none dark:text-gray-200 text-center" placeholder="--"></td>
            <td class="p-1"><input type="number" value="${qty}" onchange="updateLedgerItem('${item.id}', 'qty', this.value, 'expense')" class="w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent outline-none dark:text-gray-200 text-center"></td>
            <td class="p-1"><input type="number" step="0.01" value="${unitPrice ? unitPrice.toFixed(2) : ''}" onchange="updateLedgerItem('${item.id}', 'unitPrice', this.value, 'expense')" class="w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent outline-none dark:text-gray-200 font-mono text-right" placeholder="0.00"></td>
            <td class="p-1"><input type="text" value="$${totalCost.toFixed(2)}" readonly class="w-full bg-gray-100 dark:bg-gray-700/50 border-none bg-transparent outline-none dark:text-gray-400 font-mono text-right font-bold text-red-600 cursor-default" tabindex="-1"></td>
            <td class="p-1 text-center"><button onclick="removeLedgerItem('${item.id}')" class="text-gray-400 hover:text-red-500 font-bold">×</button></td>
        </tr>`;
    }).join('');

    const incBody = document.getElementById('incomeTableBody');
    
    const manualRowsHtml = (dataStore.ledger.income || []).map((item) => {
        const totalAmount = toMoney(item.amount).toFixed(2);
        return `
        <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <td class="p-1"><input type="date" value="${(item.date||'').split(' ')[0]}" onchange="updateLedgerItem('${item.id}', 'date', this.value, 'income')" class="w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent outline-none dark:text-gray-200 text-xs"></td>
            <td class="p-1"><input type="text" value="${item.description||''}" onchange="updateLedgerItem('${item.id}', 'description', this.value, 'income')" class="w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent outline-none dark:text-gray-200" placeholder="Source"></td>
            <td class="p-1">
                <select onchange="updateLedgerItem('${item.id}', 'category', this.value, 'income')" class="w-full bg-transparent text-xs border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none dark:text-gray-300">
                    <option value="">-- Select --</option>
                    ${INCOME_CATEGORIES.map(c => `<option value="${c}" ${item.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </td>
            <td class="p-1"><input type="number" step="0.01" value="${toMoney(item.unitPrice) || ''}" onchange="updateLedgerItem('${item.id}', 'unitPrice', this.value, 'income')" class="w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent outline-none dark:text-gray-200 font-mono text-right" placeholder="0.00"></td>
            <td class="p-1"><input type="number" value="${item.qty||'1'}" onchange="updateLedgerItem('${item.id}', 'qty', this.value, 'income')" class="w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent outline-none dark:text-gray-200 font-mono text-center"></td>
            <td class="p-1"><input type="text" value="$${totalAmount}" readonly class="w-full bg-transparent outline-none dark:text-gray-400 font-mono text-right font-bold text-green-600 cursor-default" tabindex="-1"></td>
            <td class="p-1 text-center"><button onclick="removeLedgerItem('${item.id}')" class="text-gray-400 hover:text-red-500 font-bold">×</button></td>
        </tr>`;
    }).join('');

    const sys = dataStore.ledger.systemIncome || { donations: 0 };
    let displayDonations = sys.donations;
    if (displayDonations && !displayDonations.toString().includes('$') && !isNaN(toMoney(displayDonations))) {
        displayDonations = '$' + toMoney(displayDonations).toFixed(2);
    }

    const monthlyGoal = (dataStore.goals || []).find(g => !g.is_long_term) || {};
    const monthlyBreakdown = monthlyGoal.breakdown || {};
    const kofiIncome = toMoney(monthlyBreakdown.kofi);
    const merchIncome = toMoney(monthlyBreakdown.merch);

    const systemRows = `
        <tr class="bg-purple-50 dark:bg-purple-900/20 border-b-2 border-purple-200 dark:border-purple-800">
            <td class="p-1"></td>
            <td class="p-1 pl-2 font-bold text-purple-800 dark:text-purple-300">❤️ Donations / Tips</td>
            <td class="p-1"></td><td class="p-1 text-center text-gray-400">-</td><td class="p-1 text-center text-gray-400">-</td>
            <td class="p-1"><input type="text" value="${displayDonations}" onchange="updateSystemDonation(this.value)" class="w-full bg-transparent outline-none font-mono text-right font-bold text-purple-600 dark:text-purple-300" placeholder="$0.00"></td>
            <td class="p-1"></td>
        </tr>
        <tr class="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800">
            <td class="p-1"></td>
            <td class="p-1 pl-2 font-bold text-blue-800 dark:text-blue-300">🏆 Total Stripe Income <span class="cursor-help" title="This row is READ-ONLY. It automatically pulls the total from your Goal Cards below.">❓</span></td>
            <td class="p-1"></td><td class="p-1 text-center text-gray-400">-</td><td class="p-1 text-center text-gray-400">-</td>
            <td class="p-1 text-right font-mono font-bold text-blue-600 dark:text-blue-300">$${kofiIncome.toFixed(2)}</td>
            <td class="p-1"></td>
        </tr>
        <tr class="bg-yellow-50 dark:bg-yellow-900/20 border-b-4 border-double border-gray-300 dark:border-gray-600">
            <td class="p-1"></td>
            <td class="p-1 pl-2 font-bold text-yellow-800 dark:text-yellow-300">👕 Total Merch Income <span class="cursor-help" title="This row is READ-ONLY. It automatically pulls the total from your Goal Cards below.">❓</span></td>
            <td class="p-1"></td><td class="p-1 text-center text-gray-400">-</td><td class="p-1 text-center text-gray-400">-</td>
            <td class="p-1 text-right font-mono font-bold text-yellow-600 dark:text-yellow-300">$${merchIncome.toFixed(2)}</td>
            <td class="p-1"></td>
        </tr>
    `;
    incBody.innerHTML = systemRows + manualRowsHtml;

    updateTotalsDisplay();
}

async function updateLedgerItem(id, field, value, type) {
    if (!id) return;
    const isIncome = type === 'income';
    const items = isIncome ? dataStore.ledger.income : dataStore.ledger.items;
    const item = items.find(i => i.id === id);
    if (!item) return;
    let payload = {};
    if (field === 'description') {
        payload.description = value;
    } else if (field === 'date' || field === 'category' || field === 'weight') {
        payload[field] = value;
    } 
    else if (field === 'qty' || field === 'unitPrice') { 
        const newVal = Math.abs(toMoney(value));
        let currentQty = Math.abs(toMoney(item.qty)) || 1; 
        let currentPrice = Math.abs(toMoney(item.unitPrice)) || 0;
        if (field === 'qty') {
            currentQty = newVal;
            payload.qty = currentQty;
        } else {
            currentPrice = newVal;
            payload.unitPrice = currentPrice;
        }
        payload.amount = (currentQty * currentPrice).toFixed(2);
    }
    await FarmService.updateLedgerItem(id, payload);
    await refreshData();
    showToast("💾 Saved & Calculated!");
}

async function addExpenseRow() { 
    await FarmService.createLedgerItem({ date: new Date().toISOString().split('T')[0], type: 'expense', description: "", category: "", amount: 0 });
    await refreshData();
}

async function addIncomeRow() { 
    await FarmService.createLedgerItem({ date: new Date().toISOString().split('T')[0], type: 'income', description: "", category: "", amount: 0, unitPrice: 0, qty: 1 });
    await refreshData();
}

async function saveLedger() {
    const notes = document.getElementById('ledgerNotes').value;
    await FarmService.updateFarmStatus(dataStore.farmStatusId, { ledger_notes: notes });
    await refreshData();
    showToast("📒 Ledger & Goals Synced!");
}

function downloadCSV() {
    const monthStr = dataStore.ledger.month || "Unknown_Month";
    const fileName = `Farm_Ledger_${monthStr.replace(/ /g, '_')}.csv`;
    
    let csv = "Date,Type,Category,Description,Amount,Notes\n";
    const esc = (t) => `"${(t||'').toString().replace(/"/g, '""')}"`;

    dataStore.ledger.items.forEach(item => {
        const date = item.date || monthStr;
        const desc = item.description || '';
        const amt = -Math.abs(toMoney(item.amount) || 0);
        csv += `${esc(date)},EXPENSE,${esc(item.category)},${esc(desc)},${amt.toFixed(2)},${esc("")}\n`;
    });

    dataStore.ledger.income.forEach(item => {
        const date = item.date || monthStr;
        const desc = item.description || '';
        const amt = Math.abs(toMoney(item.amount) || 0);
        csv += `${esc(date)},INCOME,${esc(item.category)},${esc(desc)},${amt.toFixed(2)},${esc("")}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

async function removeLedgerItem(id) {
    if(confirm("Delete this row?")) {
        await FarmService.deleteLedgerItem(id);
        await refreshData();
        showToast("🗑️ Item Deleted");
    }
}

export function initLedger(config) {
    FarmService.init(config.pb);
    dataStore = config.dataStore;
    refreshData = config.refreshData;
    renderMonthlyGoal = config.renderMonthlyGoal;
    renderLongTermGoal = config.renderLongTermGoal;
    renderInsights = config.renderInsights;
    renderYearlyLedger = config.renderYearlyLedger;

    document.getElementById('addExpenseRowBtn')?.addEventListener('click', addExpenseRow);
    document.getElementById('addIncomeRowBtn')?.addEventListener('click', addIncomeRow);
    document.getElementById('saveLedgerBtn')?.addEventListener('click', saveLedger);
    document.getElementById('downloadLedgerCsvBtn')?.addEventListener('click', downloadCSV);
    document.getElementById('printLedgerBtn')?.addEventListener('click', () => window.print());

    window.updateLedgerItem = updateLedgerItem;
    window.addExpenseRow = addExpenseRow;
    window.addIncomeRow = addIncomeRow;
    window.saveLedger = saveLedger;
    window.downloadCSV = downloadCSV;
    window.removeLedgerItem = removeLedgerItem;
    window.updateTotalsDisplay = updateTotalsDisplay;

    return renderLedger;
}
