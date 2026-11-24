/**
 * Centralized API & Utility Module for Employee Management System
 */

// Compute Base API URL seamlessly whether hosted on Spring Boot or standalone
const getApiBaseUrl = () => {
    // If opened directly from file:// or a different dev server port (e.g. 5500, 3000)
    if (window.location.protocol === 'file:' || !window.location.port.includes('8080')) {
        return 'http://localhost:8080/url';
    }
    return '/url';
};

const API_BASE_URL = getApiBaseUrl();

const EmployeeAPI = {
    /**
     * Add a new employee
     * @param {Object} employee 
     */
    async add(employee) {
        const response = await fetch(`${API_BASE_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Failed to add employee (HTTP ${response.status})`);
        }
        return await response.json();
    },

    /**
     * Get all employees
     */
    async getAll() {
        const response = await fetch(`${API_BASE_URL}/getAll`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch employees (HTTP ${response.status})`);
        }
        return await response.json();
    },

    /**
     * Get employee by ID
     * @param {number|string} id 
     */
    async getById(id) {
        const response = await fetch(`${API_BASE_URL}/getById/${encodeURIComponent(id)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch employee #${id} (HTTP ${response.status})`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    },

    /**
     * Get employee by Name
     * @param {string} name 
     */
    async getByName(name) {
        const response = await fetch(`${API_BASE_URL}/getByName/${encodeURIComponent(name)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to search employee "${name}" (HTTP ${response.status})`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    },

    /**
     * Update employee by ID
     * @param {number|string} id 
     * @param {Object} employee 
     */
    async update(id, employee) {
        const response = await fetch(`${API_BASE_URL}/update/${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Failed to update employee #${id} (HTTP ${response.status})`);
        }
        return await response.json();
    },

    /**
     * Delete employee by ID
     * @param {number|string} id 
     */
    async delete(id) {
        const response = await fetch(`${API_BASE_URL}/delete/${encodeURIComponent(id)}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Failed to delete employee #${id} (HTTP ${response.status})`);
        }
        return true;
    }
};

/**
 * Toast Notification Helper
 */
const Toast = {
    show(message, type = 'success', duration = 3500) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const iconMap = {
            success: 'bi-check-circle-fill text-success',
            danger: 'bi-exclamation-triangle-fill text-danger',
            warning: 'bi-exclamation-circle-fill text-warning',
            info: 'bi-info-circle-fill text-info'
        };

        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.innerHTML = `
            <i class="bi ${iconMap[type] || iconMap.info} fs-5"></i>
            <div class="flex-grow-1">
                <div class="fw-semibold text-dark fs-6">${UIUtils.escapeHtml(message)}</div>
            </div>
            <button type="button" class="btn-close" style="font-size: 0.75rem;" aria-label="Close"></button>
        `;

        toast.querySelector('.btn-close').addEventListener('click', () => {
            toast.remove();
        });

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

/**
 * UI Utilities
 */
const UIUtils = {
    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    getInitials(name) {
        if (!name) return 'EM';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    },

    getAvatarColor(name) {
        const colors = [
            'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
            'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'
        ];
        if (!name) return colors[0];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    },

    formatPhone(phone) {
        if (!phone) return '-';
        const str = String(phone);
        if (str.length === 10) {
            return `+91 ${str.slice(0, 5)} ${str.slice(5)}`;
        }
        return str;
    }
};
