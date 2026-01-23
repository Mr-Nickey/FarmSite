// layout.js
// 1. GLOBAL POCKETBASE INIT
window.pb = new PocketBase('https://flockingreeds.farm');
window.pb.autoCancellation(false);

async function renderLayout() {
    // --- 1. RENDER NAVBAR ---
    const navContainer = document.getElementById('navbar-placeholder');
    if (navContainer) {
        const user = window.pb.authStore.model;
        const isLoggedIn = window.pb.authStore.isValid;

        let accountMenuHtml;
        if (isLoggedIn) {
            const avatarUrl = user.avatar ? pb.files.getURL(user, user.avatar, {'thumb': '100x100'}) : 'images/logo.png';
            let adminLink = '';
            if (user.superuser) {
                adminLink = `<a href="admin.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Admin</a>`;
            }

            // Fetch unread messages
            let notificationBadge = '';
            try {
                const unreadMessages = await pb.collection('messages').getList(1, 1, {
                    filter: `to_user = "${user.id}" && read = false`,
                });
                
                let unreadNotifs = 0;
                try {
                    const notifList = await pb.collection('notifications').getList(1, 1, {
                        filter: `user = "${user.id}" && read = false`,
                    });
                    unreadNotifs = notifList.totalItems;
                } catch(e) { /* Collection might not exist yet */ }

                const totalUnread = unreadMessages.totalItems + unreadNotifs;
                notificationBadge = totalUnread > 0 ? `<span class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">${totalUnread}</span>` : '';
            } catch (err) {
                console.warn('Failed to fetch unread messages (check permissions):', err);
            }

            accountMenuHtml = `
                <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 border dark:border-gray-700">
                    <div class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">
                        Signed in as<br><strong class="truncate">${user.name || user.email}</strong>
                    </div>
                    <a href="dashboard.html" class="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span>Dashboard</span>
                        ${notificationBadge}
                    </a>
                    ${adminLink}
                    <a href="#" id="logout-btn" class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
                </div>
            `;
        } else {
            accountMenuHtml = `
                <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 border dark:border-gray-700">
                    <a href="login.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Login / Register</a>
                </div>
            `;
        }

        navContainer.innerHTML = `
        <div class="container mx-auto px-4 pt-4 sm:pt-6">
            <nav class="granulated-nav-bg text-stone-800 dark:text-stone-200 shadow-2xl rounded-full border-2 border-white/30 dark:border-gray-700/40">
                <div class="px-6 py-2 flex flex-col md:flex-row justify-between items-center gap-4">
                
                    <a href="index.html" class="flex items-center gap-3 group">
                        <img src="images/logo.webp" alt="Logo" class="h-8 w-auto transform group-hover:scale-110 transition duration-300">
                        <span class="font-handwritten text-2xl text-stone-800 dark:text-yellow-100 group-hover:text-farm-orange transition">The Flocking Reed's</span>
                    </a>

                    <div class="flex flex-wrap justify-center md:justify-end items-center gap-2 sm:gap-4 text-sm sm:text-base">
                        <a href="index.html" data-page="home" class="nav-link nav-link--home">Home</a>
                        <a href="aboutus.html" data-page="about" class="nav-link nav-link--about">About</a>
                        <a href="blog.html" data-page="news" class="nav-link nav-link--news">The Roost</a>
                        <a href="shop.html" data-page="shop" class="nav-link nav-link--shop">Shop</a>
                        
                         <a href="donate.html" data-page="donate" class="bg-farm-orange hover:bg-farm-orange-dark text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out active:scale-95 text-sm sm:text-base dark:bg-farm-orange-dark dark:hover:bg-farm-orange">
                            Support Us
                        </a>
                        <!-- Account Dropdown -->
                        <div id="account-menu-container" class="relative">
                            <button id="account-menu-button" class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                            <div id="account-menu" class="hidden">
                                ${accountMenuHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        `;

        const currentPage = document.body.getAttribute('data-page');
        if (currentPage) {
            const activeLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
            if (activeLink) {
                activeLink.classList.add('is-active');
            }
        }
        
        // --- Setup Account Menu ---
        const accountMenuButton = document.getElementById('account-menu-button');
        const accountMenu = document.getElementById('account-menu');
        
        accountMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            accountMenu.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!accountMenu.contains(e.target) && !accountMenuButton.contains(e.target)) {
                accountMenu.classList.add('hidden');
            }
        });

        if (isLoggedIn) {
            const logoutBtn = document.getElementById('logout-btn');
            if(logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.pb.authStore.clear();
                    window.location.reload();
                });
            }
        }
    }
    // --- RENDER FOOTER ---
    const footerContainer = document.getElementById('footer-placeholder');
    if (footerContainer) {
        footerContainer.innerHTML = `
        <footer class="footer bg-stone-200 dark:bg-[#1a120b] text-stone-800 dark:text-[#D7CCC8] border-t-4 border-stone-300 dark:border-[#271c19] mt-auto font-body relative transition-colors duration-300">
            <!-- Main Footer Content -->
            <div class="container mx-auto px-6 py-12">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    <!-- Column 1: Logo & Tagline -->
                    <div class="flex flex-col items-center space-y-4">
                        <img src="images/banner.webp" alt="The Flocking Reed's Farm" class="w-48 h-auto opacity-90 hover:opacity-100 transition duration-300">
                        <p class="text-sm text-stone-600 dark:text-[#A1887F] italic font-handwritten text-lg">Est. 2025</p>
                    </div>

                    <!-- Column 2: Quick Links -->
                    <div>
                        <h4 class="text-lg font-bold text-yellow-600 dark:text-[#FACC15] mb-4 uppercase tracking-wider border-b-2 border-stone-400 dark:border-[#8D6E63] inline-block pb-1 font-handwritten">Quick Links</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="index.html" class="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors duration-200 block">Home</a></li>
                            <li><a href="aboutus.html" class="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors duration-200 block">About</a></li>
                            <li><a href="blog.html" class="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors duration-200 block">The Roost</a></li>
                            <li><a href="shop.html" class="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors duration-200 block">Shop</a></li>
                        </ul>
                    </div>

                    <!-- Column 3: Legal & Tech -->
                    <div>
                        <h4 class="text-lg font-bold text-yellow-600 dark:text-[#FACC15] mb-4 uppercase tracking-wider border-b-2 border-stone-400 dark:border-[#8D6E63] inline-block pb-1 font-handwritten">Legal & Tech</h4>
                        <ul class="space-y-2 text-sm mb-6">
                            <li><a href="privacy.html" class="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors duration-200 block">Privacy Policy</a></li>
                            <li><a href="tos.html" class="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors duration-200 block">Terms of Service</a></li>
                        </ul>
                        <div class="text-xs text-stone-600 dark:text-[#A1887F] space-y-3">
                            <div class="inline-block">
                                🛠️ Built & Designed by <strong class="text-yellow-600 dark:text-[#FACC15]">Nicky</strong>
                            </div>
                            <div class="inline-block bg-stone-300 dark:bg-[#2E1A16] px-3 py-1 rounded border border-stone-400 dark:border-[#3E2723] shadow-sm">
                                ☁️ Hosted on <strong class="text-blue-500 dark:text-blue-400">DigitalOcean</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Column 4: Newsletter -->
                    <div>
                        <h4 class="text-lg font-bold text-yellow-600 dark:text-[#FACC15] mb-4 uppercase tracking-wider border-b-2 border-stone-400 dark:border-[#8D6E63] inline-block pb-1 font-handwritten">Join the Flock</h4>
                        <p class="text-sm text-stone-600 dark:text-[#A1887F] mb-4">Get the latest farm updates and fresh egg alerts!</p>
                        <form id="footerSubscribeForm" class="flex flex-col gap-2">
                            <input type="email" id="footerSubscriberEmail" placeholder="Your Email Address" class="bg-stone-300 dark:bg-[#2E1A16] border border-stone-400 dark:border-[#3E2723] text-stone-800 dark:text-[#FEF9E7] text-sm rounded px-3 py-2 focus:outline-none focus:border-yellow-600 dark:focus:border-[#FACC15] transition-colors" required>
                            <button type="submit" class="bg-yellow-500 hover:bg-yellow-400 text-stone-800 dark:text-[#3E2723] font-bold py-2 px-4 rounded text-sm transition-transform transform active:scale-95 shadow-md uppercase tracking-wide">
                                Subscribe
                            </button>
                            <span id="footerSubscribeMessage" class="text-xs mt-1 hidden"></span>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="bg-stone-300 dark:bg-[#0f0806] py-4 border-t border-stone-400 dark:border-[#271c19]">
                <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-xs text-stone-600 dark:text-[#8D6E63]">© 2026 The Flocking Reed's Farm. All Rights Reserved.</p>
                    
                    <div class="flex items-center gap-6">
                        <!-- Social Icons -->
                        <div class="flex gap-4 text-stone-600 dark:text-[#8D6E63]">
                            <a href="https://www.youtube.com/@sammiessimpleliving" target="_blank" class="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors flex items-center gap-2" aria-label="YouTube">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                <span class="text-xs font-bold">@sammiessimpleliving</span>
                            </a>
                        </div>

                        <!-- Toggles -->
                        <div class="flex gap-3 text-xs border-l border-stone-400 dark:border-[#3E2723] pl-6">
                            <button id="dyslexia-toggle" class="text-stone-600 dark:text-[#8D6E63] hover:text-yellow-600 dark:hover:text-[#FACC15] transition">Dyslexia Font</button>
                            <span class="text-stone-400 dark:text-[#3E2723]">|</span>
                            <button id="theme-toggle" class="text-stone-600 dark:text-[#8D6E63] hover:text-yellow-600 dark:hover:text-[#FACC15] transition">Theme</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Back to Top Button -->
            <button id="backToTopBtn" class="fixed bottom-8 left-8 bg-yellow-600 text-stone-800 dark:bg-[#FACC15] dark:text-[#3E2723] w-12 h-12 rounded-full shadow-xl flex items-center justify-center transform translate-y-24 opacity-0 transition-all duration-500 z-50 hover:bg-yellow-500 hover:-translate-y-1 focus:outline-none border-2 border-stone-800 dark:border-[#3E2723]" title="Back to Top">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
        `;
        setupFooterInteractions();
    }
}

function setupFooterInteractions() {
    // Back to Top Logic
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('translate-y-24', 'opacity-0');
            } else {
                backToTopBtn.classList.add('translate-y-24', 'opacity-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Footer Newsletter Logic
    const form = document.getElementById('footerSubscribeForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('footerSubscriberEmail');
            const messageEl = document.getElementById('footerSubscribeMessage');
            const email = emailInput.value;
            const btn = form.querySelector('button');

            btn.disabled = true;
            btn.textContent = '...';

            try {
                await window.pb.collection('subscribers').create({ email: email, name: 'Friend', active: true });
                messageEl.textContent = "Welcome to the flock!";
                messageEl.className = "text-xs mt-2 text-green-400 font-bold block";
                emailInput.value = "";
            } catch (err) {
                console.error("Subscription error:", err);
                messageEl.textContent = "Already subscribed or error.";
                messageEl.className = "text-xs mt-2 text-red-400 font-bold block";
            } finally {
                btn.disabled = false;
                btn.textContent = 'Subscribe';
                messageEl.classList.remove('hidden');
            }
        });
    }

    // Theme & Dyslexia Toggles
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeButtonText();
    }

    const dyslexiaToggle = document.getElementById('dyslexia-toggle');
    if (dyslexiaToggle) {
        dyslexiaToggle.addEventListener('click', toggleDyslexiaMode);
        updateDyslexiaButtonText();
    }
}

function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    }
    updateThemeButtonText();
}

function updateThemeButtonText() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        const isDark = document.documentElement.classList.contains('dark');
        btn.textContent = isDark ? 'Theme: Dark' : 'Theme: Light';
    }
}

function toggleDyslexiaMode() {
    const body = document.body;
    body.classList.toggle('dyslexia-mode');
    const isDyslexia = body.classList.contains('dyslexia-mode');
    localStorage.setItem('dyslexiaMode', isDyslexia ? 'true' : 'false');
    updateDyslexiaButtonText();
}

function updateDyslexiaButtonText() {
    const btn = document.getElementById('dyslexia-toggle');
    if (btn) {
        const isDyslexia = document.body.classList.contains('dyslexia-mode');
        btn.textContent = isDyslexia ? 'Dyslexia Font: On' : 'Dyslexia Font: Off';
    }
}

function applyPreferences() {
    // Theme: Check localStorage, then system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Dyslexia
    if (localStorage.getItem('dyslexiaMode') === 'true') {
        document.body.classList.add('dyslexia-mode');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyPreferences();
    renderLayout();
});