// js/admin/yearlyledger.js
import { toMoney } from './utils.js';
import { FarmService } from '../services.js';

let dataStore;
let showModal;
let refreshData;

function renderYearlyLedger() {
    console.log("Rendering Yearly Ledger...");

    const year = new Date().getFullYear(); // Current year
    const activeLedgerMonth = dataStore.farm_status.active_ledger_month || '';
    const currentYearArchives = dataStore.ledger_history.filter(archive => archive.full_month.includes(year.toString()));
    
    // Combine current active ledger items with archived items for YTD calculations
    const allLedgerItems = [
        ...(dataStore.ledger.items || []), // Current month expenses
        ...(dataStore.ledger.income || []), // Current month income
        ...(currentYearArchives.flatMap(archive => JSON.parse(archive.expenses_json || '[]'))),
        ...(currentYearArchives.flatMap(archive => JSON.parse(archive.income_json || '[]')))
    ];
    
    const allExpenses = allLedgerItems.filter(item => item.type === 'expense');
    const allIncome = allLedgerItems.filter(item => item.type === 'income');

    // Calculate YTD totals
    let ytdIncome = allIncome.reduce((sum, item) => sum + toMoney(item.amount), 0);
    let ytdExpenses = allExpenses.reduce((sum, item) => sum + toMoney(item.amount), 0);

    // Add system income from current month's farm_status for YTD income
    const currentMonthDonations = toMoney(dataStore.farm_status.donations);
    const monthlyGoal = (dataStore.goals || []).find(g => !g.is_long_term && g.name.includes("Monthly Feed")) || {};
    const monthlyBreakdown = monthlyGoal.breakdown || {};
    const currentMonthKofi = toMoney(monthlyBreakdown.kofi);
    const currentMonthMerch = toMoney(monthlyBreakdown.merch);

    ytdIncome += currentMonthDonations + currentMonthKofi + currentMonthMerch;

    const ytdProfit = ytdIncome - ytdExpenses;
    const ytdDiscounts = 0; // Currently no YTD discounts tracked in the dataStore

    // Calculate total asset value
    const totalAssetValue = (dataStore.assets || []).reduce((sum, asset) => sum + toMoney(asset.value), 0);

    // Update YTD summary displays
    document.getElementById('ytdIncome').innerText = `$${ytdIncome.toFixed(2)}`;
    document.getElementById('ytdExpenses').innerText = `$${ytdExpenses.toFixed(2)}`;
    document.getElementById('ytdProfit').innerText = `$${ytdProfit.toFixed(2)}`;
    document.getElementById('ytdDiscounts').innerText = `$${ytdDiscounts.toFixed(2)}`;
    document.getElementById('ytdAssets').innerText = `$${totalAssetValue.toFixed(2)}`;

    // Populate Year-to-Date Expenses table
    const ytdExpenseTableBody = document.getElementById('ytdExpenseTableBody');
    ytdExpenseTableBody.innerHTML = '';
    const sortedExpenses = allExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedExpenses.forEach(item => {
        const month = new Date(item.date).toLocaleString('default', { month: 'short' });
        const row = `
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td class="p-1">${month}</td>
                <td class="p-1">${item.description || ''}</td>
                <td class="p-1">${item.category || ''}</td>
                <td class="p-1 text-right text-red-600 font-mono">-$${toMoney(item.amount).toFixed(2)}</td>
            </tr>
        `;
        ytdExpenseTableBody.insertAdjacentHTML('beforeend', row);
    });

    // Populate Year-to-Date Income table
    const ytdIncomeTableBody = document.getElementById('ytdIncomeTableBody');
    ytdIncomeTableBody.innerHTML = '';
    const sortedIncome = allIncome.sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedIncome.forEach(item => {
        const month = new Date(item.date).toLocaleString('default', { month: 'short' });
        const row = `
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td class="p-1">${month}</td>
                <td class="p-1">${item.description || ''}</td>
                <td class="p-1">${item.category || ''}</td>
                <td class="p-1 text-right text-green-600 font-mono">$${toMoney(item.amount).toFixed(2)}</td>
            </tr>
        `;
        ytdIncomeTableBody.insertAdjacentHTML('beforeend', row);
    });

    // Handle system income items in YTD income table (donations, kofi, merch)
    if (currentMonthDonations > 0) {
        const row = `
            <tr class="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-800 transition">
                <td class="p-1">${new Date().toLocaleString('default', { month: 'short' })}</td>
                <td class="p-1 font-bold">Donations</td>
                <td class="p-1">System</td>
                <td class="p-1 text-right text-purple-600 font-mono">$${currentMonthDonations.toFixed(2)}</td>
            </tr>
        `;
        ytdIncomeTableBody.insertAdjacentHTML('beforeend', row);
    }
    if (currentMonthKofi > 0) {
        const row = `
            <tr class="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800 transition">
                <td class="p-1">${new Date().toLocaleString('default', { month: 'short' })}</td>
                <td class="p-1 font-bold">Ko-fi Income</td>
                <td class="p-1">System</td>
                <td class="p-1 text-right text-blue-600 font-mono">$${currentMonthKofi.toFixed(2)}</td>
            </tr>
        `;
        ytdIncomeTableBody.insertAdjacentHTML('beforeend', row);
    }
    if (currentMonthMerch > 0) {
        const row = `
            <tr class="bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-800 transition">
                <td class="p-1">${new Date().toLocaleString('default', { month: 'short' })}</td>
                <td class="p-1 font-bold">Merch Income</td>
                <td class="p-1">System</td>
                <td class="p-1 text-right text-yellow-600 font-mono">$${currentMonthMerch.toFixed(2)}</td>
            </tr>
        `;
        ytdIncomeTableBody.insertAdjacentHTML('beforeend', row);
    }


    // Populate Capital Assets table
    const assetTableBody = document.getElementById('assetTableBody');
    assetTableBody.innerHTML = '';
    (dataStore.assets || []).forEach(asset => {
        const row = `
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td class="p-1"><input type="text" value="${asset.name || ''}" onchange="updateAsset('${asset.id}', 'name', this.value)" class="w-full border-b border-transparent hover:border-gray-300 focus:border-amber-500 bg-transparent outline-none dark:text-gray-200"></td>
                <td class="p-1"><input type="text" value="${asset.notes || ''}" onchange="updateAsset('${asset.id}', 'notes', this.value)" class="w-full border-b border-transparent hover:border-gray-300 focus:border-amber-500 bg-transparent outline-none dark:text-gray-200"></td>
                <td class="p-1"><input type="number" step="0.01" value="${toMoney(asset.value).toFixed(2)}" onchange="updateAsset('${asset.id}', 'value', this.value)" class="w-full border-b border-transparent hover:border-gray-300 focus:border-amber-500 bg-transparent outline-none dark:text-gray-200 text-right font-mono"></td>
                <td class="p-1 text-center"><button onclick="removeAsset('${asset.id}')" class="text-gray-400 hover:text-red-500 font-bold">×</button></td>
            </tr>
        `;
        assetTableBody.insertAdjacentHTML('beforeend', row);
    });

    // Setup event listeners for buttons
    document.getElementById('addAssetRowBtn')?.addEventListener('click', addAsset);
    document.getElementById('downloadAssetsCsvBtn')?.addEventListener('click', downloadAssetsCsv);
    document.getElementById('archiveYearBtn')?.addEventListener('click', () => {
        showModal(
            "Archive Entire Year?",
            `<p>This will archive all monthly ledger data for ${year}, calculate final YTD profit/loss, and clear the current year's ledger history and assets. This action cannot be undone.</p><p class="font-bold text-red-500 mt-2">Proceed only at year-end or if you're sure!</p>`,
            () => archiveYear(year)
        );
    });
}

async function updateAsset(id, field, value) {
    if (!id) return;
    const asset = dataStore.assets.find(a => a.id === id);
    if (!asset) return;

    let payload = { [field]: value };
    if (field === 'value') {
        payload.value = toMoney(value).toFixed(2);
    }
    
    await FarmService.updateAsset(id, payload);
    await refreshData();
}

async function removeAsset(id) {
    if(confirm("Delete this asset? This cannot be undone.")) {
        await FarmService.deleteAsset(id);
        await refreshData();
    }
}

async function addAsset() {
    await FarmService.createAsset({ name: "New Asset", value: 0, notes: "" });
    await refreshData();
}

function downloadAssetsCsv() {
    const fileName = `Farm_Assets_${new Date().getFullYear()}.csv`;
    let csv = "Name,Value,Notes\n";
    const esc = (t) => `"${(t||'').toString().replace(/"/g, '""')}"`;

    (dataStore.assets || []).forEach(asset => {
        csv += `${esc(asset.name)},${esc(toMoney(asset.value).toFixed(2))},${esc(asset.notes)}\n`;
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

async function archiveYear(yearToArchive) {
    showModal(`Archiving ${yearToArchive}`, `<p>Archiving year data...</p>`, () => false); // Disable confirmation during archiving

    try {
        const currentYearArchives = dataStore.ledger_history.filter(archive => archive.full_month.includes(yearToArchive.toString()));
        const allExpenses = currentYearArchives.flatMap(archive => JSON.parse(archive.expenses_json || '[]'));
        const allIncome = currentYearArchives.flatMap(archive => JSON.parse(archive.income_json || '[]'));

        const ytdIncome = allIncome.reduce((sum, item) => sum + toMoney(item.amount), 0);
        const ytdExpenses = allExpenses.reduce((sum, item) => sum + toMoney(item.amount), 0);
        const ytdProfit = ytdIncome - ytdExpenses;

        const archivePayload = {
            year: yearToArchive,
            total_income: ytdIncome.toFixed(2),
            total_expenses: ytdExpenses.toFixed(2),
            profit_loss: ytdProfit.toFixed(2),
            archived_date: new Date().toISOString()
        };

        await FarmService.archiveYear(archivePayload); // This will create a new 'yearly_archives' record

        // Clear current year's monthly archives and assets
        await Promise.all(currentYearArchives.map(archive => FarmService.deleteMonthlyArchive(archive.id)));
        await Promise.all(dataStore.assets.map(asset => FarmService.deleteAsset(asset.id)));

        showToast(`✅ Year ${yearToArchive} Archived Successfully!`);
        await refreshData(); // Re-fetch all data to update the UI
    } catch (error) {
        console.error("Failed to archive year:", error);
        showToast("🚫 Failed to archive year.", "error");
    } finally {
        // Re-enable confirmation logic (or just hide modal, as refreshData will re-render everything)
        // For now, refreshData will handle re-rendering and closing any modals.
    }
}


export function initYearlyLedger(config) {
    FarmService.init(config.pb);
    dataStore = config.dataStore;
    showModal = config.showModal;
    refreshData = config.refreshData;

    window.updateAsset = updateAsset;
    window.removeAsset = removeAsset;

    return renderYearlyLedger;
}
