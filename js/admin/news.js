// js/admin/news.js
import { FarmService } from '../services.js';
import { showToast } from './utils.js';

let newsData = null;
let newsletterData = [];
let sentNewsletters = [];
let quill;

function renderNewsSection() {
    const newsInput = document.getElementById('newsInput');
    if (newsInput) {
        newsInput.value = newsData ? newsData.news : '';
    }
}

function renderNewsletterSection() {
    const newsletterSubCount = document.getElementById('newsletterSubCount');
    if (newsletterSubCount) {
        // This will be updated once subscriber data is loaded elsewhere
    }

    if (!document.getElementById('editor')) {
        // If the editor is not on the page, don't initialize
        return;
    }

    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ]
        }
    });

    // For now, we'll just load the most recent draft.
    // A more complex UI would let you pick from a list of drafts.
    const latestDraft = newsletterData.find(n => n.status === 'draft');
    if (latestDraft) {
        document.getElementById('newsletterSubject').value = latestDraft.subject;
        quill.root.innerHTML = latestDraft.body;
        // Store the ID on the element for easy access
        document.getElementById('editor').dataset.draftId = latestDraft.id;
    }

    renderSentNewsletters();
}

function renderSentNewsletters() {
    const sentList = document.getElementById('sentNewslettersList');
    if (!sentList) return;

    if (sentNewsletters.length === 0) {
        sentList.innerHTML = '<p class="text-gray-500 text-sm">No newsletters have been sent yet.</p>';
        return;
    }

    sentList.innerHTML = sentNewsletters.map(n => {
        const sentDate = new Date(n.sent_at).toLocaleString();
        return `
            <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700 mb-3">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-gray-800 dark:text-gray-200">${n.subject}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">${sentDate}</p>
                    </div>
                    <button data-id="${n.id}" class="resend-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-lg text-xs transition">Resend</button>
                </div>
                <div class="mt-2 text-sm text-gray-600 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none">${n.body}</div>
            </div>
        `;
    }).join('');
}

function repopulateNewsletter(id) {
    const newsletter = sentNewsletters.find(n => n.id === id);
    if (newsletter) {
        document.getElementById('newsletterSubject').value = newsletter.subject;
        quill.root.innerHTML = newsletter.body;
        showToast('Newsletter content has been loaded into the editor.');
    }
}

function clearNewsletterForm() {
    document.getElementById('newsletterSubject').value = '';
    quill.root.innerHTML = '';
    document.getElementById('editor').dataset.draftId = '';
    showToast('Form cleared.');
}

let lastSavedSubject = '';
let lastSavedBody = '';

async function autoSaveDraft() {
    const subject = document.getElementById('newsletterSubject').value;
    const body = quill.root.innerHTML;

    if (subject === lastSavedSubject && body === lastSavedBody) {
        return; // No changes
    }

    if (!subject && quill.getLength() <= 1) {
        return; // Don't save empty drafts
    }

    lastSavedSubject = subject;
    lastSavedBody = body;

    await saveNewsletter('draft');
}

async function saveNews() {
    const newsInput = document.getElementById('newsInput');
    const newsText = newsInput.value.trim();

    try {
        if (newsData && newsData.id) {
            await FarmService.updateFarmStatus(newsData.id, { news: newsText });
        } else {
            // This assumes a record might not exist yet. A more robust solution
            // would be to create it if it's null.
            console.error("FarmStatus record does not exist.");
            showToast('Error: FarmStatus record not found.', true);
            return;
        }
        newsData.news = newsText;
        showToast('The Roost alert updated!');
    } catch (err) {
        console.error('Error saving The Roost alert:', err);
        showToast('Failed to save The Roost alert.', true);
    }
}

async function saveNewsletter(status) {
    const subject = document.getElementById('newsletterSubject').value;
    const body = quill.root.innerHTML;
    const draftId = document.getElementById('editor').dataset.draftId;

    if (status !== 'preview' && (!subject || quill.getLength() <= 1)) {
        showToast('Subject and content are required.', true);
        return;
    }

    if (status === 'preview') {
        sessionStorage.setItem('newsletterPreviewSubject', subject);
        sessionStorage.setItem('newsletterPreviewBody', body);
        window.open('newsletter-preview.html', '_blank');
        return;
    }
    
    const data = { subject, body, status };

    try {
        if (status === 'sent') {
            const alreadySent = sentNewsletters.find(n => n.subject === subject && n.body === body);
            if (alreadySent) {
                if (!confirm('This exact newsletter has been sent before. Are you sure you want to send it again?')) {
                    return;
                }
            } else {
                if (!confirm('Are you sure you want to send this to all subscribers?')) {
                    return;
                }
            }

            if (draftId) {
                await FarmService.updateNewsletter(draftId, data);
                await FarmService.sendNewsletter(draftId, subject, body);
            } else {
                const newNewsletter = await FarmService.createNewsletter(data);
                await FarmService.sendNewsletter(newNewsletter.id, subject, body);
            }
            showToast('Newsletter sent!');
        } else { // draft
            if (draftId) {
                await FarmService.updateNewsletter(draftId, data);
            } else {
                const newDraft = await FarmService.createNewsletter(data);
                document.getElementById('editor').dataset.draftId = newDraft.id;
            }
            showToast('Newsletter draft saved!');
        }
        // Refresh data after saving
        [newsletterData, sentNewsletters] = await Promise.all([
            FarmService.getNewsletters(),
            FarmService.getSentNewsletters()
        ]);
        renderSentNewsletters();
    } catch (err) {
        console.error('Error saving newsletter:', err);
        showToast('Failed to save newsletter.', true);
    }
}

async function fetchData() {
    try {
        [newsData, newsletterData, sentNewsletters] = await Promise.all([
            FarmService.getFarmStatus(),
            FarmService.getNewsletters().catch(err => {
                if (err.status === 404) {
                    console.warn('Newsletters collection not found, defaulting to empty array.');
                    return [];
                }
                throw err;
            }),
            FarmService.getSentNewsletters().catch(err => {
                if (err.status === 404) {
                    console.warn('Sent newsletters collection not found, defaulting to empty array.');
                    return [];
                }
                throw err;
            })
        ]);
    } catch (err) {
        console.error("Error fetching The Roost data:", err);
        showToast('Could not load The Roost data.', true);
    }
}

export async function initNews(pb) {
    FarmService.init(pb);

    // Initial data fetch
    await fetchData();

    // Render the initial state
    renderNewsSection();
    renderNewsletterSection();

    // Attach event listeners
    // Use event delegation on a parent element if these are dynamically added
    document.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'saveNewsBtn') {
            saveNews();
        }
        if (event.target && event.target.id === 'saveDraftBtn') {
            saveNewsletter('draft');
        }
        if (event.target && event.target.id === 'sendNewsletterBtn') {
            saveNewsletter('sent');
        }
        if (event.target && event.target.id === 'previewBtn') {
            saveNewsletter('preview');
        }
        if (event.target && event.target.classList.contains('resend-btn')) {
            repopulateNewsletter(event.target.dataset.id);
        }
        if (event.target && event.target.id === 'newBtn') {
            clearNewsletterForm();
        }
    });

    setInterval(autoSaveDraft, 30000); // Auto-save every 30 seconds
}
