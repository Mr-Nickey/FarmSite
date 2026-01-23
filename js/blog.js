// Initialize PocketBase
const pb = new PocketBase('https://flockingreeds.farm');

// Cache posts globally so we don't re-fetch for the modal
window.farmPostsCache = {};

document.addEventListener('DOMContentLoaded', async () => {
    const heroContainer = document.getElementById('hero-post-container');
    const gridContainer = document.getElementById('posts-grid');
    const loadingIndicator = document.getElementById('loading-indicator');
    const timelineNav = document.getElementById('timeline-nav');

    try {
        // Fetch posts sorted by newest first
        const records = await pb.collection('posts').getFullList({
            sort: '-is_sticky,-created',
            filter: 'visibility != "draft"',
            requestKey: null
        });

        // Cache records for modal access
        records.forEach(r => window.farmPostsCache[r.id] = r);

        loadingIndicator.classList.add('hidden');

        console.log("Fetched posts:", records.length);

        if (records.length === 0) {
            heroContainer.innerHTML = `<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700">
                <p class="font-bold">Quiet on the farm...</p>
                <p>No news posts found yet.</p>
            </div>`;
            return;
        }

        // Determine Hero Post (Pinned or First)
        let heroPost = records[0];
        let gridPosts = records.slice(1);

        const user = pb.authStore.model;

        // Render Layout
        renderHero(heroPost, heroContainer, user);
        renderGrid(gridPosts, gridContainer, user);
        
        if (timelineNav) {
            renderTimeline(records, timelineNav);
        }

    } catch (err) {
        console.error("Error fetching blog posts:", err);
        loadingIndicator.innerHTML = `<p class="text-red-600 font-bold bg-red-50 p-4 rounded border border-red-200">Failed to load farm news. Please try again later.</p>`;
    }

    setupModal();
    setupSubscribe();
});

/**
 * Checks if a user has access to a post based on tiers.
 * Hierarchy: public < supporters/tier1 < tier2 < tier3
 */
function canViewPost(user, visibility) {
    if (visibility === 'public' || !visibility) return true;
    if (visibility === 'draft') return false; // Should be filtered out by query anyway
    
    if (!user) return false;
    if (user.is_super_user || user.superuser) return true;
    
    if (!user.is_supporter) return false;

    // Map tier names to numeric levels
    const levels = { 'free': 0, 'tier1': 1, 'tier2': 2, 'tier3': 3, 'flock_friend': 1, 'coop_keeper': 2, 'homestead_hero': 3 };
    const userLevel = levels[user.stripe_tier] || 0;

    if (visibility === 'supporters') return userLevel >= 1;
    if (visibility === 'tier1') return userLevel >= 1;
    if (visibility === 'tier2') return userLevel >= 2;
    if (visibility === 'tier3') return userLevel >= 3;

    return false;
}

function renderHero(post, container, user) {
    const hasAccess = canViewPost(user, post.visibility);
    const isLocked = !hasAccess;

    const dateObj = new Date(post.created);
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const imageFile = post.cover_images && (Array.isArray(post.cover_images) ? post.cover_images[0] : post.cover_images);
    const imageUrl = imageFile ? pb.files.getURL(post, imageFile) : null;
    
    // Create excerpt (strip HTML tags)
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = post.content || "";
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    const excerpt = textContent.slice(0, 350) + (textContent.length > 350 ? "..." : "");

    const imageHtml = imageUrl 
        ? `<div class="h-64 sm:h-96 w-full overflow-hidden relative">
                <img src="${imageUrl}" alt="${post.title}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
           </div>`
        : ``; 

    const contentClass = imageUrl ? 'p-6 sm:p-10 relative' : 'p-6 sm:p-10 pt-16 relative';

    const youtubeHtml = post.youtube_video_id && !isLocked
        ? `<div class="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden shadow-lg">
                <iframe src="https://www.youtube.com/embed/${post.youtube_video_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           </div>`
        : '';

    const lockedOverlay = isLocked 
        ? `<div class="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-4 rounded-2xl">
                <h3 class="font-handwritten text-3xl font-bold text-yellow-700 dark:text-yellow-400">🔒 Locked Content</h3>
                <p class="text-gray-700 dark:text-gray-300 mt-2">This post is for ${post.visibility === 'tier3' ? 'Homestead Heroes' : (post.visibility === 'tier2' ? 'Coop Keepers' : 'Supporters')} only.</p>
                <a href="shop.html" class="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition">
                    Join the Flock
                </a>
           </div>`
        : '';

    const clickAction = isLocked ? `window.location.href='shop.html'` : `openPostModal('${post.id}')`;

    const badgeText = post.is_sticky ? `📌 Pinned • ${dateStr}` : `Latest Update • ${dateStr}`;

    const html = `
        <article class="relative w-full bg-[#FEF9E7] dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-4 border-[#2E4A35] dark:border-green-600 transform transition hover:scale-[1.01] duration-500 group ${isLocked ? '' : 'cursor-pointer'}" onclick="${clickAction}">
            ${lockedOverlay}
            <div class="${isLocked ? 'blur-sm' : ''}">
                <div class="absolute top-0 left-0 bg-[#FACC15] text-[#3E2723] font-bold px-6 py-2 rounded-br-2xl z-10 shadow-md font-handwritten text-xl">
                    ${badgeText}
                </div>
                
                ${imageHtml}

                <div class="${contentClass}">
                    <h2 class="text-3xl sm:text-5xl font-bold text-[#2E4A35] dark:text-green-400 mb-4 font-handwritten leading-tight drop-shadow-sm">
                        ${post.title}
                    </h2>
                    ${youtubeHtml ? `<div class="mb-4">${youtubeHtml}</div>` : ''}
                    <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-6 line-clamp-3 text-lg">
                        ${excerpt}
                    </div>
                    <button class="inline-flex items-center gap-2 bg-[#2E4A35] hover:bg-[#1B2E21] text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform active:scale-95 border-b-4 border-[#1B2E21]">
                        ${isLocked ? 'Join to Read' : 'Read Full Story'}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                    </button>
                </div>
            </div>
        </article>
    `;
    container.innerHTML = html;
}

function renderGrid(posts, container, user) {
    if (posts.length === 0) return;

    const html = posts.map(post => {
        const hasAccess = canViewPost(user, post.visibility);
        const isLocked = !hasAccess;

        const dateObj = new Date(post.created);
        const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
        const day = dateObj.toLocaleDateString('en-US', { day: 'numeric' });
        const imageFile = post.cover_images && (Array.isArray(post.cover_images) ? post.cover_images[0] : post.cover_images);
        const imageUrl = imageFile ? pb.files.getURL(post, imageFile, {'thumb': '300x300'}) : null;
        
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = post.content || "";
        const textContent = tempDiv.textContent || tempDiv.innerText || "";
        const excerpt = textContent.slice(0, 120) + (textContent.length > 120 ? "..." : "");

        const clickAction = isLocked ? `window.location.href='shop.html'` : `openPostModal('${post.id}')`;

        const lockedOverlay = isLocked 
        ? `<div class="absolute inset-0 bg-white/50 dark:bg-gray-800/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-4">
                <span class="text-2xl mb-1">🔒</span>
                <span class="font-bold text-sm text-yellow-800 dark:text-yellow-300">${post.visibility === 'tier3' ? 'Tier 3 Only' : 'Locked'}</span>
           </div>`
        : '';

        const pinnedBadge = post.is_sticky 
            ? `<div class="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm z-10 flex items-center gap-1">
                 <span>📌</span> Pinned
               </div>` 
            : '';

        const imageHtml = imageUrl 
            ? `<div class="relative h-56 overflow-hidden shrink-0">
                    <img src="${imageUrl}" alt="${post.title}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">
               </div>`
            : ``;
        
        const contentClass = imageUrl ? 'p-6 flex flex-col flex-grow' : 'p-6 pt-12 flex flex-col flex-grow';

        return `
            <article class="relative bg-[#FEF9E7] dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition duration-300 flex flex-col h-full group ${isLocked ? '' : 'cursor-pointer'}" onclick="${clickAction}">
                ${lockedOverlay}
                ${pinnedBadge}
                <div class="${isLocked ? 'blur-sm' : ''}">
                    ${imageHtml}
                    <div class="absolute top-3 right-3 bg-[#FEF9E7]/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-3 py-1 text-center shadow-sm border border-gray-200 dark:border-gray-600 z-10">
                        <span class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">${month}</span>
                        <span class="block text-xl font-bold text-[#2E4A35] dark:text-green-400 leading-none">${day}</span>
                    </div>
                    <div class="${contentClass}">
                        <h3 class="text-2xl font-bold text-[#3E2723] dark:text-gray-100 mb-3 font-handwritten line-clamp-2 group-hover:text-[#2E4A35] dark:group-hover:text-green-400 transition-colors">
                            ${post.title}
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3 leading-relaxed">
                            ${excerpt}
                        </p>
                        <span class="text-[#2E4A35] dark:text-green-400 font-bold text-sm uppercase tracking-wider hover:underline flex items-center gap-1 mt-auto">
                            ${isLocked ? 'Join to Read' : 'Read More'} <span>&rarr;</span>
                        </span>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    container.innerHTML = html;
}

function renderTimeline(posts, container) {
    const html = posts.slice(0, 8).map(post => {
        const dateStr = new Date(post.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `
            <a href="#" onclick="openPostModal('${post.id}'); return false;" class="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#2E4A35] dark:hover:text-green-400 transition truncate border-l-2 border-transparent hover:border-[#FACC15] pl-2 py-1">
                <span class="font-bold text-xs text-gray-400 mr-1">${dateStr}</span> ${post.title}
            </a>
        `;
    }).join('');
    container.innerHTML = html;
}

// --- Global Actions ---
window.deleteComment = async function(commentId, postId) {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
        await pb.collection('comments').delete(commentId);
        await renderComments(postId);
    } catch (err) {
        console.error("Error deleting comment:", err);
        alert("Failed to delete comment.");
    }
};

window.toggleLike = async function(commentId, postId) {
    const user = pb.authStore.model;
    if (!user) return;

    try {
        const comment = await pb.collection('comments').getOne(commentId);
        const likes = comment.likes || [];
        const userId = user.id;

        const newLikes = likes.includes(userId) 
            ? likes.filter(id => id !== userId) 
            : [...likes, userId];

        await pb.collection('comments').update(commentId, { likes: newLikes });
        await renderComments(postId);
    } catch (e) {
        console.error("Error toggling like:", e);
    }
};

window.togglePin = async function(commentId, postId) {
    try {
        const comment = await pb.collection('comments').getOne(commentId);
        await pb.collection('comments').update(commentId, { is_pinned: !comment.is_pinned });
        await renderComments(postId);
    } catch (e) {
        console.error("Error toggling pin:", e);
        alert("Failed to toggle pin status.");
    }
};

window.openReplyForm = function(commentId, postId) {
    const container = document.getElementById(`reply-form-${commentId}`);
    if (!container) return;
    
    if (!container.classList.contains('hidden')) {
        container.classList.add('hidden');
        return;
    }

    const user = pb.authStore.model;
    const avatarUrl = user.avatar ? pb.files.getURL(user, user.avatar, {'thumb': '100x100'}) : 'images/logo.png';

    container.innerHTML = `
        <form onsubmit="handleCommentPost(event, '${postId}', '${commentId}')" class="flex items-start gap-3 mt-3 animate-fade-in">
            <img src="${avatarUrl}" class="w-8 h-8 rounded-full object-cover opacity-80">
            <div class="flex-1">
                <textarea id="reply-text-${commentId}" name="comment" rows="2" maxlength="500" class="w-full border p-2 rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:border-green-500 outline-none text-sm" placeholder="Write a reply..." required></textarea>
                <div class="flex justify-between items-center mt-2">
                    <span id="reply-char-count-${commentId}" class="text-[10px] text-gray-400">0/500</span>
                    <div class="flex gap-2">
                        <button type="button" onclick="document.getElementById('reply-form-${commentId}').classList.add('hidden')" class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-2">Cancel</button>
                        <button type="submit" class="bg-green-600 text-white font-bold px-4 py-1.5 rounded-lg text-xs hover:bg-green-700 transition shadow-sm">Reply</button>
                    </div>
                </div>
            </div>
        </form>
    `;
    container.classList.remove('hidden');
    
    const textarea = document.getElementById(`reply-text-${commentId}`);
    const counter = document.getElementById(`reply-char-count-${commentId}`);
    
    textarea.focus();
    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        counter.textContent = `${len}/500`;
        if (len >= 500) counter.classList.add('text-red-500');
        else counter.classList.remove('text-red-500');
    });
};

// --- Modal Logic ---

// --- Modal Logic ---

window.openPostModal = async function(postId) {
    const post = window.farmPostsCache[postId];
    if (!post) return;

    // The logic for locking is handled by the click handlers on the cards.
    // If openPostModal is called, we can assume the user has access.

    const modal = document.getElementById('readMoreModal');
    const backdrop = document.getElementById('modalBackdrop');
    const panel = document.getElementById('modalPanel');
    const content = document.getElementById('modalContent');

    const dateStr = new Date(post.created).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const imageFile = post.cover_images && (Array.isArray(post.cover_images) ? post.cover_images[0] : post.cover_images);
    const imageUrl = imageFile ? pb.files.getURL(post, imageFile) : null;

    let imageHtml = '';
    if (imageUrl) {
        imageHtml = `<img src="${imageUrl}" class="w-full h-64 sm:h-96 object-cover" alt="${post.title}">`;
    }
    
    const youtubeHtml = post.youtube_video_id
        ? `<div class="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden shadow-lg">
                <iframe src="https://www.youtube.com/embed/${post.youtube_video_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           </div>`
        : '';

    content.innerHTML = `
        ${imageHtml}
        <div class="p-6 sm:p-10">
            <div class="flex items-center gap-2 mb-4">
                <span class="bg-[#FACC15] text-[#3E2723] text-xs font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wide">Farm Update</span>
                <span class="text-gray-500 dark:text-gray-400 text-sm font-medium">${dateStr}</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-bold text-[#2E4A35] dark:text-green-400 mb-8 font-handwritten leading-tight">
                ${post.title}
            </h2>
            ${youtubeHtml}
            <div class="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                ${post.content}
            </div>
        </div>
        
        <!-- Flock Chat Section -->
        <div id="flock-chat-section" class="bg-gray-50 dark:bg-gray-900/50 p-6 sm:p-10 border-t dark:border-gray-700">
            <h3 class="text-2xl font-handwritten font-bold text-[#2E4A35] dark:text-green-300 mb-4">🐔 Flock Chat</h3>
            <div id="comments-container" class="space-y-4 mb-6">
                <!-- Comments will be rendered here -->
                <p class="text-center text-gray-500">Loading chat...</p>
            </div>
            <div id="comment-form-container">
                <!-- Comment form will be rendered here -->
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    // Small delay to allow display:block to apply before opacity transition
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('opacity-0', 'scale-95');
    }, 10);
    
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Load comments and render the form
    await renderComments(post.id);
}

/**
 * Fetches and renders the comments and comment form for a post.
 * @param {string} postId
 */
async function renderComments(postId) {
    const commentsContainer = document.getElementById('comments-container');
    const commentFormContainer = document.getElementById('comment-form-container');
    
    // Refresh user data to ensure permissions are up to date (fixes issue where changing DB flags didn't reflect immediately)
    let user = pb.authStore.model;
    if (user && user.collectionId) {
        try {
            user = await pb.collection('users').getOne(user.id);
            pb.authStore.save(pb.authStore.token, user);
        } catch (e) { /* ignore fetch errors */ }
    }

    const canComment = user && (user.is_supporter || user.is_super_user || user.superuser || pb.authStore.isSuperuser);

    // Render Comment Form
    if (canComment) {
        const avatarUrl = user.avatar ? pb.files.getURL(user, user.avatar, {'thumb': '100x100'}) : 'images/logo.png';
        commentFormContainer.innerHTML = `
            <form id="comment-form" class="flex items-start gap-4">
                <img src="${avatarUrl}" alt="Your avatar" class="w-10 h-10 rounded-full object-cover">
                <div class="flex-1">
                    <textarea id="comment-text" name="comment" rows="2" maxlength="500" class="w-full border-2 p-2 rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:border-green-500 outline-none transition-colors" placeholder="Chirp in with your thoughts..." required></textarea>
                    <div class="flex justify-between items-center mt-2">
                        <span id="char-count" class="text-xs text-gray-400">0/500</span>
                        <button type="submit" class="bg-green-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-sm">Post</button>
                    </div>
                </div>
            </form>
        `;
        
        const textarea = document.getElementById('comment-text');
        const charCount = document.getElementById('char-count');
        
        textarea.addEventListener('input', () => {
            const currentLength = textarea.value.length;
            charCount.textContent = `${currentLength}/500`;
            if (currentLength >= 500) {
                charCount.classList.add('text-red-500');
            } else {
                charCount.classList.remove('text-red-500');
            }
        });

        document.getElementById('comment-form').addEventListener('submit', (e) => window.handleCommentPost(e, postId));
    } else {
        commentFormContainer.innerHTML = `
            <div class="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p class="font-bold text-gray-700 dark:text-gray-300">🔒 Only Flock Friends can comment.</p>
                <a href="shop.html" class="text-green-600 hover:underline">Join the flock to start chatting!</a>
            </div>
        `;
    }

    // Fetch and Render Comments
    try {
        const comments = await pb.collection('comments').getFullList({
            filter: `post = "${postId}"`,
            expand: 'user',
            sort: '-is_pinned,created'
        });

        if (comments.length === 0) {
            commentsContainer.innerHTML = `<p class="text-center text-gray-500 italic">No comments yet. Be the first!</p>`;
            return;
        }

        const tierIcons = {
            'flock_friend': '🥚',
            'coop_keeper': '🐔',
            'homestead_hero': '🚜',
            'default': '🐣'
        };

        const tierStyles = {
            'flock_friend': 'border-yellow-400',
            'coop_keeper': 'border-slate-400',
            'homestead_hero': 'border-amber-500',
            'default': 'border-transparent'
        };

        // Build Comment Tree
        const commentMap = {};
        comments.forEach(c => { c.replies = []; commentMap[c.id] = c; });
        const rootComments = [];
        comments.forEach(c => {
            if (c.parent && commentMap[c.parent]) {
                commentMap[c.parent].replies.push(c);
            } else {
                rootComments.push(c);
            }
        });

        // Recursive Render Function
        const renderCommentNode = (comment, level = 0) => {
            const author = comment.expand.user;
            if (!author) return ''; // Skip if user was deleted or couldn't be fetched

            const avatarUrl = author.avatar ? pb.files.getURL(author, author.avatar, {'thumb': '100x100'}) : 'images/logo.png';
            const tier = author.stripe_tier || 'default';
            const tierIcon = tierIcons[tier] || tierIcons['default'];
            const tierStyle = tierStyles[tier] || tierStyles['default'];

            const isAdminComment = author.is_super_user || author.superuser;
            const adminBadge = isAdminComment 
                ? `<span class="bg-yellow-500 text-white text-[10px] px-2 py-0.5 rounded-full ml-2 font-bold shadow-sm uppercase tracking-wider">Farmer</span>` 
                : '';

            const isPinned = comment.is_pinned;
            const pinBadge = isPinned ? `<span class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-[10px] px-2 py-0.5 rounded-full ml-2 font-bold border border-yellow-200 dark:border-yellow-700 flex items-center gap-1">📌 Pinned</span>` : '';

            const currentUserIsAdmin = user && (user.is_super_user || user.superuser || pb.authStore.isSuperuser);
            
            const likes = comment.likes || [];
            const userLiked = user && likes.includes(user.id);
            const likeCount = likes.length > 0 ? likes.length : '';
            const likeBtn = canComment 
                ? `<button onclick="toggleLike('${comment.id}', '${postId}')" class="flex items-center gap-1 text-xs font-bold transition-colors mr-3 ${userLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}" title="${userLiked ? 'Unlike' : 'Like'}"><span>${userLiked ? '❤️' : '🤍'}</span> ${likeCount}</button>`
                : `<span class="flex items-center gap-1 text-xs font-bold text-gray-400 mr-3" title="Likes">❤️ ${likeCount || 0}</span>`;

            const pinBtn = currentUserIsAdmin 
                ? `<button onclick="togglePin('${comment.id}', '${postId}')" class="text-gray-400 hover:text-yellow-500 text-xs font-bold transition-colors mr-3" title="${isPinned ? 'Unpin' : 'Pin'}">${isPinned ? 'Unpin' : 'Pin'}</button>`
                : '';

            const deleteBtn = currentUserIsAdmin 
                ? `<button onclick="deleteComment('${comment.id}', '${postId}')" class="text-red-400 hover:text-red-600 text-xs font-bold transition-colors" title="Delete Comment">Delete</button>` 
                : '';
            
            const replyBtn = canComment 
                ? `<button onclick="openReplyForm('${comment.id}', '${postId}')" class="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 text-xs font-bold transition-colors mr-3">Reply</button>`
                : '';

            const marginLeft = level > 0 ? 'ml-8 sm:ml-12 border-l-2 border-gray-100 dark:border-gray-700 pl-4' : '';
            const avatarSize = level > 0 ? 'w-8 h-8' : 'w-12 h-12';

            return `
                <div class="flex flex-col gap-2 ${marginLeft} mb-4" id="comment-${comment.id}">
                    <div class="flex items-start gap-3 sm:gap-4">
                    <div class="relative">
                            <img src="${avatarUrl}" alt="${author.name}'s avatar" class="${avatarSize} rounded-full object-cover shadow-sm border-2 ${tierStyle}">
                        <div class="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center shadow-sm text-xs border border-gray-100 dark:border-gray-600" title="Tier: ${tier.replace('_', ' ')}">
                            ${tierIcon}
                        </div>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1 flex-wrap">
                            <span class="font-bold text-gray-800 dark:text-gray-200">${author.name || 'Anonymous'}</span>
                            ${adminBadge}
                            ${pinBadge}
                            <div class="ml-auto flex items-center">
                                ${likeBtn}
                                ${pinBtn}
                                ${replyBtn}
                                ${deleteBtn}
                            </div>
                        </div>
                        <div class="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                           ${comment.text}
                        </div>
                    </div>
                </div>
                    <div id="reply-form-${comment.id}" class="hidden ml-12"></div>
                    ${comment.replies.map(r => renderCommentNode(r, level + 1)).join('')}
                </div>
            `;
        };

        commentsContainer.innerHTML = rootComments.map(c => renderCommentNode(c)).join('');

    } catch (error) {
        console.error("Failed to fetch comments:", error);
        if (error.status === 403) {
            commentsContainer.innerHTML = `
                <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
                    <p class="font-bold text-yellow-800">🔒 Comments are for Supporters Only</p>
                    <p class="text-sm text-yellow-700 mt-1">Please <a href="login.html" class="underline font-bold">login</a> or <a href="shop.html" class="underline font-bold">join the flock</a> to view and post comments.</p>
                </div>
            `;
        } else {
            commentsContainer.innerHTML = `<p class="text-center text-red-500">Could not load comments.</p>`;
        }
    }
}

/**
 * Handles the submission of a new comment.
 * @param {Event} e 
 * @param {string} postId 
 * @param {string|null} parentId
 */
window.handleCommentPost = async function(e, postId, parentId = null) {
    e.preventDefault();
    const form = e.target;
    const textarea = form.querySelector('textarea');
    const button = form.querySelector('button');
    const text = textarea.value.trim();

    if (!text) return;

    button.disabled = true;
    button.textContent = 'Posting...';

    try {
        const data = {
            "user": pb.authStore.model.id,
            "post": postId,
            "text": text,
            "parent": parentId
        };
        await pb.collection('comments').create(data);

        // Notification System: Alert parent comment author
        if (parentId) {
            try {
                const parentComment = await pb.collection('comments').getOne(parentId);
                // Don't notify if replying to self
                if (parentComment.user && parentComment.user !== pb.authStore.model.id) {
                    await pb.collection('notifications').create({
                        user: parentComment.user,
                        content: `${pb.authStore.model.name || 'Someone'} replied to your comment`,
                        link: `blog.html?id=${postId}`, // Deep link could be improved with anchors if supported
                        read: false,
                        type: 'reply'
                    });
                }
            } catch (err) {
                console.warn("Failed to create notification:", err);
            }
        }
        
        // Refresh comments
        await renderComments(postId);

    } catch (error) {
        console.error("Failed to post comment:", error);
        alert('There was an error posting your comment.');
        button.disabled = false;
        button.textContent = 'Post';
    }
}


function setupModal() {
    const modal = document.getElementById('readMoreModal');
    const backdrop = document.getElementById('modalBackdrop');
    const panel = document.getElementById('modalPanel');
    const closeBtn = document.getElementById('closeModalBtn');

    function closeModal() {
        backdrop.classList.add('opacity-0');
        panel.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

function setupSubscribe() {
    const form = document.getElementById('subscribeForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('subscriberEmail');
        const messageEl = document.getElementById('subscribeMessage');
        const email = emailInput.value;

        try {
            // Create subscriber in PocketBase
            await pb.collection('subscribers').create({ email: email, name: 'Friend', active: true });
            messageEl.textContent = "Thanks for subscribing!";
            messageEl.className = "text-xs mt-2 text-green-600 font-bold block";
            emailInput.value = "";
        } catch (err) {
            console.error("Subscription error:", err);
            messageEl.textContent = "Failed to subscribe. You might already be on the list.";
            messageEl.className = "text-xs mt-2 text-red-600 font-bold block";
        }
    });
}