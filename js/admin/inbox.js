export function initInbox(pb, messagingService) {
    const inboxUserList = document.getElementById('inbox-user-list');
    const inboxChatView = document.getElementById('inbox-chat-view');
    const inboxChatHeader = document.getElementById('inbox-chat-header');
    const inboxMessageHistory = document.getElementById('inbox-message-history');
    const inboxReplyForm = document.getElementById('inbox-reply-form');
    const inboxMessageInput = document.getElementById('inbox-message-input');
    const sendReplyBtn = document.getElementById('send-reply-btn');
    const attachmentInput = document.getElementById('inbox-attachment-input');
    const attachmentBtn = document.getElementById('inbox-attachment-btn');
    const attachmentPreview = document.getElementById('inbox-attachment-preview');

    if (!inboxUserList) {
        // Silently fail if the inbox widget is not on the page
        return;
    }

    let users = [];
    let activeUserId = null;
    let staffUsers = [];
    let selectedFiles = [];
    const currentUser = pb.authStore.model;

    async function initialize() {
        if (!currentUser?.is_admin && !currentUser?.role === 'superadmin') {
            console.warn('User is not an admin. Inbox will not be initialized.');
            document.getElementById('inbox-section').classList.add('hidden');
            return;
        }
        
        // 1. Fetch Staff List
        try {
            staffUsers = await pb.collection('users').getFullList({ 
                filter: 'is_super_user = true' 
            });
        } catch (e) {
            console.error("Failed to fetch staff list:", e);
            staffUsers = [currentUser];
        }

        setupReplyAsDropdown();
        await loadUserList();
        setupRealtimeListeners();
        setupAttachments();
    }

    function setupAttachments() {
        if (attachmentBtn && attachmentInput) {
            attachmentBtn.addEventListener('click', () => attachmentInput.click());
            
            attachmentInput.addEventListener('change', () => {
                if (attachmentInput.files) {
                    const files = Array.from(attachmentInput.files);
                    const validFiles = files.filter(f => f.type.startsWith('image/'));
                    selectedFiles = [...selectedFiles, ...validFiles];
                    renderAttachments();
                    attachmentInput.value = ''; // Reset to allow re-selecting same file
                }
            });
        }
    }

    function renderAttachments() {
        if (!attachmentPreview) return;
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

    function setupReplyAsDropdown() {
        if (document.getElementById('reply-as-select')) return;

        const select = document.createElement('select');
        select.id = 'reply-as-select';
        select.className = 'border border-gray-300 rounded px-2 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white mr-2 outline-none focus:border-lime-500';
        select.title = "Reply As...";

        staffUsers.forEach(staff => {
            const opt = document.createElement('option');
            opt.value = staff.id;
            opt.textContent = staff.name || staff.email;
            select.appendChild(opt);
        });

        // Default selection: Current User -> Sammie -> First in list
        if (staffUsers.find(u => u.id === currentUser.id)) {
            select.value = currentUser.id;
        } else {
            const sammie = staffUsers.find(u => (u.name && u.name.toLowerCase().includes('sammie')));
            if (sammie) select.value = sammie.id;
        }

        inboxReplyForm.insertBefore(select, inboxMessageInput);
    }

    async function loadUserList() {
        if (staffUsers.length === 0) return;

        const staffIds = staffUsers.map(u => u.id);
        // Filter: Messages where ANY staff member is the sender OR receiver
        const staffFilter = staffIds.map(id => `from_user="${id}" || to_user="${id}"`).join(' || ');

        const allMessages = await pb.collection('messages').getFullList({
            filter: `(${staffFilter})`,
            sort: '-created',
            expand: 'from_user,to_user'
        });

        const conversations = {};
        allMessages.forEach(msg => {
            const isFromStaff = staffIds.includes(msg.from_user);
            const otherUserId = isFromStaff ? msg.to_user : msg.from_user;
            
            if (!conversations[otherUserId]) {
                const otherUser = isFromStaff ? msg.expand?.to_user : msg.expand?.from_user;
                if (!otherUser) return;

                conversations[otherUserId] = {
                    user: otherUser,
                    lastMessage: msg,
                    unreadCount: 0
                };
            }

            // Count unread if message is from the member (not staff) and not read
            if (!staffIds.includes(msg.from_user) && !msg.read) {
                conversations[otherUserId].unreadCount++;
            }
        });

        users = Object.values(conversations).sort((a,b) => new Date(b.lastMessage.created) - new Date(a.lastMessage.created));
        renderUserList();
    }

    function renderUserList() {
        inboxUserList.innerHTML = '';
        if (users.length === 0) {
            inboxUserList.innerHTML = `<p class="p-4 text-sm text-gray-500">No conversations yet.</p>`;
            return;
        }
        users.forEach(conv => {
            const userEl = document.createElement('div');
            userEl.className = 'p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between';
            userEl.dataset.userId = conv.user.id;
            
            const avatarUrl = conv.user.avatar 
                ? pb.files.getURL(conv.user, conv.user.avatar, {'thumb': '100x100'}) 
                : `https://placehold.co/40x40/e2e8f0/475569?text=${(conv.user.name || 'U').charAt(0)}`;

            // Determine context (who the member is talking to)
            const lastMsg = conv.lastMessage;
            let staffContext = '';
            const staffSender = staffUsers.find(u => u.id === lastMsg.from_user);
            const staffReceiver = staffUsers.find(u => u.id === lastMsg.to_user);

            if (staffSender) {
                staffContext = `<span class="text-[10px] text-lime-600 dark:text-lime-400 font-bold uppercase ml-2">↩ ${staffSender.name}</span>`;
            } else if (staffReceiver) {
                staffContext = `<span class="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase ml-2">➡ ${staffReceiver.name}</span>`;
            }

            userEl.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${avatarUrl}" alt="${conv.user.name}" class="w-10 h-10 rounded-full object-cover bg-gray-300">
                    <div class="overflow-hidden">
                        <div class="flex items-center">
                            <p class="font-bold text-gray-800 dark:text-gray-100 truncate">${conv.user.name || conv.user.email}</p>
                            ${staffContext}
                        </div>
                        <p class="text-sm text-gray-500 truncate" style="max-width: 150px;">${conv.lastMessage.content}</p>
                    </div>
                </div>
                ${conv.unreadCount > 0 ? `<span class="bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">${conv.unreadCount}</span>` : ''}
            `;

            userEl.addEventListener('click', () => handleUserSelection(conv.user.id));
            inboxUserList.appendChild(userEl);
        });
        
        if (activeUserId) {
            const activeEl = inboxUserList.querySelector(`[data-user-id="${activeUserId}"]`);
            if (activeEl) {
                activeEl.classList.add('bg-gray-100', 'dark:bg-gray-900');
            }
        }
    }

    async function markAsUnread(userId) {
        try {
            // Find the last message sent BY the user to mark as unread
            const lastMsg = await pb.collection('messages').getFirstListItem(`from_user="${userId}"`, {
                sort: '-created'
            });

            if (lastMsg) {
                await pb.collection('messages').update(lastMsg.id, { read: false });
                
                // Update local state to reflect unread status
                const conv = users.find(c => c.user.id === userId);
                if (conv) {
                    conv.unreadCount = 1;
                    renderUserList();
                }

                // Deselect and hide chat view
                activeUserId = null;
                inboxChatView.classList.add('hidden');
                const allUserEls = inboxUserList.querySelectorAll('[data-user-id]');
                allUserEls.forEach(el => el.classList.remove('bg-gray-100', 'dark:bg-gray-900'));
            }
        } catch (err) {
            console.error("Failed to mark as unread:", err);
            alert("Could not mark as unread.");
        }
    }

    async function handleUserSelection(userId) {
        if (activeUserId === userId) return;

        activeUserId = userId;
        inboxChatView.classList.remove('hidden');

        const allUserEls = inboxUserList.querySelectorAll('[data-user-id]');
        allUserEls.forEach(el => el.classList.remove('bg-gray-100', 'dark:bg-gray-900'));
        inboxUserList.querySelector(`[data-user-id="${userId}"]`)?.classList.add('bg-gray-100', 'dark:bg-gray-900');
        
        const selectedConversation = users.find(c => c.user.id === userId);
        
        // Render Header with Mark Unread Button
        inboxChatHeader.innerHTML = `
            <div class="flex justify-between items-center w-full">
                <span class="font-bold truncate">Conversation with ${selectedConversation.user.name || selectedConversation.user.email}</span>
                <button id="mark-unread-btn" class="ml-2 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 px-3 py-1 rounded shadow-sm transition flex items-center gap-1 text-gray-700 dark:text-gray-200">
                    <span>📫</span> Mark Unread
                </button>
            </div>
        `;

        document.getElementById('mark-unread-btn')?.addEventListener('click', () => markAsUnread(userId));
        
        await loadAndRenderConversation(userId);
    }
    
    async function loadAndRenderConversation(userId) {
        // Fetch messages between userId and ANY staff member
        const staffIds = staffUsers.map(u => u.id);
        const staffFilter = staffIds.map(id => `from_user="${id}" || to_user="${id}"`).join(' || ');
        const filter = `(from_user="${userId}" || to_user="${userId}") && (${staffFilter})`;

        const messages = await pb.collection('messages').getFullList({
            filter: filter,
            sort: 'created',
            expand: 'from_user'
        });

        renderAllMessages(messages);

        // Mark messages from this user as read
        const unreadIds = messages.filter(m => m.from_user === userId && !m.read).map(m => m.id);
        if (unreadIds.length > 0) {
            await messagingService.markAsRead(unreadIds);
            const convIndex = users.findIndex(c => c.user.id === userId);
            if (convIndex > -1) {
                users[convIndex].unreadCount = 0;
                renderUserList();
            }
        }
    }

    function renderAllMessages(messages) {
        inboxMessageHistory.innerHTML = '';
        if (messages.length === 0) {
            inboxMessageHistory.innerHTML = `<p class="text-center italic text-gray-500">No messages in this conversation.</p>`;
            return;
        }
        messages.forEach(renderSingleMessage);
        scrollToBottom();
    }
    
    function renderSingleMessage(message) {
        // Prevent duplicates (Realtime + Optimistic UI)
        if (document.getElementById(`msg-${message.id}`)) return;

        // Determine alignment: Left if it's from the person we are talking to, Right otherwise (Staff/Me)
        const isIncoming = message.from_user === activeUserId;
        
        const messageWrapper = document.createElement('div');
        messageWrapper.id = `msg-${message.id}`;
        messageWrapper.className = `flex items-end gap-2 ${isIncoming ? 'justify-start' : 'justify-end'}`;

        const messageBubble = document.createElement('div');
        messageBubble.className = `max-w-md px-4 py-2 rounded-2xl shadow ${isIncoming ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-lg' : 'bg-lime-600 text-white rounded-br-lg'}`;
        
        // Show sender name only for outgoing messages (Right side), but hide if it's ME to reduce clutter
        if (!isIncoming) {
            const sender = staffUsers.find(u => u.id === message.from_user);
            if (sender && sender.id !== currentUser.id) {
                const senderDiv = document.createElement('div');
                senderDiv.className = "text-[10px] opacity-75 mb-1 text-right font-bold uppercase tracking-wider";
                senderDiv.innerText = sender.name || 'Staff';
                messageBubble.appendChild(senderDiv);
            }
        }

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

        const placeholder = inboxMessageHistory.querySelector('p');
        if(placeholder) placeholder.remove();

        inboxMessageHistory.appendChild(messageWrapper);
    }

    inboxReplyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = inboxMessageInput.value.trim();
        
        // Allow sending if there is content OR attachments
        if ((!content && selectedFiles.length === 0) || !activeUserId) return;

        const select = document.getElementById('reply-as-select');
        const fromUserId = select ? select.value : currentUser.id;

        sendReplyBtn.disabled = true;
        sendReplyBtn.innerText = '...';

        try {
            // Compress Images if available
            const compressedFiles = await Promise.all(selectedFiles.map(async (file) => {
                try {
                    if (window.imageCompression) {
                        const options = { maxSizeMB: 0.2, maxWidthOrHeight: 1920, useWebWorker: true };
                        return await window.imageCompression(file, options);
                    }
                    return file;
                } catch (err) {
                    console.error("Compression failed", err);
                    return file;
                }
            }));

            const formData = new FormData();
            formData.append('content', content);
            formData.append('from_user', fromUserId);
            formData.append('to_user', activeUserId);
            formData.append('read', 'false');
            
            compressedFiles.forEach(file => {
                formData.append('attachment', file);
            });

            // Send message using FormData
            const newMessage = await pb.collection('messages').create(formData);

            renderSingleMessage(newMessage);
            scrollToBottom();
            inboxMessageInput.value = '';
            selectedFiles = [];
            renderAttachments();

            // Refresh user list to show the new "last message"
            const convIndex = users.findIndex(c => c.user.id === activeUserId);
             if (convIndex > -1) {
                users[convIndex].lastMessage = newMessage;
                users.sort((a,b) => new Date(b.lastMessage.created) - new Date(a.lastMessage.created));
                renderUserList();
            }

        } catch (err) {
            console.error('Failed to send reply:', err);
            alert('Failed to send reply. Check console for details.');
        } finally {
            sendReplyBtn.disabled = false;
            sendReplyBtn.innerText = 'Reply';
        }
    });

    function setupRealtimeListeners() {
        pb.collection('messages').subscribe('*', async ({ action, record }) => {
            if (action !== 'create') return;

            const staffIds = staffUsers.map(u => u.id);
            const isFromStaff = staffIds.includes(record.from_user);
            const isToStaff = staffIds.includes(record.to_user);

            if (!isFromStaff && !isToStaff) return;

            const otherUserId = isFromStaff ? record.to_user : record.from_user;
            const conversation = users.find(c => c.user.id === otherUserId);

            if (conversation) {
                if (otherUserId === activeUserId) {
                    if (!isFromStaff) {
                    await messagingService.markAsRead([record.id]);
                    }
                    renderSingleMessage(record);
                    scrollToBottom();
                } else {
                    if (!isFromStaff) {
                        conversation.unreadCount = (conversation.unreadCount || 0) + 1;
                    }
                }
                conversation.lastMessage = record;
                users.sort((a,b) => new Date(b.lastMessage.created) - new Date(a.lastMessage.created));
                renderUserList();
            } else {
                 // It's a completely new conversation, reload the whole list
                 await loadUserList();
            }
        });
    }

    function scrollToBottom() {
        inboxMessageHistory.scrollTop = inboxMessageHistory.scrollHeight;
    }

    initialize();
}
