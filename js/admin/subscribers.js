// js/admin/subscribers.js

export function initSubscribers(pb) {
    const container = document.getElementById('subscribersList');
    const countBadge = document.getElementById('subscriberCount');
    const copyBtn = document.getElementById('copyEmailsBtn');

    if (!container) return;

    async function load() {
        container.innerHTML = '<tr><td colspan="4" class="p-4 text-center">Loading...</td></tr>';
        try {
            const subs = await pb.collection('subscribers').getFullList({ sort: '-created' });
            
            if (countBadge) countBadge.innerText = `${subs.length} Total`;

            if (subs.length === 0) {
                container.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500">No subscribers found.</td></tr>';
                return;
            }

            container.innerHTML = subs.map(sub => {
                const created = new Date(sub.created).toLocaleDateString();
                const statusColor = sub.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
                
                return `
                    <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td class="p-3 font-mono text-sm dark:text-gray-200">${sub.email}</td>
                        <td class="p-3 text-sm text-gray-500">${created}</td>
                        <td class="p-3">
                            <span class="text-xs font-bold px-2 py-1 rounded ${statusColor}">
                                ${sub.active ? 'Active' : 'Unsub'}
                            </span>
                        </td>
                        <td class="p-3 text-right">
                            <button class="text-red-500 hover:text-red-700 font-bold text-xs delete-sub-btn" data-id="${sub.id}">Delete</button>
                        </td>
                    </tr>
                `;
            }).join('');

            // Attach delete listeners
            container.querySelectorAll('.delete-sub-btn').forEach(btn => {
                btn.addEventListener('click', handleDelete);
            });

            // Setup Copy Button
            if (copyBtn) {
                copyBtn.onclick = () => {
                    const emails = subs.map(s => s.email).join(', ');
                    navigator.clipboard.writeText(emails).then(() => {
                        const originalText = copyBtn.innerText;
                        copyBtn.innerText = "Copied!";
                        setTimeout(() => copyBtn.innerText = originalText, 2000);
                    });
                };
            }

        } catch (e) {
            console.error(e);
            container.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-red-500">Error loading subscribers.</td></tr>';
        }
    }

    async function handleDelete(e) {
        if (!confirm("Are you sure you want to delete this subscriber?")) return;
        const id = e.target.dataset.id;
        try {
            await pb.collection('subscribers').delete(id);
            load();
        } catch (err) {
            alert("Error deleting: " + err.message);
        }
    }

    load();
}
