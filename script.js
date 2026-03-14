// script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('show');
        });
    }
    
    // Search functionality (simulated)
    const searchBtn = document.querySelector('.search-input .btn');
    const searchInput = document.querySelector('.search-input input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // In a real app, this would redirect to search results
                alert(`Searching for: ${searchTerm}`);
                // window.location.href = `services.html?search=${encodeURIComponent(searchTerm)}`;
            } else {
                alert('Please enter a service to search');
            }
        });
        
        // Allow Enter key to search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to current nav link
    const currentLocation = window.location.pathname;
    const navLinks_all = document.querySelectorAll('.nav-links a');
    
    navLinks_all.forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
        }
    });
    
    // Simulate login/signup status (for demo)
    // Check if user is logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (isLoggedIn === 'true') {
        // Update nav buttons to show user menu
        const navButtons = document.querySelector('.nav-buttons');
        if (navButtons) {
            if (userType === 'customer') {
                navButtons.innerHTML = `
                    <a href="customer-dashboard.html" class="btn btn-outline">Dashboard</a>
                    <a href="#" class="btn btn-primary" id="logoutBtn">Logout</a>
                `;
            } else if (userType === 'provider') {
                navButtons.innerHTML = `
                    <a href="provider-dashboard.html" class="btn btn-outline">Dashboard</a>
                    <a href="#" class="btn btn-primary" id="logoutBtn">Logout</a>
                `;
            }
            
            // Add logout functionality
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userType');
                    localStorage.removeItem('userEmail');
                    window.location.reload();
                });
            }
        }
    }
    
    // Form validation helper
    window.validateForm = function(formData) {
        const errors = [];
        
        for (let [field, value] of formData.entries()) {
            if (!value || value.trim() === '') {
                errors.push(`${field} is required`);
            }
        }
        
        return errors;
    };
    
    // Show notification (useful for demo)
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            border-radius: 5px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    };
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});
