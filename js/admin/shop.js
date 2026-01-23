import { FarmService } from '../services.js';

// DOM Elements
let shopProductsList;
let shopProductFormContainer;
let shopProductForm;
let toggleAddShopProductBtn;
let cancelShopProductBtn;
let imagePreviewContainer;
let productName, productDescription, productPrice, productStock, productCategory, productPublished, productImages, shopProductId, productType, productStripeLink, productComingSoon, productPosition;
let categoryDatalist;

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

    // Always use the initialized FarmService.pb instance, not a module-level constant
    if (!FarmService.pb) {
        console.error("FarmService.pb is not initialized when getFileUrl is called!");
        return null;
    }

    return FarmService.pb.files.getURL(record, file, { 'thumb': '100x100' });
}

/**
 * Renders the shop products in the table.
 * @param {Array<import('pocketbase').Record>} products
 */
function renderShopProducts(products) {
    if (!shopProductsList) return;
    shopProductsList.innerHTML = '';

    if (products.length === 0) {
        shopProductsList.innerHTML = '<tr><td colspan="8" class="p-4 text-center text-gray-500">No products found. Add one to get started!</td></tr>';
        return;
    }

    products.forEach(product => {
        const imageUrl = getFileUrl(product, product.Images?.[0]) || 'https://placehold.co/300x300/e2e8f0/64748b/png?text=No+Image';
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-600/50';
        tr.dataset.productId = product.id;
        
        const statusBg = product.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
        const statusText = product.published ? 'Published' : 'Draft';
        const comingSoonBadge = product.coming_soon ? '<span class="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">Coming Soon</span>' : '';

        tr.innerHTML = `
            <td class="p-2">
                <img src="${imageUrl}" alt="${product.Name}" class="w-12 h-12 object-cover rounded">
            </td>
            <td class="p-2 text-center font-bold">${product.position}</td>
            <td class="p-2 font-medium">${product.Name}</td>
            <td class="p-2">${product.type || 'Product'}</td>
            <td class="p-2">${product.Price.toFixed(2)}</td>
            <td class="p-2">${product.Stock_Qty}</td>
            <td class="p-2">
                <span class="px-2 py-1 text-xs font-semibold rounded-full ${statusBg}">
                    ${statusText}
                </span>
                ${comingSoonBadge}
            </td>
            <td class="p-2 text-right">
                <button class="edit-btn text-blue-600 hover:underline mr-2">Edit</button>
                <button class="delete-btn text-red-600 hover:underline">Delete</button>
            </td>
        `;

        tr.querySelector('.edit-btn').addEventListener('click', () => handleEditProduct(product));
        tr.querySelector('.delete-btn').addEventListener('click', () => handleDeleteProduct(product.id, product.Name));

        shopProductsList.appendChild(tr);
    });
}

/**
 * Fetches and displays shop products and populates category datalist.
 */
export async function loadShopProducts() {
    try {
        const products = await FarmService.getShopProducts();
        renderShopProducts(products);

        // Populate category datalist
        if (categoryDatalist) {
            const categories = [...new Set(products.map(p => p.Category).filter(Boolean))];
            categoryDatalist.innerHTML = '';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                categoryDatalist.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading shop products:', error);
        if (shopProductsList) {
            shopProductsList.innerHTML = '<tr><td colspan="8" class="p-4 text-center text-red-500">Error loading products.</td></tr>';
        }
    }
}

/**
 * Handles editing a product.
 * @param {import('pocketbase').Record} product
 */
function handleEditProduct(product) {
    // NOTE: This implementation does not handle adding/removing files during an edit.
    // It is focused on fixing the "add new product" flow. A full implementation 
    // would require tracking existing files for removal, which is more complex.
    shopProductForm.reset();
    imagePreviewContainer.innerHTML = '';
    
    shopProductId.value = product.id;
    productName.value = product.Name;
    productDescription.value = product.Description;
    productPrice.value = product.Price;
    productStock.value = product.Stock_Qty;
    productPosition.value = product.position;
    productCategory.value = product.Category;
    productPublished.checked = product.published;
    productType.value = product.type || 'Product';
    productStripeLink.value = product.stripe_link;
    productComingSoon.checked = product.coming_soon;

    // Display existing images (previews only, no removal logic for now)
    if (product.Images && product.Images.length > 0) {
        product.Images.forEach(filename => {
            const url = getFileUrl(product, filename);
            const wrapper = document.createElement('div');
            wrapper.className = 'relative w-24 h-24';
            const img = document.createElement('img');
            img.src = url;
            img.className = 'w-full h-full object-cover rounded';
            wrapper.appendChild(img);
            const existingLabel = document.createElement('span');
            existingLabel.className = 'absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center p-0.5';
            existingLabel.textContent = 'Saved';
            wrapper.appendChild(existingLabel);
            imagePreviewContainer.appendChild(wrapper);
        });
    }

    shopProductFormContainer.classList.remove('hidden');
    toggleAddShopProductBtn.textContent = 'Cancel Edit';
}

/**
 * Handles deleting a product.
 * @param {string} id
 * @param {string} name
 */
async function handleDeleteProduct(id, name) {
    if (!confirm(`Are you sure you want to delete the product "${name}"? This cannot be undone.`)) {
        return;
    }

    try {
        await FarmService.deleteShopProduct(id);
        await loadShopProducts(); // Refresh the list
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Check the console for details.');
    }
}


function toggleForm(show, newFilesArrayRef) {
    if (show) {
        shopProductFormContainer.classList.remove('hidden');
        toggleAddShopProductBtn.textContent = 'Cancel';
    } else {
        shopProductFormContainer.classList.add('hidden');
        shopProductForm.reset();
        shopProductId.value = '';
        if (newFilesArrayRef) newFilesArrayRef.length = 0; // Clear the file array
        imagePreviewContainer.innerHTML = '';
        toggleAddShopProductBtn.textContent = '+ Add New Product';
    }
}

// These two functions are replaced by the logic inside initShopManager
// function createPreviewImage(url, filename) { ... }
// function handleImageFiles(files) { ... }


export function initShopManager() {
    shopProductsList = document.getElementById('shopProductsList');
    shopProductFormContainer = document.getElementById('shopProductFormContainer');
    shopProductForm = document.getElementById('shopProductForm');
    toggleAddShopProductBtn = document.getElementById('toggleAddShopProductBtn');
    cancelShopProductBtn = document.getElementById('cancelShopProduct');
    imagePreviewContainer = document.getElementById('imagePreviewContainer');
    categoryDatalist = document.getElementById('category-list');
    
    // Form fields
    productName = document.getElementById('productName');
    productDescription = document.getElementById('productDescription');
    productPrice = document.getElementById('productPrice');
    productStock = document.getElementById('productStock');
    productPosition = document.getElementById('productPosition');
    productCategory = document.getElementById('productCategory');
    productPublished = document.getElementById('productPublished');
    productImages = document.getElementById('productImages');
    shopProductId = document.getElementById('shopProductId');
    productType = document.getElementById('productType');
    productStripeLink = document.getElementById('productStripeLink');
    productComingSoon = document.getElementById('productComingSoon');

    let newFiles = [];

    function renderPreviews() {
        imagePreviewContainer.innerHTML = '';
        newFiles.forEach((file, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'relative w-24 h-24';
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.className = 'w-full h-full object-cover rounded';
            wrapper.appendChild(img);

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', () => {
                newFiles.splice(index, 1);
                renderPreviews(); // Re-render after removal
            });
            wrapper.appendChild(removeBtn);
            imagePreviewContainer.appendChild(wrapper);
        });
    }

    if (toggleAddShopProductBtn) {
        toggleAddShopProductBtn.addEventListener('click', () => {
             const isHidden = shopProductFormContainer.classList.contains('hidden');
             // When opening for a new product, ensure everything is reset
             if (isHidden) {
                shopProductForm.reset();
                shopProductId.value = '';
                newFiles = [];
                imagePreviewContainer.innerHTML = '';
             }
             toggleForm(isHidden, newFiles);
        });
    }

    if (cancelShopProductBtn) {
        cancelShopProductBtn.addEventListener('click', () => toggleForm(false, newFiles));
    }

    if(productImages) {
        productImages.addEventListener('change', (e) => {
             if (e.target.files) {
                newFiles.push(...Array.from(e.target.files));
             }
             renderPreviews();
             // Important: Clear the file input to allow selecting the same file again if removed.
             e.target.value = '';
        });
    }
    
    // Initial load
    loadShopProducts();

    shopProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const saveButton = e.target.querySelector('button[type="submit"]');
        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';

        const data = {
            id: shopProductId.value || null,
            Name: productName.value,
            Description: productDescription.value,
            Price: parseFloat(productPrice.value) || 0,
            Stock_Qty: parseInt(productStock.value) || 0,
            position: parseInt(productPosition.value) || 0,
            Category: productCategory.value,
            published: productPublished.checked,
            type: productType.value,
            stripe_link: productStripeLink.value,
            coming_soon: productComingSoon.checked,
        };
        
        // Use the files from our array. The service expects a FileList or an array of Files.
        const filesToUpload = newFiles.length > 0 ? newFiles : null;

        try {
            await FarmService.saveShopProduct(data, filesToUpload);
            toggleForm(false, newFiles);
            await loadShopProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            let errorMessage = 'Failed to save product. Check console for details.';
            if (error.data?.data) {
                const fieldErrors = Object.keys(error.data.data).map(key => {
                    const err = error.data.data[key];
                    return `${key}: ${err.message}`;
                }).join('\n');
                errorMessage += `\n\nServer validation errors:\n${fieldErrors}`;
            }
            alert(errorMessage);
        } finally {
            saveButton.disabled = false;
            saveButton.textContent = 'Save Product';
        }
    });
}