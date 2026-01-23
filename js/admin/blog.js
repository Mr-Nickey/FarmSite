// js/admin/blog.js
import { compressImage } from './utils.js';

// --- Elements ---
const createPostBtn = document.getElementById('createPostBtn');
const blogPostsList = document.getElementById('blogPostsList');
const appModal = document.getElementById('appModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalCancel = document.getElementById('modalCancel');
const modalConfirm = document.getElementById('modalConfirm');

let pb; // PocketBase instance
let postsCache = []; // To hold the fetched posts
let quill; // For the rich text editor

/**
 * Initializes the blog management functionality.
 * @param {import('pocketbase').default} pocketbaseInstance 
 */
export function initBlog(pocketbaseInstance) {
    if (!createPostBtn || !blogPostsList || !appModal) {
        console.error("Blog management elements not found. Aborting initBlog.");
        return;
    }
    pb = pocketbaseInstance;

    createPostBtn.addEventListener('click', () => openPostModal());
    modalCancel.addEventListener('click', closeModal);
    appModal.addEventListener('click', (e) => {
        if (e.target === appModal) {
            closeModal();
        }
    });

    fetchAndRenderPosts();
}

/**
 * Fetches posts from PocketBase and renders them in the table.
 */
async function fetchAndRenderPosts() {
    try {
        postsCache = await pb.collection('posts').getFullList({
            sort: '-created',
        });
        renderPosts(postsCache);
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        blogPostsList.innerHTML = `<tr><td colspan="4" class="text-center text-red-500 p-4">Failed to load posts.</td></tr>`;
    }
}

/**
 * Renders the provided posts into the blog posts table.
 * @param {Array<Object>} posts 
 */
function renderPosts(posts) {
    blogPostsList.innerHTML = ''; // Clear existing content
    if (posts.length === 0) {
        blogPostsList.innerHTML = `<tr><td colspan="4" class="text-center text-gray-500 p-4">No posts yet. Click "Create New Post" to start.</td></tr>`;
        return;
    }

    posts.forEach(post => {
        let visibilityIcon = '';
        if (post.visibility === 'supporters') visibilityIcon = `<span title="Supporters Only">🔒</span>`;
        else if (post.visibility === 'draft') visibilityIcon = `<span title="Draft">📝</span>`;
        else if (post.visibility === 'tier1') visibilityIcon = `<span title="Tier 1+">🥇</span>`;
        else if (post.visibility === 'tier2') visibilityIcon = `<span title="Tier 2+">🥈</span>`;
        else if (post.visibility === 'tier3') visibilityIcon = `<span title="Tier 3+">🥉</span>`;
        else visibilityIcon = `<span title="Public">🌍</span>`;

        const tr = document.createElement('tr');
        tr.className = 'border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50';
        tr.innerHTML = `
            <td class="p-2 font-semibold">${post.title}</td>
            <td class="p-2 text-sm text-gray-600 dark:text-gray-400">${new Date(post.created).toLocaleDateString()}</td>
            <td class="p-2 text-center">${visibilityIcon}</td>
            <td class="p-2">
                <button data-id="${post.id}" class="edit-btn text-blue-500 hover:underline text-sm font-bold">Edit</button>
                <button data-id="${post.id}" class="delete-btn text-red-500 hover:underline text-sm font-bold ml-2">Delete</button>
            </td>
        `;
        blogPostsList.appendChild(tr);
    });

    // Add event listeners for the new buttons
    blogPostsList.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', handleEdit));
    blogPostsList.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', handleDelete));
}

/**
 * Opens the modal to create or edit a post.
 * @param {Object|null} [post=null] The post object to edit. If null, creates a new post.
 */
async function openPostModal(post = null) {
    modalTitle.textContent = post ? 'Edit Post' : 'Create New Post';
    
    let authorSelectHtml = '';
    if (pb.authStore.isSuperuser) {
        try {
            const users = await pb.collection('users').getFullList({ sort: 'email' });
            const options = users.map(u => `<option value="${u.id}" ${post?.author === u.id ? 'selected' : ''}>${u.name || u.email}</option>`).join('');
            authorSelectHtml = `
            <div>
                <label for="postAuthor" class="block text-sm font-bold text-gray-500 mb-1">Author (Superuser Override)</label>
                <select id="postAuthor" name="author" class="w-full border-2 p-2 rounded-lg dark:bg-gray-700 dark:border-gray-600" required>
                    <option value="">-- Select Author --</option>
                    ${options}
                </select>
            </div>`;
        } catch (e) { console.warn("Error fetching users for author select:", e); }
    }

    const coverImage = post?.cover_images && (Array.isArray(post.cover_images) ? post.cover_images[0] : post.cover_images);
    const coverImageHtml = coverImage ? `<img src="${pb.files.getURL(post, coverImage, {'thumb': '100x100'})}" class="mt-2 w-24 h-24 object-cover rounded">` : '';

    modalContent.innerHTML = `
        <form id="postForm" class="space-y-4">
            <input type="hidden" name="id" value="${post?.id || ''}">
            <div>
                <label for="postTitle" class="block text-sm font-bold text-gray-500 mb-1">Title</label>
                <input type="text" id="postTitle" name="title" class="w-full border-2 p-2 rounded-lg dark:bg-gray-700 dark:border-gray-600" required value="${(post?.title || '').replace(/"/g, '&quot;')}">
            </div>
            <div>
                <label for="postSlug" class="block text-sm font-bold text-gray-500 mb-1">Slug</label>
                <input type="text" id="postSlug" name="slug" class="w-full border-2 p-2 rounded-lg dark:bg-gray-700 dark:border-gray-600" value="${post?.slug || ''}">
            </div>
            <div>
                <label for="postExcerpt" class="block text-sm font-bold text-gray-500 mb-1">Excerpt</label>
                <textarea id="postExcerpt" name="excerpt" rows="2" class="w-full border-2 p-2 rounded-lg dark:bg-gray-700 dark:border-gray-600">${post?.excerpt || ''}</textarea>
            </div>
            <div>
                <label for="postYoutube" class="block text-sm font-bold text-gray-500 mb-1">YouTube Video ID</label>
                <input type="text" id="postYoutube" name="youtube_video_id" class="w-full border-2 p-2 rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., dQw4w9WgXcQ" value="${post?.youtube_video_id || ''}">
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" id="postSticky" name="is_sticky" class="w-5 h-5 accent-green-600" ${post?.is_sticky ? 'checked' : ''}>
                <label for="postSticky" class="text-sm font-bold text-gray-500">Pin to Top (Sticky)</label>
            </div>
            <div>
                <label for="postVisibility" class="block text-sm font-bold text-gray-500 mb-1">Visibility</label>
                <select id="postVisibility" name="visibility" class="w-full border-2 p-2 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                    <option value="draft" ${post?.visibility === 'draft' ? 'selected' : ''}>Draft 📝</option>
                    <option value="public" ${post?.visibility === 'public' || !post?.visibility ? 'selected' : ''}>Public 🌍</option>
                    <option value="supporters" ${post?.visibility === 'supporters' ? 'selected' : ''}>Supporters Only 🔒</option>
                    <option value="tier1" ${post?.visibility === 'tier1' ? 'selected' : ''}>Tier 1+ (Flock Friend) 🥇</option>
                    <option value="tier2" ${post?.visibility === 'tier2' ? 'selected' : ''}>Tier 2+ (Coop Keeper) 🥈</option>
                    <option value="tier3" ${post?.visibility === 'tier3' ? 'selected' : ''}>Tier 3+ (Homestead Hero) 🥉</option>
                </select>
            </div>
            ${authorSelectHtml}
            <div>
                <label class="block text-sm font-bold text-gray-500 mb-1">Content</label>
                <div id="postEditor" style="height: 200px;"></div>
            </div>
            <div>
                <label for="postImages" class="block text-sm font-bold text-gray-500 mb-1">Cover Image</label>
                <input type="file" id="postImages" name="cover_images" class="w-full border-2 p-2 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                 ${coverImageHtml}
            </div>
        </form>
    `;

    // Initialize Quill editor
    quill = new Quill('#postEditor', {
        theme: 'snow',
        placeholder: 'Write your farm update here...',
    });
    
    // Set initial content if editing
    if (post && post.content) {
        quill.root.innerHTML = post.content;
    }

    // Unbind previous listener and bind the new one
    modalConfirm.replaceWith(modalConfirm.cloneNode(true));
    document.getElementById('modalConfirm').addEventListener('click', handleSave);

    appModal.classList.remove('hidden');
    appModal.classList.add('flex');
}


function closeModal() {
    appModal.classList.add('hidden');
    appModal.classList.remove('flex');
    modalContent.innerHTML = ''; // Clean up
    if (quill) {
        quill = null;
    }
}

/**
 * Handles the save button click in the modal.
 */
async function handleSave() {
    const form = document.getElementById('postForm');
    if (!form.reportValidity()) {
        return;
    }

    modalConfirm.disabled = true;
    modalConfirm.textContent = 'Saving...';

    const formData = new FormData(form);
    const postId = formData.get('id');
    
    // FIX: Remove empty ID so PocketBase auto-generates it on create
    if (!postId) {
        formData.delete('id');
    }

    // Handle Checkbox explicitly for FormData
    // Use 'true'/'false' strings for boolean fields in FormData
    const isSticky = document.getElementById('postSticky').checked;
    formData.set('is_sticky', isSticky.toString());

    // Remove empty slug to allow auto-generation
    // If slug is present, ensure it is slugified (lowercase, hyphens)
    let slug = formData.get('slug');
    if (!slug) {
        // Auto-generate slug from title if empty to prevent validation errors
        const title = formData.get('title') || '';
        slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        if (slug) formData.set('slug', slug);
        else formData.delete('slug');
    } else {
        slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        formData.set('slug', slug);
    }

    // Add Quill content to formData
    formData.set('content', quill.root.innerHTML);

    // Handle Image Compression
    const fileInput = document.getElementById('postImages');
    if (fileInput && fileInput.files.length > 0) {
        try {
            const compressedFile = await compressImage(fileInput.files[0], { maxWidth: 1200, maxSizeBytes: 500 * 1024 });
            console.log(`Image compressed: ${(fileInput.files[0].size/1024).toFixed(2)}KB -> ${(compressedFile.size/1024).toFixed(2)}KB`);
            if (compressedFile.size > 0) {
                formData.set('cover_images', compressedFile);
            }
        } catch (e) {
            console.error("Image compression failed:", e);
            // If compression fails, remove the image to prevent sending potentially problematic file
            formData.delete('cover_images');
            alert("Image compression failed. The post will be saved without the cover image.");
        }
    } else {
        formData.delete('cover_images');
    }

    // Validate YouTube ID - extract from URL if necessary
    let youtubeId = (formData.get('youtube_video_id') || '').trim();
    if (!youtubeId) {
        // Remove empty YouTube ID to prevent validation errors if field is not required
        formData.delete('youtube_video_id');
    } else {
        if (youtubeId.includes('youtube.com') || youtubeId.includes('youtu.be')) {
            try {
                const url = new URL(youtubeId);
                if (url.hostname === 'youtu.be') {
                    youtubeId = url.pathname.slice(1);
                } else {
                    youtubeId = url.searchParams.get('v');
                }
            } catch (e) {
                console.warn("Invalid YouTube URL, saving as is.", e);
            }
        }
        formData.set('youtube_video_id', youtubeId);
    }

    // Validate Author for Superusers
    if (pb.authStore.isSuperuser && !formData.get('author')) {
        alert("As a Superuser, you must select an Author for the post.");
        modalConfirm.disabled = false;
        modalConfirm.textContent = 'Confirm';
        return;
    }

    try {
        if (postId) {
            // Update existing post
            await pb.collection('posts').update(postId, formData);
        } else {
            // Create new post
            // Make sure the author is set
            // Only set author if we have a valid user model and NOT an admin (unless admin ID is valid for the relation)
            // Assuming 'author' relates to 'users' collection.
            if (!formData.get('author')) {
                if (pb.authStore.isValid && pb.authStore.model && !pb.authStore.isSuperuser) {
                    formData.set('author', pb.authStore.model.id);
                }
            }
            await pb.collection('posts').create(formData);
        }
        closeModal();
        await fetchAndRenderPosts(); // Refresh the list
    } catch (error) {
        console.error("Failed to save post:", error);
        if (error.data) console.error("Validation Errors:", JSON.stringify(error.data, null, 2));
        // Show detailed validation errors from PocketBase if available
        let details = error.data ? JSON.stringify(error.data, null, 2) : error.message;
        
        // Check for common file size error
        const errCheck = (error.message || "") + (error.data ? JSON.stringify(error.data) : "");
        if (errCheck.includes("too large") || errCheck.includes("size limit")) {
             details += "\n\n⚠️ HINT: Check PocketBase 'posts' collection settings.\nEnsure 'cover_images' Max file size is set to ~5,000,000 (5MB), NOT 1.";
        }
        alert(`Error saving post:\n${details}`);
    } finally {
        modalConfirm.disabled = false;
        modalConfirm.textContent = 'Confirm';
    }
}

/**
 * Handles the click of an edit button.
 * @param {Event} e 
 */
function handleEdit(e) {
    const postId = e.target.dataset.id;
    const post = postsCache.find(p => p.id === postId);
    if (post) {
        openPostModal(post);
    }
}

/**
 * Handles the click of a delete button.
 * @param {Event} e 
 */
async function handleDelete(e) {
    const postId = e.target.dataset.id;
    if (confirm('Are you sure you want to delete this post? This cannot be undone.')) {
        try {
            await pb.collection('posts').delete(postId);
            await fetchAndRenderPosts(); // Refresh list
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert(`Error: ${error.message}`);
        }
    }
}