// js/admin/main.js

import { FarmService } from '../services.js';
import { initInventory } from './inventory.js';
import { initLedger } from './ledger.js';
import { initSidebar } from './sidebar.js';
import { initWidgets } from './widgets.js';
import { toMoney, parseMoney, showToast } from './utils.js';
import { initYearlyLedger } from './yearlyledger.js';

// Central data store for the application state
let dataStore = {
    inventory: [],
    ledger: [],
    notes: [],
    goals: [],
    farm_status: {},
    subscribers: [],
    ledger_history: [],
    assets: [],
};

// --- MODAL UTILITY ---
const modal = document.getElementById('appModal');
let modalConfirmCallback = null;

function hideModal() {
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    modalConfirmCallback = null;
}

function showModal(title, contentHTML, onConfirm) {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    if (!modal || !modalTitle || !modalContent) {
        console.error('Modal elements not found in the DOM.');
        return;
    }

    modalTitle.textContent = title;
    modalContent.innerHTML = contentHTML;
    modalConfirmCallback = onConfirm;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// --- RENDERER STATE ---
const renderers = {};

// --- UTILITIES ---
const loadingOverlay = document.getElementById('loadingOverlay');
const showLoader = (message = '🔄 Syncing Farm Data...') => {
    if (loadingOverlay) {
        loadingOverlay.querySelector('div').textContent = message;
        loadingOverlay.classList.remove('hidden');
        loadingOverlay.classList.add('flex');
    }
};
const hideLoader = () => {
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        loadingOverlay.classList.remove('flex');
    }
};

/**
 * Fetches all necessary data from the backend using FarmService and populates the central dataStore.
 */
async function refreshData() {
    const renderAll = () => {
        console.log("Re-rendering all components with fresh data...");
        Object.values(renderers).forEach(r => r && r());
    };
    showLoader();
    try {
        // Fetch all collections in parallel for performance using the FarmService
        const [
            inventory,
            ledger,
            notes,
            goals,
            farm_status,
            subscribers,
            ledger_history,
            assets,
        ] = await Promise.all([
            FarmService.getInventory(),
            FarmService.getLedger(),
            FarmService.getNotes(),
            FarmService.getGoals(),
            FarmService.getFarmStatus(),
            FarmService.getSubscribers(),
            FarmService.getMonthlyArchives(),
            FarmService.getAssets(),
        ]);

        // Populate the central data store
        dataStore.inventory = inventory;
        
        const ledgerItems = ledger || [];
        dataStore.ledger = {
            items: ledgerItems.filter(i => i.type === 'expense'),
            income: ledgerItems.filter(i => i.type === 'income'),
            // Other properties expected by ledger.js are populated from farm_status
            month: farm_status.active_ledger_month,
            notes: farm_status.ledger_notes,
            systemIncome: {
                donations: farm_status.donations || 0
            }
        };


        dataStore.notes = notes;
        dataStore.goals = goals.map(g => ({
            ...g, // Copy all original fields
            breakdown: {
                kofi: g.breakdown_kofi || 0,
                cash: g.breakdown_cash || 0,
                merch: g.breakdown_merch || 0
            }
        }));
        dataStore.farm_status = farm_status || {}; // Ensure farm_status is an object
        dataStore.subscribers = subscribers;
        dataStore.ledger_history = ledger_history;
        dataStore.assets = assets;

    } catch (error) {
        console.error("Failed to refresh farm data:", error);
        alert("Could not sync with the farm database. Please check your connection and try again.");
    } finally {
        hideLoader();
        renderAll();
    }
}


/**
 * Main application entry point.
 */
export async function main() {
    // The pb instance is now managed by FarmService, but modules might still need direct access.
    const pb = FarmService.pb;

    // Set up modal button listeners once.
    document.getElementById('modalCancel')?.addEventListener('click', hideModal);
    document.getElementById('modalConfirm')?.addEventListener('click', async () => {
        if (modalConfirmCallback && (await modalConfirmCallback()) !== false) {
            hideModal();
        } else if (!modalConfirmCallback) {
            hideModal();
        }
    });

    initSidebar(document.getElementById('sidebar-container'), 'admin.html', pb);

    const CATEGORIES = ['Feed', 'Seeds/Plants', 'Vet/Meds', 'Supplies', 'Repairs', 'Utilities', 'Equipment', 'Marketing', 'Loss/Waste', 'Other'];
    const NOTE_COLORS = {
        "Gray": "bg-gray-500",
        "Red": "bg-red-500",
        "Orange": "bg-orange-500",
        "Yellow": "bg-yellow-500",
        "Green": "bg-green-500",
        "Teal": "bg-teal-500",
        "Blue": "bg-blue-500",
        "Indigo": "bg-indigo-500",
        "Purple": "bg-purple-500",
        "Pink": "bg-pink-500",
    };

    // The dependencies object is passed to each module.
    const dependencies = {
        pb,
        dataStore,
        refreshData,
        showModal,
        showToast,
        imageCompression,
        renderMonthlyGoal: () => renderers.monthlyGoal?.(),
        renderLongTermGoal: () => renderers.longTermGoal?.(),
        renderInsights: () => renderers.insights?.(),
        renderYearlyLedger: () => renderers.yearlyLedger?.(),
        CATEGORIES,
        NOTE_COLORS,
        toMoney,
        parseMoney,
        FarmService,
    };

    // Initialize all modules and store their render functions
    const widgetRenders = initWidgets(dependencies);
    renderers.monthlyGoal = widgetRenders.renderMonthlyGoal;
    renderers.longTermGoal = widgetRenders.renderLongTermGoal;
    renderers.inventory = initInventory(dependencies);
    renderers.ledger = initLedger(dependencies);

    Object.assign(renderers, widgetRenders);

    // Initialize yearly ledger and assign its renderer
    renderers.yearlyLedger = initYearlyLedger(dependencies);

    await refreshData(); // Initial fetch and render.

    console.log("FarmOS Admin Initialized Successfully with data:", dataStore);

    // Test Mode Toggle functionality - this was moved to widgets.js
    // Event Listeners for Game Admin Tools
    // These listeners are now handled within initWidgets,
    // so we don't need to re-attach them here.
}