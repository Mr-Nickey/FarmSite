const pb = new PocketBase('https://flockingreeds.farm');

const productsGrid = document.getElementById('products-grid');
const subscriptionsGrid = document.getElementById('subscriptions-grid');
const loadingSpinner = document.getElementById('loading-spinner');
const filterBar = document.getElementById('filter-bar');

let allProducts = []; // To store all fetched products
let allSubscriptions = []; // To store all fetched subscriptions

/**
 * Gets a URL for a file in a collection record.
 * @param {import('pocketbase').Record} record PocketBase record
 * @param {string} [filename] The file's name. If not provided, the first file is used.
 * @returns {string|null} The URL or null if not found.
 */
const getFileUrl = (record, filename) => {
    if (!record || !record.id) return null;
    const file = filename || (record.Images && record.Images[0]);
    if (!file) return null;
    return pb.getFileUrl(record, file, { 'thumb': '300x300' });
};

/**
 * Renders subscription products in their grid.
 * @param {Array<import('pocketbase').Record>} subscriptionsToRender
 */
function renderSubscriptions(subscriptionsToRender) {
    if (!subscriptionsGrid) return;
    subscriptionsGrid.innerHTML = '';
    if (subscriptionsToRender.length === 0) {
        // Optionally hide the whole section if no subscriptions
        document.getElementById('subscription-tiers').classList.add('hidden');
        return;
    }

    subscriptionsToRender.forEach(sub => {
        const card = document.createElement('div');
        card.className = 'cute-frame border-4 border-yellow-700/50 dark:border-yellow-600/50 p-6 flex flex-col text-center';
        
        const subIsComingSoon = sub.coming_soon;
        const subHasPaymentLink = !!sub.stripe_link;

        let subButtonHtml;
        if (subIsComingSoon || !subHasPaymentLink) {
            subButtonHtml = `<span class="bg-gray-400 text-white w-full py-2 rounded-lg font-bold cursor-not-allowed">Coming Soon</span>`;
        } else {
            subButtonHtml = `<button class="subscribe-btn bg-yellow-600 text-white w-full py-2 rounded-lg font-bold hover:bg-yellow-700 transition-colors" data-link="${sub.stripe_link}">Subscribe</button>`;
        }

        card.innerHTML = `
            <h3 class="text-2xl font-bold text-yellow-800 dark:text-yellow-400 mb-2">${sub.Name}</h3>
            <p class="text-4xl font-bold mb-4">$${sub.Price.toFixed(2)}<span class="text-lg font-normal">/mo</span></p>
            <p class="text-gray-600 dark:text-gray-300 mb-6 grow">${sub.Description}</p>
            ${subButtonHtml}
        `;
        subscriptionsGrid.appendChild(card);
    });
}

/**
 * Renders regular products in the grid.
 * @param {Array<import('pocketbase').Record>} productsToRender
 */
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `<p class="text-gray-500 col-span-full">No products found for this category.</p>`;
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300';
        card.dataset.category = product.Category;

        const imageUrl = getFileUrl(product) || 'https://placehold.co/300x300/e2e8f0/64748b/png?text=No+Image';

        const isSoldOut = product.Stock_Qty <= 0;
        const isComingSoon = product.coming_soon;
        const hasPaymentLink = !!product.stripe_link;
        const isFarmPickup = product.Category === 'Farm Pickup';

        let buttonHtml;
        if (isComingSoon) {
             buttonHtml = `<span class="bg-gray-400 text-white font-bold py-2 px-4 rounded-full cursor-not-allowed">Coming Soon</span>`;
        } else if (isSoldOut) {
            buttonHtml = `<span class="bg-red-600 text-white font-bold py-2 px-4 rounded-full">Sold Out</span>`;
        } else if (!hasPaymentLink && !isFarmPickup) {
            buttonHtml = `<span class="bg-gray-400 text-white font-bold py-2 px-4 rounded-full cursor-not-allowed">Coming Soon</span>`;
        }
        else {
            const buttonText = isFarmPickup ? 'Reserve' : 'Buy';
            buttonHtml = `<button class="buy-btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-4 rounded-full" data-id="${product.id}">${buttonText}</button>`;
        }

        card.innerHTML = `
            <img src="${imageUrl}" alt="${product.Name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-bold text-lg">${product.Name}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-2 h-10 overflow-hidden">${product.Description}</p>
                <div class="flex justify-between items-center mt-4">
                    <p class="font-bold text-xl text-green-700 dark:text-green-400">$${product.Price.toFixed(2)}</p>
                    ${buttonHtml}
                </div>
            </div>
        `;

        productsGrid.appendChild(card);
    });
}

const reserveModal = document.getElementById('reserve-modal');
const modalCancel = document.getElementById('modal-cancel');
const modalProductName = document.getElementById('modal-item-name');
const modalProductPrice = document.getElementById('modal-item-price');
const modalReserveBtn = document.getElementById('modal-reserve-btn');

function openReserveModal(product) {
    modalProductName.textContent = product.Name;
    modalProductPrice.textContent = product.Price.toFixed(2);
    modalReserveBtn.href = `mailto:contact@flockingreeds.farm?subject=Reservation for ${encodeURIComponent(product.Name)}&body=I would like to reserve ${encodeURIComponent(product.Name)} for farm pickup.`;
    reserveModal.classList.remove('hidden');
    reserveModal.classList.add('flex');
}

function closeReserveModal() {
    reserveModal.classList.add('hidden');
    reserveModal.classList.remove('flex');
}

productsGrid.addEventListener('click', (e) => {
    const buyBtn = e.target.closest('.buy-btn');
    if (!buyBtn) return;

    const productId = buyBtn.dataset.id;
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    if (product.Category === 'Merch' && product.stripe_link) {
        window.open(product.stripe_link, '_blank');
    } else if (product.Category === 'Farm Pickup') {
        openReserveModal(product);
    } else if (product.stripe_link) { // Fallback for other buyable items with a stripe link
        window.open(product.stripe_link, '_blank');
    }
});

modalCancel.addEventListener('click', closeReserveModal);
reserveModal.addEventListener('click', (e) => {
    if (e.target === reserveModal) {
        closeReserveModal();
    }
});

/**
 * Fetches products from PocketBase.
 */
async function fetchProducts() {
    loadingSpinner.classList.remove('hidden');
    productsGrid.classList.add('hidden');
    try {
        const allPublished = await pb.collection('shop_products').getFullList({
            filter: 'published = true',
            sort: '+position',
        });
        
        allSubscriptions = allPublished.filter(p => p.type === 'Subscription');
        allProducts = allPublished.filter(p => p.type !== 'Subscription');
        
        renderSubscriptions(allSubscriptions);
        renderProducts(allProducts);

    } catch (error) {
        console.error("Failed to fetch products:", error);
        productsGrid.innerHTML = `<p class="text-red-500 col-span-full">Error loading products. Please try again later.</p>`;
    } finally {
        loadingSpinner.classList.add('hidden');
        productsGrid.classList.remove('hidden');
    }
}

/**
 * Handles clicks on the filter bar.
 * @param {Event} e
 */
function handleFilterClick(e) {
    const target = e.target.closest('.filter-btn');
    if (!target) return;

    const category = target.dataset.category;

    // Update active button style
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-green-700', 'text-white');
        btn.classList.add('bg-gray-200', 'dark:bg-gray-700');
    });
    target.classList.add('bg-green-700', 'text-white');
    target.classList.remove('bg-gray-200', 'dark:bg-gray-700');

    if (category === 'all') {
        renderProducts(allProducts);
    } else {
        const filteredProducts = allProducts.filter(p => p.Category === category);
        renderProducts(filteredProducts);
    }
}

function handleStripeLink(e) {
    const button = e.target.closest('.subscribe-btn');
    if (!button) return;

    const link = button.dataset.link;
    if (link) {
        window.open(link, '_blank');
    } else {
        alert('This subscription is not available at the moment.');
    }
}


// Event Listeners
filterBar.addEventListener('click', handleFilterClick);
subscriptionsGrid?.addEventListener('click', handleStripeLink);


// Initialize the shop
fetchProducts();

