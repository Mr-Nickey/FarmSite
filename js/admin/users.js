export function initUsers(pb) {
    const container = document.getElementById('usersList');
    const searchInput = document.getElementById('userSearch');
    const createUserBtn = document.getElementById('createUserBtn');
    
    // Re-use the generic appModal from admin.html
    const appModal = document.getElementById('appModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalConfirm = document.getElementById('modalConfirm');

    if (!container) return;

    let usersCache = [];

    async function loadUsers() {
        container.innerHTML = '<tr><td colspan="5" class="p-4 text-center">Loading users...</td></tr>';
        try {
            usersCache = await pb.collection('users').getFullList({ sort: '-created' });
            renderUsers(usersCache);
        } catch (e) {
            console.error(e);
            container.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-red-500">Error loading users.</td></tr>';
        }
    }

    function renderUsers(users) {
        if (users.length === 0) {
            container.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-gray-500">No users found.</td></tr>';
            return;
        }

        container.innerHTML = users.map(user => {
            const avatarUrl = user.avatar 
                ? pb.files.getURL(user, user.avatar, { 'thumb': '100x100' }) 
                : 'https://placehold.co/100x100?text=No+Img';
            
            const created = new Date(user.created).toLocaleDateString();
            const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : '-';

            return `
                <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td class="p-2">
                        <img src="${avatarUrl}" class="w-10 h-10 rounded-full object-cover border border-gray-200">
                    </td>
                    <td class="p-2">
                        <div class="font-bold text-sm dark:text-gray-200">${user.name || 'No Name'}</div>
                        <div class="text-xs text-gray-500">${user.email}</div>
                    </td>
                    <td class="p-2 text-sm text-gray-500">${created}</td>
                    <td class="p-2 text-sm text-gray-500">${lastLogin}</td>
                    <td class="p-2 text-right">
                        <button class="text-blue-600 hover:text-blue-800 text-xs font-bold mr-2 edit-user-btn" data-id="${user.id}">Edit</button>
                        <button class="text-red-500 hover:text-red-700 text-xs font-bold delete-user-btn" data-id="${user.id}">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');

        // Attach listeners
        container.querySelectorAll('.edit-user-btn').forEach(btn => {
            btn.addEventListener('click', (e) => openEditModal(e.target.dataset.id));
        });
        container.querySelectorAll('.delete-user-btn').forEach(btn => {
            btn.addEventListener('click', (e) => deleteUser(e.target.dataset.id));
        });
    }

    function openEditModal(id) {
        const user = usersCache.find(u => u.id === id);
        if (!user) return;

        modalTitle.textContent = 'Edit User';
        
        const avatarUrl = user.avatar 
            ? pb.files.getURL(user, user.avatar, { 'thumb': '100x100' }) 
            : null;

        modalContent.innerHTML = `
            <form id="editUserForm" class="space-y-4">
                <div class="flex items-center gap-4">
                    ${avatarUrl ? `<img src="${avatarUrl}" class="w-16 h-16 rounded-full object-cover border">` : '<div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">No Avatar</div>'}
                    <div>
                        ${avatarUrl ? `<button type="button" id="removeAvatarBtn" class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200 border border-red-200">Remove Avatar</button>` : ''}
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">Display Name</label>
                    <input type="text" id="editName" value="${user.name || ''}" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" value="${user.email}" class="w-full border p-2 rounded bg-gray-100 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300 cursor-not-allowed" disabled>
                </div>
                
                <div class="flex gap-6">
                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="editEmailVisibility" class="w-4 h-4 accent-indigo-600" ${user.emailVisibility ? 'checked' : ''}>
                        <label for="editEmailVisibility" class="text-sm font-bold text-gray-700 dark:text-gray-300">Email Visibility</label>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="editVerified" class="w-4 h-4 accent-indigo-600" ${user.verified ? 'checked' : ''}>
                        <label for="editVerified" class="text-sm font-bold text-gray-700 dark:text-gray-300">Verified</label>
                    </div>
                </div>

                <div class="border-t dark:border-gray-700 pt-4 mt-2">
                    <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Billing & Subscription</h4>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">Stripe Customer ID</label>
                            <input type="text" id="editStripeCustomerId" value="${user.stripe_customer_id || ''}" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="cus_...">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">Subscription Status</label>
                                <select id="editSubscriptionStatus" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <option value="">-- Select --</option>
                                    <option value="active" ${user.subscription_status === 'active' ? 'selected' : ''}>Active</option>
                                    <option value="past_due" ${user.subscription_status === 'past_due' ? 'selected' : ''}>Past Due</option>
                                    <option value="canceled" ${user.subscription_status === 'canceled' ? 'selected' : ''}>Canceled</option>
                                    <option value="unpaid" ${user.subscription_status === 'unpaid' ? 'selected' : ''}>Unpaid</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">Tier</label>
                                <select id="editStripeTier" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <option value="free" ${user.stripe_tier === 'free' || !user.stripe_tier ? 'selected' : ''}>Free</option>
                                    <option value="tier1" ${user.stripe_tier === 'tier1' ? 'selected' : ''}>Tier 1</option>
                                    <option value="tier2" ${user.stripe_tier === 'tier2' ? 'selected' : ''}>Tier 2</option>
                                    <option value="tier3" ${user.stripe_tier === 'tier3' ? 'selected' : ''}>Tier 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        `;

        // Handle Remove Avatar
        const removeAvatarBtn = document.getElementById('removeAvatarBtn');
        if (removeAvatarBtn) {
            removeAvatarBtn.onclick = async () => {
                if(confirm('Remove this user\'s avatar?')) {
                    try {
                        await pb.collection('users').update(user.id, { avatar: null });
                        closeModal();
                        loadUsers();
                    } catch(e) {
                        alert('Error removing avatar: ' + e.message);
                    }
                }
            };
        }

        // Setup Confirm Button
        const currentConfirm = document.getElementById('modalConfirm');
        const newConfirm = currentConfirm.cloneNode(true);
        currentConfirm.parentNode.replaceChild(newConfirm, currentConfirm);
        
        newConfirm.addEventListener('click', async () => {
            const name = document.getElementById('editName').value;
            const emailVisibility = document.getElementById('editEmailVisibility').checked;
            const verified = document.getElementById('editVerified').checked;
            const stripe_customer_id = document.getElementById('editStripeCustomerId').value;
            const subscription_status = document.getElementById('editSubscriptionStatus').value;
            const stripe_tier = document.getElementById('editStripeTier').value;

            newConfirm.disabled = true;
            newConfirm.textContent = 'Saving...';

            try {
                await pb.collection('users').update(user.id, { 
                    name, 
                    emailVisibility,
                    verified,
                    stripe_customer_id,
                    subscription_status,
                    stripe_tier
                });
                closeModal();
                loadUsers();
            } catch (e) {
                alert('Error updating user: ' + e.message);
            } finally {
                newConfirm.disabled = false;
                newConfirm.textContent = 'Confirm';
            }
        });

        appModal.classList.remove('hidden');
        appModal.classList.add('flex');
    }

    function openCreateModal() {
        modalTitle.textContent = 'Create New User';
        
        modalContent.innerHTML = `
            <form id="createUserForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" id="createEmail" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">Password</label>
                    <input type="password" id="createPassword" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">Confirm Password</label>
                    <input type="password" id="createPasswordConfirm" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">Display Name</label>
                    <input type="text" id="createName" class="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                </div>
            </form>
        `;

        // Setup Confirm Button
        const currentConfirm = document.getElementById('modalConfirm');
        const newConfirm = currentConfirm.cloneNode(true);
        currentConfirm.parentNode.replaceChild(newConfirm, currentConfirm);
        
        newConfirm.addEventListener('click', async () => {
            const email = document.getElementById('createEmail').value;
            const password = document.getElementById('createPassword').value;
            const passwordConfirm = document.getElementById('createPasswordConfirm').value;
            const name = document.getElementById('createName').value;

            if (!email || !password || !passwordConfirm) {
                alert('Please fill in all required fields.');
                return;
            }

            newConfirm.disabled = true;
            newConfirm.textContent = 'Creating...';

            try {
                await pb.collection('users').create({ email, password, passwordConfirm, name });
                closeModal();
                loadUsers();
            } catch (e) {
                alert('Error creating user: ' + e.message);
            } finally {
                newConfirm.disabled = false;
                newConfirm.textContent = 'Confirm';
            }
        });

        appModal.classList.remove('hidden');
        appModal.classList.add('flex');
    }

    function closeModal() {
        appModal.classList.add('hidden');
        appModal.classList.remove('flex');
    }

    async function deleteUser(id) {
        if(confirm('Are you sure you want to delete this user? This cannot be undone.')) {
            try {
                await pb.collection('users').delete(id);
                loadUsers();
            } catch(e) {
                alert('Error deleting user: ' + e.message);
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = usersCache.filter(u => 
                (u.name && u.name.toLowerCase().includes(term)) || 
                (u.email && u.email.toLowerCase().includes(term))
            );
            renderUsers(filtered);
        });
    }

    if (createUserBtn) {
        createUserBtn.addEventListener('click', openCreateModal);
    }

    loadUsers();
}