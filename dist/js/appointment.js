// Configuration du calendrier
const dateInput = document.getElementById('date');
const appointmentForm = document.getElementById('appointment-form');
const confirmationMessage = document.getElementById('confirmation');

// Initialisation de Flatpickr avec configuration
const fp = flatpickr(dateInput, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minTime: "10:00",
    maxTime: "18:00",
    minDate: "today",
    time_24hr: true,
    locale: 'fr',
    disable: [
        function(date) {
            // Désactiver les week-ends (0 = dimanche, 6 = samedi)
            return (date.getDay() === 0 || date.getDay() === 6);
        }
    ],
    onChange: function(selectedDates) {
        // Validation supplémentaire si nécessaire
    }
});

// Gestion du formulaire
if (appointmentForm) {
    appointmentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        try {
            // Envoyer les données à l'API (à remplacer par votre logique d'API)
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Afficher le message de confirmation
                appointmentForm.style.display = 'none';
                confirmationMessage.style.display = 'block';
                
                // Réinitialiser le formulaire
                appointmentForm.reset();
                
                // Recharger la liste des rendez-vous dans le panneau admin
                if (window.adminAuthenticated) {
                    loadAppointments();
                }
            } else {
                throw new Error('Erreur lors de l\'envoi du formulaire');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });
}

// Gestion du panneau d'administration
const adminTrigger = document.getElementById('admin-trigger');
const adminPanel = document.getElementById('admin-panel');
const closeAdmin = document.getElementById('close-admin');
const loginForm = document.getElementById('login-form');
const adminDashboard = document.getElementById('admin-dashboard');
const loginBtn = document.getElementById('login-btn');
const adminPassword = document.getElementById('admin-password');
const appointmentsList = document.getElementById('appointments-list');

// Variable pour suivre l'état d'authentification
window.adminAuthenticated = false;

// Ouvrir le panneau admin
if (adminTrigger) {
    adminTrigger.addEventListener('click', function() {
        adminPanel.classList.add('active');
    });
}

// Fermer le panneau admin
if (closeAdmin) {
    closeAdmin.addEventListener('click', function() {
        adminPanel.classList.remove('active');
    });
}

// Gestion de la connexion admin
if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        // Vérifier le mot de passe (à remplacer par une vérification côté serveur)
        // En production, utilisez une authentification sécurisée avec hachage et salage
        const correctPassword = process.env.ADMIN_PASSWORD || 'admin123'; // À remplacer par votre propre logique sécurisée
        
        if (adminPassword.value === correctPassword) {
            // Authentification réussie
            window.adminAuthenticated = true;
            loginForm.style.display = 'none';
            adminDashboard.style.display = 'block';
            loadAppointments();
        } else {
            alert('Mot de passe incorrect');
        }
    });
}

// Charger les rendez-vous
async function loadAppointments() {
    if (!window.adminAuthenticated) return;
    
    try {
        // Récupérer les rendez-vous depuis l'API (à remplacer par votre logique d'API)
        const response = await fetch('/api/appointments');
        const appointments = await response.json();
        
        // Trier les rendez-vous par date
        appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Afficher les rendez-vous
        appointmentsList.innerHTML = '';
        
        if (appointments.length === 0) {
            appointmentsList.innerHTML = '<p>Aucun rendez-vous prévu.</p>';
            return;
        }
        
        appointments.forEach(appointment => {
            const appointmentElement = document.createElement('div');
            appointmentElement.className = 'appointment-item';
            
            const date = new Date(appointment.date);
            const formattedDate = date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            appointmentElement.innerHTML = `
                <h5>${appointment.name}</h5>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Email:</strong> ${appointment.email}</p>
                <p><strong>Téléphone:</strong> ${appointment.phone}</p>
                ${appointment.message ? `<p><strong>Message:</strong> ${appointment.message}</p>` : ''}
                <p><strong>Statut:</strong> <span class="status-${appointment.status}">${getStatusText(appointment.status)}</span></p>
                <div class="appointment-actions">
                    <button class="btn btn-secondary" onclick="updateAppointmentStatus('${appointment.id}', 'confirmed')">Confirmer</button>
                    <button class="btn btn-secondary" onclick="updateAppointmentStatus('${appointment.id}', 'cancelled')">Annuler</button>
                </div>
            `;
            
            appointmentsList.appendChild(appointmentElement);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des rendez-vous:', error);
        appointmentsList.innerHTML = '<p>Erreur lors du chargement des rendez-vous.</p>';
    }
}

// Mettre à jour le statut d'un rendez-vous
window.updateAppointmentStatus = async function(appointmentId, status) {
    if (!window.adminAuthenticated) return;
    
    try {
        const response = await fetch(`/api/appointments/${appointmentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status })
        });
        
        if (response.ok) {
            // Recharger la liste des rendez-vous
            loadAppointments();
        } else {
            throw new Error('Erreur lors de la mise à jour du statut');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la mise à jour du statut.');
    }
};

// Fonction utilitaire pour obtenir le texte du statut
function getStatusText(status) {
    const statusMap = {
        'pending': 'En attente',
        'confirmed': 'Confirmé',
        'cancelled': 'Annulé',
        'completed': 'Terminé'
    };
    return statusMap[status] || status;
}

// Fermer le panneau admin en cliquant en dehors
document.addEventListener('click', function(e) {
    if (adminPanel && !adminPanel.contains(e.target) && e.target !== adminTrigger) {
        adminPanel.classList.remove('active');
    }
});

// Gestion du thème (assurez-vous que cette fonction existe dans votre main.js)
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
            updateThemeIcon(isDark);
        });
        
        // Vérifier le thème au chargement
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
        }
        updateThemeIcon(document.body.classList.contains('dark-theme'));
    }
}

function updateThemeIcon(isDark) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}

// Initialiser le thème au chargement
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    // Si l'utilisateur est déjà authentifié, charger les rendez-vous
    if (window.adminAuthenticated) {
        loginForm.style.display = 'none';
        adminDashboard.style.display = 'block';
        loadAppointments();
    }
});
