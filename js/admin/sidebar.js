function renderSidebar(activePage, isCollapsed) {
  const menuItems = [
    { icon: '📊', name: 'Dashboard', href: 'admin.html' },

    { icon: '🗒️', name: 'Notes', href: 'admin.html#notes-section' },
    { icon: '📬', name: 'Inbox', href: 'admin.html#inbox-section' },
    { icon: '🥕', name: 'Inventory', href: 'admin.html#inventory-section' },
    { icon: '🛍️', name: 'Shop', href: 'admin.html#shop-manager-section' },
    { icon: '📧', name: 'Subscribers', href: 'admin.html#subscribers-section' },
    { icon: '👥', name: 'Users', href: 'admin.html#users-section' },
    { icon: '�', name: 'Ledger', href: 'admin.html#ledger-section' },
    { icon: '🎯', name: 'Goals', href: 'admin.html#goals-section' },
    { icon: '📝', name: 'The Roost/CMS', href: 'cms.html' },
    { icon: '👋', name: 'Logout', href: '#', id: 'logout-btn' },
  ];

  // For desktop, sidebar is always sticky and its width is controlled
  const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';
  
  // For mobile, the sidebar slides in and out
  const mobileTransform = isCollapsed ? '-translate-x-full' : 'translate-x-0';

  return `
    <!-- Mobile overlay -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-black/60 z-30 md:hidden ${isCollapsed ? 'hidden' : ''}"></div>

    <aside id="sidebar" class="bg-farm-green text-farm-light-green ${sidebarWidth} p-4 flex flex-col h-screen fixed top-0 left-0 z-40 md:sticky transition-all duration-300 ease-in-out transform md:transform-none ${mobileTransform}">
      <div class="flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-4 h-8">
        <h1 class="text-2xl font-bold text-white font-handwritten ${isCollapsed ? 'hidden' : ''}">FarmOS 🚜</h1>
        <span class="text-2xl ${isCollapsed ? 'block' : 'hidden'}">🚜</span>
      </div>
      <nav class="flex-grow">
        <ul>
          ${menuItems.map(item => `
            <li class="mb-1">
              <a 
                id="${item.id || ''}"
                href="${item.href}" 
                class="flex items-center p-2 text-sm font-normal rounded-lg hover:bg-farm-brown transition-colors duration-200 ${item.href.split('#')[0] === activePage ? 'bg-farm-brown' : ''}"
                title="${item.name}"
              >
                <span class="text-xl w-6 text-center">${item.icon}</span>
                <span class="ml-2 ${isCollapsed ? 'hidden' : ''}">${item.name}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </nav>
      <div class="mt-auto pt-2 border-t border-farm-brown/50">
        <button id="sidebar-toggle" class="w-full flex items-center justify-center p-2 text-xl font-normal rounded-lg hover:bg-farm-brown transition-colors duration-200">
          ${isCollapsed ? '➡️' : '⬅️'}
        </button>
        <button id="theme-toggle-btn" class="w-full flex items-center justify-center p-2 text-sm font-normal rounded-lg hover:bg-farm-brown transition-colors duration-200 mt-1">
            <span class="text-xl">🎨</span>
            <span class="ml-2 ${isCollapsed ? 'hidden' : ''}">Theme</span>
        </button>
      </div>
    </aside>

    <!-- Mobile open button -->
    <button id="sidebar-open-btn" class="fixed top-4 left-4 z-10 p-2 bg-farm-green text-white rounded-md md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 12h16"></path></svg>
    </button>
  `;
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

export function initSidebar(container, activePage, pb) {
    if (!container) return;

    let isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';

    function applyCollapsedState() {
        if (isCollapsed) {
            document.body.classList.add('sidebar-collapsed');
        } else {
            document.body.classList.remove('sidebar-collapsed');
        }
        container.innerHTML = renderSidebar(activePage, isCollapsed);
        attachEventListeners();
    }

    function toggleDesktopSidebar() {
        isCollapsed = !isCollapsed;
        localStorage.setItem('sidebarCollapsed', isCollapsed);
        applyCollapsedState();
    }

    function toggleMobileSidebar() {
        isCollapsed = !isCollapsed;
        // We don't save mobile state to localStorage to avoid opening on desktop in a weird state
        applyCollapsedState();
    }

    function attachEventListeners() {
        document.getElementById('logout-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (pb) pb.authStore.clear();
            window.location.href = 'index.html';
        });

        document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);

        document.getElementById('sidebar-toggle')?.addEventListener('click', toggleDesktopSidebar);
        
        // For mobile
        document.getElementById('sidebar-open-btn')?.addEventListener('click', toggleMobileSidebar);
        document.getElementById('sidebar-overlay')?.addEventListener('click', toggleMobileSidebar);
    }
    
    // Initial setup
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        isCollapsed = true;
    }
    applyCollapsedState();
}
