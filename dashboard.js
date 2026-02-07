// Dashboard functionality

// Sample data for products
const products = {
    pear: {
        name: 'PEAR',
        daysBeforeSpoilage: 5,
        stock: 38,
        status: 'warning'
    },
    avocado: {
        name: 'AVOCADO',
        daysBeforeSpoilage: 4,
        stock: 52,
        status: 'warning'
    },
    strawberry: {
        name: 'STRAWBERRY',
        daysBeforeSpoilage: 3,
        stock: 75,
        status: 'urgent'
    }
};

// Update spoilage countdown
function updateSpoilageCountdown() {
    // Decrease days for all products
    Object.keys(products).forEach(key => {
        if (products[key].daysBeforeSpoilage > 0) {
            products[key].daysBeforeSpoilage--;
        }
        
        // Update status based on days remaining
        if (products[key].daysBeforeSpoilage <= 2) {
            products[key].status = 'urgent';
        } else if (products[key].daysBeforeSpoilage <= 5) {
            products[key].status = 'warning';
        } else {
            products[key].status = 'good';
        }
    });
    
    // Update UI
    updateDashboard();
}

// Update dashboard display
function updateDashboard() {
    // Update individual product cards
    document.getElementById('pear-days').textContent = products.pear.daysBeforeSpoilage;
    document.getElementById('avocado-days').textContent = products.avocado.daysBeforeSpoilage;
    document.getElementById('strawberry-days').textContent = products.strawberry.daysBeforeSpoilage;
    
    // Update large display numbers
    document.getElementById('selected-days').textContent = products.pear.daysBeforeSpoilage;
    document.getElementById('selected-days-2').textContent = products.avocado.daysBeforeSpoilage;
    document.getElementById('selected-days-3').textContent = products.strawberry.daysBeforeSpoilage;
    
    // Update grid cards
    const gridCards = document.querySelectorAll('.grid-card[data-product]');
    gridCards.forEach(card => {
        const productName = card.dataset.product;
        const product = products[productName];
        
        if (product) {
            const daysValue = card.querySelector('.info-value');
            const stockValue = card.querySelectorAll('.info-value')[1];
            
            if (daysValue) {
                daysValue.textContent = product.daysBeforeSpoilage;
            }
            if (stockValue) {
                stockValue.textContent = `${product.stock} units`;
            }
        }
    });
    
    // Update action items
    updateActionItems();
}

// Update action needed section
function updateActionItems() {
    const actionContent = document.querySelector('.action-content');
    if (!actionContent) return;
    
    let actionHTML = '';
    
    // Sort products by days remaining
    const sortedProducts = Object.values(products).sort((a, b) => 
        a.daysBeforeSpoilage - b.daysBeforeSpoilage
    );
    
    sortedProducts.forEach(product => {
        if (product.daysBeforeSpoilage <= 5) {
            const urgencyClass = product.daysBeforeSpoilage <= 2 ? 'urgent' : 'warning';
            const icon = product.daysBeforeSpoilage <= 2 ? '⚠️' : '⏰';
            
            actionHTML += `
                <div class="action-item ${urgencyClass}">
                    <span class="action-icon">${icon}</span>
                    <span>${product.name.charAt(0) + product.name.slice(1).toLowerCase()} - ${product.daysBeforeSpoilage} day${product.daysBeforeSpoilage !== 1 ? 's' : ''} left</span>
                </div>
            `;
        }
    });
    
    if (actionHTML === '') {
        actionHTML = '<div style="text-align: center; color: #8bc34a; padding: 20px;">All products are fresh! ✓</div>';
    }
    
    actionContent.innerHTML = actionHTML;
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');

if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', () => {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Clear search on input change
    searchInput.addEventListener('input', () => {
        if (searchInput.value === '') {
            performSearch(); // Reset to show all
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Remove any existing "no results" message
    const existingMsg = document.querySelector('.no-results-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    if (searchTerm === '') {
        // Show all cards
        document.querySelectorAll('.grid-card').forEach(card => {
            card.style.display = 'block';
        });
        const actionCard = document.querySelector('.action-card');
        if (actionCard) {
            actionCard.style.display = 'block';
        }
        return;
    }
    
    let foundAny = false;
    
    // Filter cards by product name
    document.querySelectorAll('.grid-card[data-product]').forEach(card => {
        const productName = card.dataset.product.toLowerCase();
        const product = products[productName];
        
        // Search in both the product key and the display name
        if (productName.includes(searchTerm) || 
            (product && product.name.toLowerCase().includes(searchTerm))) {
            card.style.display = 'block';
            foundAny = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Also hide/show the action card based on search
    const actionCard = document.querySelector('.action-card');
    if (actionCard) {
        actionCard.style.display = foundAny ? 'block' : 'none';
    }
    
    // Show "no results" message if nothing found
    if (!foundAny) {
        const inventoryGrid = document.querySelector('.inventory-grid');
        const noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 40px; background: rgba(255,255,255,0.9); border-radius: 10px; color: #666;';
        noResultsMsg.innerHTML = `
            <p style="font-size: 18px; margin-bottom: 10px;">🔍 No fruits found</p>
            <p style="font-size: 14px;">Try searching for: Pear, Avocado, or Strawberry</p>
        `;
        inventoryGrid.appendChild(noResultsMsg);
    }
}

// Logout functionality
const logoutBtn = document.querySelector('.logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            // Redirect to login page
            window.location.href = 'index.html'; // Update with your login page filename
        }
    });
}

// Grid card click interaction
document.querySelectorAll('.grid-card[data-product]').forEach(card => {
    card.addEventListener('click', () => {
        const productName = card.dataset.product;
        showProductDetails(productName);
    });
});

function showProductDetails(productName) {
    const product = products[productName];
    if (!product) return;
    
    // Highlight the selected card
    document.querySelectorAll('.grid-card').forEach(c => {
        c.style.border = 'none';
    });
    
    const selectedCard = document.querySelector(`[data-product="${productName}"]`);
    if (selectedCard) {
        selectedCard.style.border = '3px solid #8bc34a';
    }
    
    // You could also show a modal or update a details panel here
    console.log(`Selected product: ${product.name}`);
}

// Simulate stock updates (random changes)
function simulateStockUpdate() {
    Object.keys(products).forEach(key => {
        // Random chance to change stock
        if (Math.random() > 0.7) {
            const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
            products[key].stock = Math.max(0, products[key].stock + change);
        }
    });
    
    updateDashboard();
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    
    // Update countdown every 24 hours (in real app)
    // For demo purposes, update every 10 seconds
    // setInterval(updateSpoilageCountdown, 10000);
    
    // Simulate stock changes every 30 seconds (for demo)
    // setInterval(simulateStockUpdate, 30000);
});

// Add notification system
function checkAndNotify() {
    Object.values(products).forEach(product => {
        if (product.daysBeforeSpoilage <= 2 && product.stock > 0) {
            showNotification(`Warning: ${product.name} will spoil in ${product.daysBeforeSpoilage} days!`);
        }
    });
}

function showNotification(message) {
    // Check if browser supports notifications
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            new Notification('SmartShelf Alert', {
                body: message,
                icon: 'logo.png' // Add your logo
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('SmartShelf Alert', {
                        body: message,
                        icon: 'logo.png'
                    });
                }
            });
        }
    }
}

// Export data functionality
function exportData() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `smartshelf-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Ctrl/Cmd + E for export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportData();
    }
});