// js/admin/widgets.js

let pb;
let dataStore;
let refreshData;
let showModal;
let showToast;
let toMoney;
let parseMoney;
let CATEGORIES;
let NOTE_COLORS;
let imageCompression;

let recognitionInstance = null;

// --- SHOPPING LIST LOGIC ---
function renderShoppingList() {
    const list = document.getElementById('shoppingListUl');
    const totalDisplay = document.getElementById('shoppingListTotal');

    if (!list) return;

    list.innerHTML = "";
    if (!dataStore.shopping_list) dataStore.shopping_list = [];
    
    // Filter for active items only
    const activeItems = dataStore.shopping_list.filter(item => item.active !== false);

    let totalEst = 0;

    activeItems.forEach((item) => {
        const itemPrice = parseFloat(item.est_cost) || 0;
        const itemQty = parseFloat(item.qty) || 1;
        totalEst += itemPrice * itemQty;
        const publicBadge = item.is_public ? '<span class="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">Public</span>' : '';

        list.innerHTML += `
            <li class="flex flex-wrap justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-2 rounded border dark:border-gray-600 gap-2">
                <div class="flex items-center gap-3">
                    ${item.image ? `<img src="${pb.files.getUrl(item, item.image, {thumb: '50x50'})}" class="w-10 h-10 rounded object-cover border dark:border-gray-500">` : '<div class="w-10 h-10 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs">📷</div>'}
                    <div class="flex flex-col text-xs">
                        <span class="font-bold dark:text-gray-200 text-sm flex items-center">${item.name} ${publicBadge}</span>
                        <span class="text-gray-500 dark:text-gray-400">${item.category||'Uncat'} | ${item.weight||'-'} | Qty: ${itemQty}</span>
                        ${item.stripe_link ? '<span class="text-green-600 dark:text-green-400 font-bold text-[10px]">💳 Stripe Linked</span>' : ''}
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <span class="font-mono font-bold text-teal-600 dark:text-teal-400">~$${itemPrice.toFixed(2)} ea</span>
                    <div class="flex gap-2">
                        <button onclick="editShoppingItem('${item.id}')" class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded hover:bg-blue-700 transition active:scale-95">✏️</button>
                        <button onclick="markFunded('${item.id}')" class="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded hover:bg-green-700 transition active:scale-95">💰 FUNDED</button>
                        <button onclick="removeShopItem('${item.id}')" class="text-red-400 hover:text-red-600 font-bold px-2">×</button>
                    </div>
                </div>
            </li>`;
    });

    if (totalDisplay) {
        totalDisplay.textContent = `Total Est: $${totalEst.toFixed(2)}`;
    }
}

function showAddShoppingItemModal() {
    const title = "Add Wishlist Item";
    const catOptions = CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('');
    
    const html = `
        <div class="space-y-4">
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Item Name</label>
                <input type="text" id="modalShopName" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="e.g. Layer Feed">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Category</label>
                    <select id="modalShopCat" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                        <option value="">-- Select --</option>
                        ${catOptions}
                    </select>
                </div>
                <div>
                    <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Weight/Size</label>
                    <input type="text" id="modalShopWeight" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="e.g. 50lb">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Quantity</label>
                    <input type="number" id="modalShopQty" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="1">
                </div>
                <div>
                    <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Est. Cost ($)</label>
                    <input type="number" id="modalShopEst" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="0.00">
                </div>
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Stripe Payment Link</label>
                <input type="url" id="modalShopLink" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="https://buy.stripe.com/...">
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Image</label>
                <input type="file" id="modalShopImage" accept="image/*" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
            </div>
            <div class="flex items-center gap-2 pt-2">
                <input type="checkbox" id="modalShopPublic" class="w-5 h-5 accent-teal-600" checked>
                <label for="modalShopPublic" class="text-sm font-bold text-gray-700 dark:text-gray-300">Public Wishlist? (Show on Donate Page)</label>
            </div>
        </div>
    `;

    showModal(title, html, async () => {
        const name = document.getElementById('modalShopName').value;
        if (!name) { alert("Item name is required."); return false; }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', document.getElementById('modalShopCat').value);
        formData.append('weight', document.getElementById('modalShopWeight').value);
        formData.append('qty', parseFloat(document.getElementById('modalShopQty').value) || 1);
        formData.append('est_cost', parseFloat(document.getElementById('modalShopEst').value) || 0);
        formData.append('stripe_link', document.getElementById('modalShopLink').value);
        formData.append('is_public', document.getElementById('modalShopPublic').checked);
        formData.append('active', true);

        const fileInput = document.getElementById('modalShopImage');
        if (fileInput.files.length > 0) {
            try {
                const compressedFile = await imageCompression(fileInput.files[0], { maxSizeMB: 0.5, maxWidthOrHeight: 1024 });
                formData.append('image', compressedFile);
            } catch (e) { console.error("Compression failed", e); formData.append('image', fileInput.files[0]); }
        }

        await pb.collection('shopping_list').create(formData);
        await refreshData();
        showToast("🛒 Added to wishlist!");
        return true;
    });
}

function editShoppingItem(id) {
    const item = dataStore.shopping_list.find(i => i.id === id);
    if (!item) return;

    const title = "Edit Item";
    const catOptions = CATEGORIES.map(c => `<option value="${c}" ${c === item.category ? 'selected' : ''}>${c}</option>`).join('');

    const html = `
        <div class="space-y-4">
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Item Name</label>
                <input type="text" id="modalShopName" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${item.name}">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Category</label>
                    <select id="modalShopCat" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                        <option value="">-- Select --</option>
                        ${catOptions}
                    </select>
                </div>
                <div>
                    <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Weight/Size</label>
                    <input type="text" id="modalShopWeight" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${item.weight || ''}">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Quantity</label>
                    <input type="number" id="modalShopQty" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${item.qty || 1}">
                </div>
                <div>
                    <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Est. Cost ($)</label>
                    <input type="number" id="modalShopEst" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${item.est_cost || 0}">
                </div>
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Stripe Payment Link</label>
                <input type="url" id="modalShopLink" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${item.stripe_link || ''}">
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Change Image</label>
                <input type="file" id="modalShopImage" accept="image/*" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
            </div>
            <div class="flex items-center gap-2 pt-2">
                <input type="checkbox" id="modalShopPublic" class="w-5 h-5 accent-teal-600" ${item.is_public ? 'checked' : ''}>
                <label for="modalShopPublic" class="text-sm font-bold text-gray-700 dark:text-gray-300">Public Wishlist?</label>
            </div>
        </div>
    `;

    showModal(title, html, async () => {
        const name = document.getElementById('modalShopName').value;
        if (!name) { alert("Item name is required."); return false; }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', document.getElementById('modalShopCat').value);
        formData.append('weight', document.getElementById('modalShopWeight').value);
        formData.append('qty', parseFloat(document.getElementById('modalShopQty').value) || 1);
        formData.append('est_cost', parseFloat(document.getElementById('modalShopEst').value) || 0);
        formData.append('stripe_link', document.getElementById('modalShopLink').value);
        formData.append('is_public', document.getElementById('modalShopPublic').checked);

        const fileInput = document.getElementById('modalShopImage');
        if (fileInput.files.length > 0) {
            try {
                const compressedFile = await imageCompression(fileInput.files[0], { maxSizeMB: 0.5, maxWidthOrHeight: 1024 });
                formData.append('image', compressedFile);
            } catch (e) { console.error("Compression failed", e); formData.append('image', fileInput.files[0]); }
        }

        await pb.collection('shopping_list').update(id, formData);
        await refreshData();
        showToast("Item updated!");
        return true;
    });
}

async function clearShoppingList() {
    if(dataStore.shopping_list.length === 0) return;
    if(confirm("Clear the entire shopping list from the database? This cannot be undone.")) {
        const deletePromises = dataStore.shopping_list.map(item => pb.collection('shopping_list').delete(item.id));
        await Promise.all(deletePromises);
        await refreshData();
        showToast("🗑️ Shopping list cleared!");
    }
}

async function removeShopItem(id) {
    if (confirm("Remove this item from the shopping list?")) {
        await pb.collection('shopping_list').delete(id);
        await refreshData();
        showToast("Item removed.");
    }
}

async function markFunded(id) {
    const item = dataStore.shopping_list.find(i => i.id === id);
    if (!item) {
        showToast("❌ Item not found!", true);
        return;
    }
    
    const actualPrice = prompt(`Confirm donation/funding amount received for ${item.name}?`, item.est_cost);
    if (actualPrice !== null && !isNaN(toMoney(actualPrice))) {
        try {
            // 1. Add to Income Ledger (Donation)
            const ledgerPayload = {
                date: new Date().toISOString().split('T')[0],
                description: `Donation for: ${item.name}`,
                category: "Donations", // Wishlist items funded are donations
                amount: toMoney(actualPrice).toFixed(2),
                type: 'income'
            };
            await pb.collection('ledger').create(ledgerPayload);
            
            // 2. Mark item as inactive (removed from list but kept in DB)
            await pb.collection('shopping_list').update(id, { active: false });
            
            await refreshData(); 
            showToast("💰 Donation Recorded & Item Archived!");
        } catch (err) {
            alert("An error occurred while processing the purchase. Check the console for details.");
            console.error("Buy item transaction failed:", err);
        }
    }
}

function viewArchivedShopItems() {
    const archivedItems = dataStore.shopping_list.filter(i => i.active === false);
    
    const title = "Archived / Funded Items";
    let html = `<div class="space-y-2 max-h-[60vh] overflow-y-auto">`;
    
    if (archivedItems.length === 0) {
        html += `<p class="text-center text-gray-500">No archived items found.</p>`;
    } else {
        html += archivedItems.map(item => `
            <div class="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded border dark:border-gray-600">
                <span class="text-sm font-bold dark:text-gray-200">${item.name}</span>
                <button onclick="restoreShopItem('${item.id}')" class="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700">Re-Add</button>
            </div>
        `).join('');
    }
    html += `</div>`;
    
    showModal(title, html);
}

async function restoreShopItem(id) {
    await pb.collection('shopping_list').update(id, { active: true });
    await refreshData();
    // Refresh the modal content if it's still open? 
    // For simplicity, we close modal by refreshing data which triggers re-renders, 
    // but the modal stays open with old content unless we close it.
    // Let's just close the modal to be safe or re-open it.
    // Since refreshData is async and we are inside a modal callback context (sort of),
    // we can just hideModal() manually or let the user close it.
    // Actually, let's close the modal to indicate success.
    document.getElementById('appModal').classList.add('hidden');
    document.getElementById('appModal').classList.remove('flex');
    showToast("Item re-added to wishlist!");
}

// --- NOTES & VOICE ---
function timeAgo(date) {
    const now = new Date();
    const seconds = Math.round((now - new Date(date)) / 1000);

    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${seconds} secs ago`;

    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} mins ago`;

    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} hrs ago`;

    const days = Math.round(hours / 24);
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
}

async function moveNote(index, direction) {
    const noteA = dataStore.notes[index];
    const noteB = direction === 'up' ? dataStore.notes[index-1] : dataStore.notes[index+1];
    
    if(noteA && noteB) {
        await pb.collection('notes').update(noteA.id, { created: noteB.created });
        await pb.collection('notes').update(noteB.id, { created: noteA.created });
    }
    await refreshData();
    showToast("Note moved!");
}

function editNote(index) {
    const note = dataStore.notes[index];
    if (!note) return;

    const title = "Edit Note";
    const colorOptions = Object.entries(NOTE_COLORS).map(([name, value]) => 
        `<option value="${value}" ${note.color === value ? 'selected' : ''}>${name}</option>`
    ).join('');

    const html = `
        <div class="space-y-4">
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Title (Optional)</label>
                <input type="text" id="modalNoteTitle" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${note.title || ''}">
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Note Content</label>
                <textarea id="modalNoteContent" rows="4" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">${note.note}</textarea>
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Note Color</label>
                <select id="modalNoteColor" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                    ${colorOptions}
                </select>
            </div>
        </div>
    `;

    showModal(title, html, async () => {
        const noteTitle = document.getElementById('modalNoteTitle').value;
        const content = document.getElementById('modalNoteContent').value;
        const color = document.getElementById('modalNoteColor').value;
        if (!content.trim()) { alert("Note cannot be empty."); return false; }
        
        await pb.collection('notes').update(note.id, { title: noteTitle, note: content, color: color });
        await refreshData();
        showToast("📝 Note Updated!");
        return true;
    });
}

function quickNote() {
    const title = "Add a New Sticky Note";
    const colorOptions = Object.entries(NOTE_COLORS).map(([name, value]) => 
        `<option value="${value}">${name}</option>`
    ).join('');

    const html = `
        <div class="space-y-4">
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Title (Optional)</label>
                <input type="text" id="modalNoteTitle" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="e.g., Chicken Coop Plan">
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Note Content</label>
                <textarea id="modalNoteContent" rows="4" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="e.g., Remember to check on the new chicks."></textarea>
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Note Color</label>
                <select id="modalNoteColor" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                    ${colorOptions}
                </select>
            </div>
        </div>
    `;
    showModal(title, html, async () => {
        const noteTitle = document.getElementById('modalNoteTitle').value;
        const content = document.getElementById('modalNoteContent').value;
        const color = document.getElementById('modalNoteColor').value;
        if (!content.trim()) { alert("Note cannot be empty."); return false; }
        await pb.collection('notes').create({ title: noteTitle, note: content, color: color || 'bg-gray-700', isPinned: false });
        await refreshData();
        showToast("📝 Note Added!");
        return true;
    });
}

function renderNotes() {
    const list = document.getElementById('notesList');
    if (!list) return;
    if (!Array.isArray(dataStore.notes) || dataStore.notes.length === 0) {
        list.innerHTML = `<li class="text-center text-gray-500 sm:col-span-3">No notes yet.</li>`;
        return;
    }

    const pinnedNotes = [];
    const unpinnedNotes = [];
    dataStore.notes.forEach((note, originalIndex) => {
        const noteWithIndex = { ...note, originalIndex };
        if (note.isPinned) { pinnedNotes.push(noteWithIndex); } 
        else { unpinnedNotes.push(noteWithIndex); }
    });
    const sortedNotes = [...pinnedNotes, ...unpinnedNotes];

    list.innerHTML = sortedNotes.map((note) => {
        const color = note.color || 'bg-gray-700';
        const isPinned = note.isPinned || false;
        const sizeClass = isPinned ? 'col-span-2' : '';
        
        return `
            <li class="${color} ${sizeClass} text-white p-3 shadow-lg rounded-md flex flex-col h-48 justify-between relative">
                <div class="absolute top-1.5 left-1.5 flex gap-1">
                    <button onclick="editNote(${note.originalIndex})" class="text-gray-300 hover:text-white text-lg transition-colors" title="Edit Note">🖊️</button>
                </div>
                <div class="absolute top-1.5 right-1.5 flex gap-1">
                    <button onclick="togglePin(${note.originalIndex})" class="p-1 rounded-md text-gray-300 hover:text-white text-lg transition-all ${isPinned ? 'bg-black/20' : ''}" title="${isPinned ? 'Unpin Note' : 'Pin Note'}">
                        <span class="${isPinned ? 'text-yellow-400' : 'opacity-50'}">📌</span>
                    </button>
                    <button onclick="deleteNote(${note.originalIndex})" class="text-gray-300 hover:text-red-400 font-bold text-lg transition-colors" title="Delete Note">🗑️</button>
                </div>
                
                <div class="flex-grow overflow-y-auto mt-8">
                    ${note.title ? `<h4 class="font-bold text-md mb-2 break-words">${note.title}</h4>` : ''}
                    <p class="text-sm break-words">${note.note.replace(/\n/g, '<br>')}</p>
                </div>
                
                <div class="flex justify-between items-center mt-2">
                    <div class="flex gap-1">
                        <button onclick="moveNote(${note.originalIndex}, 'up')" class="text-gray-400 hover:text-white text-xl font-bold transition-colors ${note.originalIndex === 0 ? 'opacity-20 cursor-not-allowed' : ''}" title="Move Up">‹</button>
                        <button onclick="moveNote(${note.originalIndex}, 'down')" class="text-gray-400 hover:text-white text-xl font-bold transition-colors ${note.originalIndex === dataStore.notes.length - 1 ? 'opacity-20 cursor-not-allowed' : ''}" title="Move Down">›</button>
                    </div>
                    <div class="text-right text-xs text-gray-400/80">
                        ${timeAgo(note.date)}
                    </div>
                </div>
            </li>
        `;
    }).join('');
}

async function togglePin(index) {
    if (!dataStore.notes[index]) return;
    dataStore.notes[index].isPinned = !dataStore.notes[index].isPinned;
    const note = dataStore.notes[index];
    await pb.collection('notes').update(note.id, { isPinned: note.isPinned });
    await refreshData();
    showToast(note.isPinned ? "📌 Note Pinned!" : "Note Unpinned.");
}

async function deleteNote(index) {
    const note = dataStore.notes[index];
    if (!note) return;

    const title = "⚠️ Delete Note?";
    const html = `
        <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <p>Are you sure you want to permanently delete this note?</p>
            <div class="p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded max-h-24 overflow-y-auto">
                ${note.title ? `<p class="font-bold">${note.title}</p>` : ''}
                <p class="text-gray-600 dark:text-gray-400">${note.note.substring(0, 100)}${note.note.length > 100 ? '...' : ''}</p>
            </div>
        </div>
    `;

    showModal(title, html, async () => {
        await pb.collection('notes').delete(note.id);
        await refreshData();
        showToast("Note deleted.");
        return true;
    });
}

function closeVoiceModal(forceStop = false) {
    const modal = document.getElementById('voiceNoteModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    if (forceStop && recognitionInstance) {
        recognitionInstance.abort();
    }
}

function addVoiceNote() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Browser does not support Voice to Text for notes.");
        return;
    }

    const modal = document.getElementById('voiceNoteModal');
    const micButton = document.getElementById('micButton');
    const micAnimation = document.getElementById('micAnimation');
    const voiceStatus = document.getElementById('voiceStatus');

    if (!modal || !micButton || !micAnimation || !voiceStatus) {
        console.error("Voice modal elements not found!");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognitionInstance = recognition;

    let isRecording = false;

    recognition.onstart = () => {
        isRecording = true;
        voiceStatus.innerText = "Listening...";
        micAnimation.classList.remove('hidden');
        micAnimation.classList.add('pulse-ring-animation');
    };

    recognition.onend = () => {
        isRecording = false;
        micAnimation.classList.add('hidden');
        micAnimation.classList.remove('pulse-ring-animation');
        if (!modal.classList.contains('hidden') && voiceStatus.innerText !== "Saving note...") {
            voiceStatus.innerText = "Press and hold the mic to speak.";
        }
        recognitionInstance = null;
    };
    
    recognition.onresult = (event) => {
        voiceStatus.innerText = "Saving note...";
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
            pb.collection('notes').create({ 
                title: "",
                note: transcript, 
                color: 'bg-gray-700',
                isPinned: false
            })
                .then(() => refreshData());
            showToast("📝 Voice note added!");
        } else { showToast("❌ Note was empty."); }
        closeVoiceModal();
    };

    recognition.onerror = (event) => { if (event.error !== 'no-speech' && event.error !== 'aborted') { showToast(`❌ Voice Error: ${event.error}`); } };

    const handlePress = (e) => { e.preventDefault(); if (isRecording) return; try { recognition.start(); } catch(err) { console.error("Rec start error:", err); } };
    const handleRelease = (e) => { e.preventDefault(); if (!isRecording) return; recognition.stop(); };
    
    const newMicButton = micButton.cloneNode(true); micButton.parentNode.replaceChild(newMicButton, micButton);
    newMicButton.addEventListener('mousedown', handlePress); newMicButton.addEventListener('mouseup', handleRelease);
    newMicButton.addEventListener('mouseleave', (e) => { if (isRecording) handleRelease(e); });
    newMicButton.addEventListener('touchstart', handlePress, { passive: false }); newMicButton.addEventListener('touchend', handleRelease);

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// --- EGGS & DONATIONS ---
function renderEggs() {
    const btn = document.getElementById('eggBtn');
    const header = document.getElementById('eggHeader');

    if (!dataStore.farm_status) {
        // Handle case where farm_status is not yet loaded
        btn.textContent = "Loading...";
        btn.className = "w-full py-4 text-2xl font-bold rounded text-white shadow-md bg-gray-500 transition active:scale-95";
        header.className = "bg-gray-500 p-3 text-white font-bold transition-colors duration-300";
        return;
    }

    if (dataStore.farm_status.eggs === "Sold Out") {
        btn.textContent = "❌ SOLD OUT";
        btn.className = "w-full py-4 text-2xl font-bold rounded text-white shadow-md bg-red-600 hover:bg-red-700 transition active:scale-95";
        header.className = "bg-red-600 p-3 text-white font-bold transition-colors duration-300";
    } else { // Default to "In Stock" if not explicitly "Sold Out"
        btn.textContent = "✅ EGGS IN STOCK";
        btn.className = "w-full py-4 text-2xl font-bold rounded text-white shadow-md bg-green-600 hover:bg-green-700 transition active:scale-95";
        header.className = "bg-green-600 p-3 text-white font-bold transition-colors duration-300";
    }
}

async function toggleEggs() {
    const btn = document.getElementById('eggBtn');
    if (!btn || btn.disabled) return; // Prevent multiple clicks

    if (!dataStore.farm_status) {
        console.error("Cannot toggle egg status: farm_status not loaded.");
        alert("Farm status is not loaded yet. Please wait a moment and try again.");
        return;
    }

    const currentStatus = dataStore.farm_status.eggs || "Sold Out";
    const newStatus = (currentStatus === "Sold Out") ? "In Stock" : "Sold Out";
    
    btn.disabled = true;
    btn.textContent = 'UPDATING...';

    try {
        let record;
        if (dataStore.farm_status && dataStore.farm_status.id) {
            record = await pb.collection('farm_status').update(dataStore.farm_status.id, { eggs: newStatus });
        } else {
            record = await pb.collection('farm_status').create({ eggs: newStatus });
        }
        // The refreshData call will pull the latest state, including this update.
        await refreshData();
        showToast(`Egg status updated to ${newStatus}!`);

    } catch (err) {
        console.error("Egg Sync Error:", err);
        alert("Failed to save Egg Status: " + err.message);
        // No need to revert, refreshData will pull the correct (old) state.
        await refreshData(); 
    } finally {
        // The button will be re-enabled and correctly rendered by renderEggs via refreshData
        // but as a fallback, we can re-enable it here.
        if(btn) btn.disabled = false;
    }
}

async function addDonation() {
    const amountEl = document.getElementById('quickDonationAmount');
    const amount = parseMoney(amountEl.value);
    if (amount > 0) {
        try {
            await pb.collection('ledger').create({
                date: new Date().toISOString().split('T')[0],
                description: 'Quick Donation',
                category: 'Donations',
                amount: amount,
                type: 'income',
                qty: 1,
                unitPrice: amount
            });
            amountEl.value = '';
            await refreshData();
            showToast(`$${amount.toFixed(2)} donation added to ledger!`);
        } catch (err) {
            console.error("Donation ledger entry failed:", err);
            alert("Failed to add donation to ledger: " + err.message);
        }
    }
}

async function addRefund() {
    const amountEl = document.getElementById('quickRefundAmount');
    const amount = parseMoney(amountEl.value);
    if (amount > 0) {
        try {
            await pb.collection('ledger').create({
                date: new Date().toISOString().split('T')[0],
                description: 'Quick Refund',
                category: 'Refunds',
                amount: amount,
                type: 'expense'
            });
            amountEl.value = '';
            await refreshData();
            showToast(`$${amount.toFixed(2)} refund added to ledger!`);
        } catch (err) {
            console.error("Refund ledger entry failed:", err);
            alert("Failed to add refund to ledger: " + err.message);
        }
    }
}

// --- INSIGHTS ---
function renderInsights() {
    const breakdownList = document.getElementById('insightBreakdown');
    const trendsDiv = document.getElementById('insightTrends');
    const expensesList = document.getElementById('insightExpenses');

    if (!dataStore.ledger || !dataStore.ledger.income || !dataStore.ledger.items) {
        breakdownList.innerHTML = '<li>Awaiting ledger data...</li>';
        trendsDiv.innerHTML = 'Awaiting ledger data...';
        expensesList.innerHTML = '<li>Awaiting ledger data...</li>';
        return;
    }
    
    // 1. Sales Breakdown
    const salesByCategory = dataStore.ledger.income.reduce((acc, item) => {
        const category = item.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + toMoney(item.total);
        return acc;
    }, {});

    const sortedSales = Object.entries(salesByCategory).sort(([, a], [, b]) => b - a);
    
    if (sortedSales.length > 0) {
        breakdownList.innerHTML = sortedSales.map(([cat, total]) => `<li><strong>${cat}:</strong> $${total.toFixed(2)}</li>`).join('');
    } else {
        breakdownList.innerHTML = '<li>No income recorded yet.</li>';
    }

    // 2. Top Expenses
    const expensesByCategory = dataStore.ledger.items.reduce((acc, item) => {
        const category = item.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + toMoney(item.amount);
        return acc;
    }, {});

    const sortedExpenses = Object.entries(expensesByCategory).sort(([, a], [, b]) => b - a);

    if (sortedExpenses.length > 0) {
        expensesList.innerHTML = sortedExpenses.slice(0, 5).map(([cat, total]) => `<li><strong>${cat}:</strong> $${total.toFixed(2)}</li>`).join('');
    } else {
        expensesList.innerHTML = '<li>No expenses recorded yet.</li>';
    }

    // 3. Trends & Answers
    let trendHtml = '<p class="text-sm text-gray-500">No clear trends yet.</p>';
    if (sortedSales.length > 0 && sortedExpenses.length > 0) {
        const topSaleCat = sortedSales[0][0];
        const topExpenseCat = sortedExpenses[0][0];
        const totalIncome = sortedSales.reduce((sum, [, total]) => sum + total, 0);
        const totalExpense = sortedExpenses.reduce((sum, [, total]) => sum + total, 0);

        trendHtml = `
            <ul class="space-y-2 text-sm">
                <li><span class="font-bold">Top Earner:</span> ${topSaleCat} ($${sortedSales[0][1].toFixed(2)})</li>
                <li><span class="font-bold">Top Expense:</span> ${topExpenseCat} ($${sortedExpenses[0][1].toFixed(2)})</li>
                <li><span class="font-bold">Net:</span> <span class="${totalIncome >= totalExpense ? 'text-green-600' : 'text-red-600'}">$${(totalIncome - totalExpense).toFixed(2)}</span></li>
            </ul>
        `;
    }
    trendsDiv.innerHTML = trendHtml;
}

// --- GOALS ---
function renderMonthlyGoal() {
    const container = document.getElementById('goalsList');
    if (!container) return;
    const monthlyGoals = dataStore.goals.filter(g => !g.is_long_term);
    container.innerHTML = monthlyGoals.length > 0 ? monthlyGoals.map(renderGoal).join('') : '<p class="text-center text-gray-500">No monthly goal set.</p>';
}

function renderLongTermGoal() {
    const container = document.getElementById('longTermGoalContainer');
    if (!container) return;
    const longTermGoals = dataStore.goals.filter(g => g.is_long_term);
    container.innerHTML = longTermGoals.length > 0 ? longTermGoals.map(renderGoal).join('') : '<p class="text-center text-gray-500">No long-term goal set.</p>';
}

function renderGoal(goal) {
    const current = toMoney(goal.current);
    const target = toMoney(goal.target);
    const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

    const bd = goal.breakdown || { kofi: 0, cash: goal.current, merch: 0 };
        
    const targetForPct = target > 0 ? target : 1; 

    const kofiPct = Math.min(100, (bd.kofi / targetForPct) * 100);
    const cashPct = Math.min(100, (bd.cash / targetForPct) * 100);
    const merchPct = Math.min(100, (bd.merch / targetForPct) * 100);

    const isSynced = goal.name.includes("Feed") || goal.name.includes("Supplys");
    const syncedBadge = isSynced ? '<span class="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">🔄 Synced to Ledger</span>' : '';
    const stripeBadge = goal.stripe_link ? '<span class="ml-2 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-0.5 rounded-full">💳 Subscription</span>' : '';
    const inputDisabled = isSynced ? 'disabled' : '';
    const inputBgClass = isSynced ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent';
    const inputTitle = isSynced ? 'This updates automatically from your Ledger Income' : '';

     // Define colors based on goal type (Long Term vs Monthly)
    const colors = goal.is_long_term ? {
        kofi: 'bg-purple-500',
        cash: 'bg-teal-500',
        merch: 'bg-orange-400'
    } : {
        kofi: 'bg-blue-400',
        cash: 'bg-green-500',
        merch: 'bg-yellow-400'
    };

    return `
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow-sm">
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <span class="font-bold text-gray-800 dark:text-gray-200">${goal.name}</span>
                    ${syncedBadge}
                    ${stripeBadge}
                </div>
                <div class="flex gap-2">
                     <button onclick="deleteGoal('${goal.id}')" class="text-gray-400 hover:text-red-500 font-bold transition-colors">🗑️</button>
                </div>
                
            </div>
            <div class="flex items-center gap-4 mt-2">
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-5 border border-gray-300 dark:border-gray-500 overflow-hidden relative flex">
                    <div style="width: ${kofiPct}%" class="${colors.kofi} h-full transition-all duration-1000 ease-out shadow-inner" title="Donations"></div>
                    <div style="width: ${cashPct}%" class="${colors.cash} h-full transition-all duration-1000 ease-out shadow-inner" title="Farm Sales"></div>
                    <div style="width: ${merchPct}%" class="${colors.merch} h-full transition-all duration-1000 ease-out shadow-inner" title="Merch"></div>
                    <span class="absolute right-2 top-0 text-xs font-bold text-black/70 dark:text-white drop-shadow-sm leading-5">${percentage.toFixed(0)}%</span>
                </div>
            </div>
            <div class="flex gap-3 mt-2 text-[10px] uppercase font-bold text-gray-400">
                <span class="flex items-center gap-1"><div class="w-2 h-2 rounded-full ${colors.kofi}"></div> Donated</span>
                <span class="flex items-center gap-1"><div class="w-2 h-2 rounded-full ${colors.cash}"></div> Farm Sales</span>
                <span class="flex items-center gap-1"><div class="w-2 h-2 rounded-full ${colors.merch}"></div> Merch</span>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-2 flex justify-between items-center">
                 <div class="flex items-center gap-1">
                    $<input type="number" value="${current.toFixed(2)}" onchange="updateGoalAmount('${goal.id}', this.value)" class="w-24 border-b border-gray-300 dark:border-gray-600 rounded-none p-0 focus:border-blue-500 outline-none ${inputBgClass}" ${inputDisabled} title="${inputTitle}">
                    <span class="text-xs">of $${target.toFixed(2)}</span>
                </div>
                <button onclick="showEditGoalModal('${goal.id}')" class="text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">Edit</button>
            </div>
        </div>
    `;
}

async function deleteGoal(id) {
    if (confirm("Are you sure you want to delete this goal? This cannot be undone.")) {
        await pb.collection('goals').delete(id);
        await refreshData();
        showToast("Goal deleted.");
    }
}

async function updateGoalAmount(id, newAmount) {
    const amount = parseMoney(newAmount);
    await pb.collection('goals').update(id, { current: amount });
    await refreshData();
    showToast("Goal progress updated!");
}

function showEditGoalModal(id) {
    const goal = dataStore.goals.find(g => g.id === id);
    if (!goal) return;

    const title = "Edit Goal";
    const bd = goal.breakdown || { kofi: 0, cash: 0, merch: 0 };

    const html = `
        <div class="space-y-4">
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Goal Name</label>
                <input type="text" id="modalGoalName" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${goal.name || ''}">
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Target Amount</label>
                <input type="number" id="modalGoalTarget" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${goal.target || 0}">
            </div>
            <div>
                <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">${goal.is_long_term ? 'One-Time Payment Link (Stripe)' : 'Subscription Link (Stripe)'}</label>
                <input type="url" id="modalGoalStripeLink" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${goal.stripe_link || ''}" placeholder="https://buy.stripe.com/...">
            </div>
            <div class="border-t dark:border-gray-600 pt-4">
                 <label class="text-sm font-bold text-gray-600 dark:text-gray-400 block mb-1">Breakdown Overrides</label>
                 <div class="grid grid-cols-3 gap-2">
                    <div>
                        <label class="text-xs text-gray-500">Stripe</label>
                        <input type="number" id="modalGoalKofi" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${bd.kofi || 0}">
                    </div>
                    <div>
                        <label class="text-xs text-gray-500">Cash/Sales</label>
                        <input type="number" id="modalGoalCash" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${bd.cash || 0}">
                    </div>
                    <div>
                        <label class="text-xs text-gray-500">Merch</label>
                        <input type="number" id="modalGoalMerch" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" value="${bd.merch || 0}">
                    </div>
                 </div>
            </div>
            <div class="border-t dark:border-gray-600 pt-4 mt-4">
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="modalGoalIsLongTerm" class="w-5 h-5 accent-blue-600" ${goal.is_long_term ? 'checked' : ''}>
                    <label for="modalGoalIsLongTerm" class="text-sm font-bold text-gray-600 dark:text-gray-400">Is Long Term Goal?</label>
                </div>
            </div>
        </div>
    `;

    showModal(title, html, async () => {
        const newName = document.getElementById('modalGoalName').value;
        const newTarget = document.getElementById('modalGoalTarget').value;
        const newKofi = document.getElementById('modalGoalKofi').value;
        const newCash = document.getElementById('modalGoalCash').value;
        const newMerch = document.getElementById('modalGoalMerch').value;
        const isLongTerm = document.getElementById('modalGoalIsLongTerm').checked;
        const stripeLink = document.getElementById('modalGoalStripeLink').value;
        
        if (newName && newTarget) {
            await updateGoal(id, newName, newTarget, { kofi: newKofi, cash: newCash, merch: newMerch }, isLongTerm, stripeLink);
            return true; // Close modal on success
        } else {
            alert("Please fill out all fields.");
            return false; // Keep modal open
        }
    });
}

async function updateGoal(id, newName, newTarget, newBreakdown, isLongTerm, stripeLink) {
    const targetAmount = parseMoney(newTarget);
    if (targetAmount > 0) {
        const payload = {
            name: newName,
            target: targetAmount,
            is_long_term: isLongTerm,
            breakdown_kofi: parseMoney(newBreakdown.kofi),
            breakdown_cash: parseMoney(newBreakdown.cash),
            breakdown_merch: parseMoney(newBreakdown.merch),
            stripe_link: stripeLink,
        };
        
        // Also update the main 'current' amount to be the sum of the breakdowns
        payload.current = payload.breakdown_kofi + payload.breakdown_cash + payload.breakdown_merch;

        await pb.collection('goals').update(id, payload);
        await refreshData();
        showToast("Goal details updated!");
    } else {
        alert("Invalid target amount.");
    }
}

function renderFlocksArchive() {
    const list = document.getElementById('chickenLeaderboard');
    if (!list) return;

    const deceasedChickens = dataStore.chickens
        .filter(c => c.status === 'deceased')
        .sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sort by most recently updated

    if (deceasedChickens.length === 0) {
        list.innerHTML = `<li class="text-center text-gray-500">No animals have been archived yet.</li>`;
        return;
    }

    list.innerHTML = deceasedChickens.map(c => `
        <li class="flex justify-between items-center text-sm p-1">
            <span class="font-bold">${c.name}</span>
            <span class="text-gray-500">Archived: ${new Date(c.updated).toLocaleDateString()}</span>
        </li>
    `).join('');
}

export function initWidgets(dependencies) {

    pb = dependencies.pb;

    dataStore = dependencies.dataStore;

    refreshData = dependencies.refreshData;

    showModal = dependencies.showModal;

    showToast = dependencies.showToast;

    toMoney = dependencies.toMoney;

    parseMoney = dependencies.parseMoney;

    CATEGORIES = dependencies.CATEGORIES;

    NOTE_COLORS = dependencies.NOTE_COLORS;

    imageCompression = dependencies.imageCompression;

    const FarmService = dependencies.FarmService;

    // --- Attach event listeners for static elements ---

    document.getElementById('eggBtn')?.addEventListener('click', toggleEggs);

    document.getElementById('addDonationBtn')?.addEventListener('click', addDonation);

    document.getElementById('addRefundBtn')?.addEventListener('click', addRefund);

    document.getElementById('clearShoppingListBtn')?.addEventListener('click', clearShoppingList);
    
    document.getElementById('openAddShopModalBtn')?.addEventListener('click', showAddShoppingItemModal);
    document.getElementById('viewArchivedShopBtn')?.addEventListener('click', viewArchivedShopItems);

    document.getElementById('addVoiceNoteBtn')?.addEventListener('click', addVoiceNote);

    document.getElementById('quickNoteBtn')?.addEventListener('click', quickNote);

    document.getElementById('cancelVoiceModalBtn')?.addEventListener('click', () => closeVoiceModal(true));

    document.getElementById('saveDonationLinkBtn')?.addEventListener('click', async () => {
        const link = document.getElementById('mainDonationLink').value;
        const longTermGoal = dataStore.goals.find(g => g.is_long_term);

        if (longTermGoal) {
        try {
            await pb.collection('goals').update(longTermGoal.id, { stripe_link: link });
            showToast("Donation link updated!");
            await refreshData();
        } catch (e) {
            console.error(e);
            showToast("Error saving link: " + e.message, true);
        }
        } else {
            showToast("No Long Term Goal found to update.", true);
        }
    });

    document.getElementById('saveSubscriptionLinkBtn')?.addEventListener('click', async () => {
        const link = document.getElementById('subscriptionLink').value;
        const monthlyGoal = dataStore.goals.find(g => !g.is_long_term && (g.name === 'Monthly Feed & Supplies' || g.name === 'Monthly Feed' || g.name.includes('Feed')));
    
        if (monthlyGoal) {
            try {
                await pb.collection('goals').update(monthlyGoal.id, { stripe_link: link });
                showToast("Subscription link updated for Monthly Feed goal!");
                await refreshData();
            } catch (e) {
                console.error(e);
                showToast("Error saving subscription link: " + e.message, true);
            }
        } else {
            showToast("Could not find 'Monthly Feed & Supplies' goal to update.", true);
        }
    });

    // --- Attach to window for dynamically generated onclick handlers in HTML strings ---
    // These are used in render functions like renderShoppingList, renderNotes, renderGoal
    window.removeShopItem = removeShopItem;
    window.markFunded = markFunded;
    window.editShoppingItem = editShoppingItem;
    window.restoreShopItem = restoreShopItem;
    window.editNote = editNote;
    window.deleteNote = deleteNote;
    window.togglePin = togglePin;
    window.moveNote = moveNote;
    window.deleteGoal = deleteGoal;
    window.updateGoalAmount = updateGoalAmount;
    window.showEditGoalModal = showEditGoalModal;


    return {
        renderShoppingList,
        renderDonationSettings: () => {
            const input = document.getElementById('mainDonationLink');
            if (input && dataStore.goals) {
                const longTermGoal = dataStore.goals.find(g => g.is_long_term);
                if (longTermGoal) {
                    input.value = longTermGoal.stripe_link || '';
                } else {
                    input.value = '';
                }
            }
        },
        renderSubscriptionSettings: () => {
            const input = document.getElementById('subscriptionLink');
            if (input && dataStore.goals) {
                const monthlyGoal = dataStore.goals.find(g => !g.is_long_term && (g.name === 'Monthly Feed & Supplies' || g.name === 'Monthly Feed' || g.name.includes('Feed')));
                if (monthlyGoal) {
                    input.value = monthlyGoal.stripe_link || '';
                }
            }
        },
        renderNotes,
        renderEggs,
        renderMonthlyGoal,
        renderLongTermGoal,
        renderInsights,
    };
}
