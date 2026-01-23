// --- Constants ---
const WORKER_URL = 'YOUR_WORKER_URL_HERE'; // Make sure to replace this

// --- UI Elements ---
const welcomeEl = document.getElementById('welcomeMessage');
const displayNicknameEl = document.getElementById('display-nickname');
const orderHistoryListEl = document.getElementById('order-history-list');
const avatarPreview = document.getElementById('avatar-preview');
const avatarUpload = document.getElementById('avatar-upload');
const nicknameInput = document.getElementById('nickname-input');
const profileForm = document.getElementById('profile-form');
const passwordForm = document.getElementById('password-form');
const subscriptionToggle = document.getElementById('subscription-toggle');
const membershipSection = document.getElementById('membership-section');
const membershipActiveContent = document.getElementById('membership-active-content');
const membershipInactiveContent = document.getElementById('membership-inactive-content');
const membershipStatusBadge = document.getElementById('membership-status-badge');
const membershipTierName = document.getElementById('membership-tier-name');
const billingPortalBtn = document.getElementById('btn-billing-portal');

// --- Messaging UI Elements ---
const messageHistoryEl = document.getElementById('message-history');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// --- State ---


// --- PocketBase Instance ---
// Ensure layout.js has already initialized `window.pb`
const pb = window.pb;

// --- Helper to show toast messages ---
function showToast(message, isError = false) {
    const el = document.createElement('div');
    el.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-2xl text-white font-bold z-50 transition-all duration-300 transform translate-y-20 ${isError ? 'bg-red-600' : 'bg-gray-800'}`;
    el.innerText = message;
    document.body.appendChild(el);
    setTimeout(() => el.classList.remove('translate-y-20'), 10);
    setTimeout(() => { el.classList.add('translate-y-20'); setTimeout(() => el.remove(), 300); }, 3000);
}

// --- Main Function on Load ---
window.onload = async () => {
    // 1. Auth Check
    if (!pb || !pb.authStore.isValid) {
        window.location.href = 'login.html';
        return;
    }

    const user = pb.authStore.model;

    // 2. Render User Profile
    renderUserProfile(user);

    // 3. Render Membership Status
    renderMembershipStatus(user);

    // 4. Render Order History
    await renderOrderHistory(user.email);

    // 5. Render Newsletter Subscription Status
    await renderNewsletterStatus(user);

    // 6. Setup Event Listeners
    setupEventListeners(user);

    // 7. Initialize Messaging
    await initMessaging(user);
};

// --- RENDER FUNCTIONS ---

function renderUserProfile(user) {
    if (!user) return;

    // Welcome message
    welcomeEl.innerText = `Welcome back, ${user.name || user.email}!`;
    displayNicknameEl.innerText = user.name || 'Not Set';

    // Avatar
    if (user.avatar) {
        const avatarUrl = pb.files.getURL(user, user.avatar, {'thumb': '100x100'});
        avatarPreview.src = avatarUrl;
    }

    // Nickname
    nicknameInput.value = user.name || '';
}

function renderMembershipStatus(user) {
    if (!user || !membershipSection) return;

    membershipSection.classList.remove('hidden');

    if (user.is_supporter && user.stripe_tier) {
        // Active supporter
        membershipActiveContent.classList.remove('hidden');
        membershipInactiveContent.classList.add('hidden');
        
        membershipStatusBadge.textContent = 'Active';
        membershipStatusBadge.className = 'px-3 py-1 text-sm font-bold rounded-full bg-green-100 text-green-800';
        
        // Capitalize the first letter of the tier
        const tier = user.stripe_tier.charAt(0).toUpperCase() + user.stripe_tier.slice(1);
        membershipTierName.textContent = tier.replace(/_/g, ' '); // e.g. "Flock Friend"

    } else {
        // Inactive supporter
        membershipInactiveContent.classList.remove('hidden');
        membershipActiveContent.classList.add('hidden');
    }
}

async function renderOrderHistory(userEmail) {
    // This is a placeholder. Future implementation can fetch actual orders.
    orderHistoryListEl.innerHTML = `<p class="text-center italic text-gray-500">You have no orders yet.</p>`;
}

async function renderNewsletterStatus(user) {
    if (!user || !subscriptionToggle) return;
    subscriptionToggle.disabled = true;
    try {
        const subscription = await pb.collection('subscribers').getFirstListItem(`email = "${user.email}"`);
        subscriptionToggle.checked = subscription && subscription.active;
    } catch (e) {
        if (e.status === 404) {
            subscriptionToggle.checked = false;
        } else {
            console.error("Failed to load subscription status:", e);
            showToast('Could not load newsletter status.', true);
        }
    } finally {
        subscriptionToggle.disabled = false;
    }
}

// --- MESSAGING FUNCTIONS ---

async function initMessaging(user) {
    if (!messageHistoryEl) return;

    let staffUsers = [];
    let selectedFiles = [];
    const attachmentInput = document.getElementById('message-attachment');
    const attachmentPreview = document.getElementById('attachment-preview');

    // 1. Find staff users (Super Users)
    try {
        staffUsers = await pb.collection('users').getFullList({ 
            filter: 'is_super_user = true' 
        });
    } catch (e) {
        console.error("Failed to fetch staff list:", e);
    }

    if (staffUsers.length === 0) {
        messageHistoryEl.innerHTML = `<p class="text-center text-red-500">Support unavailable.</p>`;
        messageForm.classList.add('hidden');
        return;
    }

    // 2. Setup UI
    setupRecipientSelect(staffUsers);
    setupTypingIndicator();

    // 2.5 Setup Attachment Listeners
    document.getElementById('attachment-btn').addEventListener('click', () => {
        attachmentInput.click();
    });

    attachmentInput.addEventListener('change', () => {
        const files = Array.from(attachmentInput.files);
        const validFiles = files.filter(f => f.type.startsWith('image/'));
        
        if (validFiles.length < files.length) {
            showToast('Only image files are allowed.', true);
        }

        selectedFiles = [...selectedFiles, ...validFiles];
        renderAttachments();
        attachmentInput.value = ''; // Reset input to allow re-selecting same file
    });

    function renderAttachments() {
        attachmentPreview.innerHTML = '';
        selectedFiles.forEach((file, index) => {
            const div = document.createElement('div');
            div.className = "relative bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-xs flex items-center gap-2";
            div.innerHTML = `
                <span class="truncate max-w-[100px]">${file.name}</span>
                <button type="button" class="text-red-500 font-bold hover:text-red-700" data-index="${index}">×</button>
            `;
            div.querySelector('button').addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.index);
                selectedFiles.splice(idx, 1);
                renderAttachments();
            });
            attachmentPreview.appendChild(div);
        });
    }

    // 3. Setup send message listener
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = messageInput.value.trim();
        
        // Allow sending if there is content OR attachments
        if (!content && selectedFiles.length === 0) return;

        const recipientId = document.getElementById('recipient-select').value;
        if (!recipientId) return;

        sendButton.disabled = true;
        sendButton.innerText = '...';

        try {
            // Compress Images
            const compressedFiles = await Promise.all(selectedFiles.map(async (file) => {
                try {
                    const options = { maxSizeMB: 0.2, maxWidthOrHeight: 1920, useWebWorker: true };
                    return await imageCompression(file, options);
                } catch (err) {
                    console.error("Compression failed for " + file.name, err);
                    return file; // Fallback to original if compression fails
                }
            }));

            await window.messagingService.sendMessage(recipientId, content, compressedFiles);
            messageInput.value = '';
            selectedFiles = [];
            renderAttachments();
            // The real-time listener will handle appending the new message
        } catch (err) {
            console.error("Failed to send message:", err);
            showToast('Message failed to send.', true);
        } finally {
            sendButton.disabled = false;
            sendButton.innerText = 'Send';
            messageInput.focus();
        }
    });

    // 4. Load initial conversation
    await loadAndRenderConversation();

    // 5. Subscribe to real-time updates
    pb.collection('messages').subscribe('*', handleRealtimeMessage);
}

function setupRecipientSelect(staffUsers) {
    if (document.getElementById('recipient-select')) return;

    const wrapper = document.createElement('div');
    wrapper.className = "flex items-center gap-2 mr-2";

    const label = document.createElement('label');
    label.htmlFor = 'recipient-select';
    label.className = "text-sm font-bold text-gray-600 dark:text-gray-300 whitespace-nowrap hidden sm:block";
    label.innerText = "Chat with Farmer:";

    const select = document.createElement('select');
    select.id = 'recipient-select';
    select.className = "max-w-[120px] sm:max-w-[150px] border border-gray-300 rounded px-2 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:border-lime-500 truncate";
    
    staffUsers.forEach(u => {
        const opt = document.createElement('option');
        opt.value = u.id;
        
        // Status Indicator (Online if updated within 15 mins)
        const isOnline = u.updated && (new Date() - new Date(u.updated) < 15 * 60 * 1000);
        const status = isOnline ? '🟢' : '⚫';
        
        opt.textContent = `${status} ${u.name || u.email}`;
        select.appendChild(opt);
    });

    // Default to Sammie or Nicky if available
    const preferred = staffUsers.find(u => u.name && (u.name.toLowerCase().includes('sammie') || u.name.toLowerCase().includes('nicky')));
    if (preferred) select.value = preferred.id;

    wrapper.appendChild(label);
    wrapper.appendChild(select);

    const form = document.getElementById('message-form');
    form.insertBefore(wrapper, form.firstChild);
}

function setupTypingIndicator() {
    if (document.getElementById('typing-indicator')) return;
    
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'hidden px-6 py-1 text-xs text-gray-500 italic dark:text-gray-400 animate-pulse bg-white dark:bg-gray-800';
    indicator.innerText = 'Farmer is typing...';
    
    // Insert above the input area
    const inputArea = messageForm.parentElement;
    inputArea.parentElement.insertBefore(indicator, inputArea);
}

async function loadAndRenderConversation() {
    try {
        const messages = await window.messagingService.getConversation();
        
        // Render messages first so they appear even if marking as read fails
        renderAllMessages(messages);

        // Also mark incoming messages as read (non-blocking)
        const unreadMessageIds = messages
            .filter(m => m.to_user === pb.authStore.model.id && !m.read)
            .map(m => m.id);

        if (unreadMessageIds.length > 0) {
            window.messagingService.markAsRead(unreadMessageIds).catch(e => console.warn("Background mark-read failed:", e));
        }
    } catch (err) {
        console.error("Error loading conversation:", err);
        messageHistoryEl.innerHTML = `<p class="text-center text-red-500">Failed to load messages.</p>`;
    }
}

function renderAllMessages(messages) {
    messageHistoryEl.innerHTML = ''; // Clear loading message
    if (messages.length === 0) {
        messageHistoryEl.innerHTML = `<p class="text-center italic text-gray-500">No messages yet. Say hello!</p>`;
        return;
    }
    messages.forEach(renderSingleMessage);
    scrollToBottom();
}

function renderSingleMessage(message) {
    // If the history was empty, clear the placeholder text first
    const placeholder = messageHistoryEl.querySelector('p');
    if (placeholder) {
        placeholder.remove();
    }

    const currentUserId = pb.authStore.model.id;
    const isMe = message.from_user === currentUserId;

    const messageWrapper = document.createElement('div');
    messageWrapper.className = `flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`;

    const messageBubble = document.createElement('div');
    messageBubble.className = `max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow ${isMe ? 'bg-lime-600 text-white rounded-br-lg' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-lg'}`;
    
    if (message.attachment && message.attachment.length > 0) {
        const attachments = Array.isArray(message.attachment) ? message.attachment : [message.attachment];
        const attachmentsDiv = document.createElement('div');
        attachmentsDiv.className = "flex flex-wrap gap-2 mb-2";
        
        attachments.forEach(filename => {
            const img = document.createElement('img');
            img.src = pb.files.getURL(message, filename, { 'thumb': '200x200' });
            img.className = "max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition border border-black/10 dark:border-white/10";
            img.style.maxHeight = "150px";
            img.onclick = () => window.open(pb.files.getURL(message, filename), '_blank');
            attachmentsDiv.appendChild(img);
        });
        messageBubble.appendChild(attachmentsDiv);
    }

    const contentDiv = document.createElement('div');
    contentDiv.innerText = message.content;
    messageBubble.appendChild(contentDiv);
    
    messageWrapper.appendChild(messageBubble);
    messageHistoryEl.appendChild(messageWrapper);
}

async function handleRealtimeMessage({ action, record }) {
    // We only care about new messages for this conversation
    if (action !== 'create') return;

    const currentUserId = pb.authStore.model.id;
    const involvedInConversation = 
        (record.from_user === currentUserId) || (record.to_user === currentUserId);

    if (involvedInConversation) {
        renderSingleMessage(record);
        scrollToBottom();
        
        if (record.to_user === currentUserId && !record.read) {
            window.messagingService.markAsRead([record.id]).catch(e => console.warn("Realtime mark-read failed:", e));
        }
    }
}

function scrollToBottom() {
    messageHistoryEl.scrollTop = messageHistoryEl.scrollHeight;
}


// --- PORTAL & EVENT LISTENERS ---

async function createPortalSession() {
    if (WORKER_URL === 'YOUR_WORKER_URL_HERE') {
        alert('Billing management is not configured. Please contact support.');
        return;
    }
    const customerId = pb.authStore.model.stripe_customer_id;
    if (!customerId) {
        alert('Could not find your billing information. Please contact support.');
        return;
    }

    billingPortalBtn.disabled = true;
    billingPortalBtn.textContent = 'Redirecting...';

    try {
        const response = await fetch(`${WORKER_URL}/create-portal-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerId,
                returnUrl: window.location.href,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create billing portal session.');
        }

        const { url } = await response.json();
        if (url) {
            window.location.href = url;
        } else {
            throw new Error('Portal URL not received.');
        }

    } catch (error) {
        console.error('Error creating portal session:', error);
        alert('There was a problem accessing the billing portal. Please try again.');
        billingPortalBtn.disabled = false;
        billingPortalBtn.textContent = 'Manage Billing / Cancel';
    }
}

function setupEventListeners(user) {
    if (!user) return;
    
    // Billing Portal Button
    if (billingPortalBtn) {
        billingPortalBtn.addEventListener('click', createPortalSession);
    }
    
    setupSubscriptionToggle(user);

    // Avatar preview
    avatarUpload.addEventListener('change', () => {
        const file = avatarUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                avatarPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Profile form submission
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = profileForm.querySelector('button[type="submit"]');
        button.disabled = true;
        button.innerText = 'Saving...';

        const formData = new FormData();
        formData.append('name', nicknameInput.value);

        const avatarFile = avatarUpload.files[0];
        if (avatarFile) {
            if (avatarFile.size > 500 * 1024) { // 500KB limit
                showToast('Avatar file is too large (max 500KB).', true);
                button.disabled = false;
                button.innerText = 'Save Profile';
                return;
            }
            formData.append('avatar', avatarFile);
        }

        try {
            const updatedRecord = await pb.collection('users').update(user.id, formData);
            pb.authStore.save(pb.authStore.token, updatedRecord);
            showToast('Profile saved successfully!');
            renderUserProfile(updatedRecord);
        } catch (err) {
            console.error('Profile update failed:', err);
            showToast(`Error: ${err.message}`, true);
        } finally {
            button.disabled = false;
            button.innerText = 'Save Profile';
        }
    });

    // Password form submission
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = passwordForm.querySelector('button[type="submit"]');
        button.disabled = true;
        button.innerText = 'Changing...';

        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        try {
            await pb.collection('users').update(user.id, {
                oldPassword: oldPassword,
                password: newPassword,
                passwordConfirm: confirmPassword,
            });
            showToast('Password changed successfully!');
            passwordForm.reset();
        } catch (err) {
            console.error('Password change failed:', err);
            showToast(`Error: ${err.message}`, true);
        } finally {
            button.disabled = false;
            button.innerText = 'Change Password';
        }
    });
}

function setupSubscriptionToggle(user) {
    if (!subscriptionToggle) return;
    subscriptionToggle.addEventListener('change', async () => {
        const isSubscribed = subscriptionToggle.checked;
        subscriptionToggle.disabled = true;

        try {
            let existingRecord = null;
            try {
                existingRecord = await pb.collection('subscribers').getFirstListItem(`email = "${user.email}"`);
            } catch (e) {
                if (e.status !== 404) throw e;
            }

            if (isSubscribed) {
                if (existingRecord) {
                    if (!existingRecord.active) {
                        await pb.collection('subscribers').update(existingRecord.id, { active: true });
                    }
                } else {
                    await pb.collection('subscribers').create({
                        email: user.email,
                        name: user.name || '',
                        active: true,
                    });
                }
                showToast('Newsletter subscription activated!');
            } else {
                if (existingRecord) {
                    await pb.collection('subscribers').update(existingRecord.id, { active: false });
                    showToast('Newsletter subscription deactivated.');
                }
            }
        } catch (err) {
            console.error("Subscription update failed:", err);
            showToast(`Error: ${err.message}`, true);
            subscriptionToggle.checked = !isSubscribed; // Revert
        } finally {
            subscriptionToggle.disabled = false;
        }
    });
}
