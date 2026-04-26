/*
    Mert Baytas - 138320067
    Hafta 6 Laboratuvar - Bootstrap + JavaScript ile Etkileşimli Etkinlik Kayıt Sayfası
    JavaScript Dosyası: Tema değiştirme ve form işlemleri
*/

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function initTheme() {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Tema Değiştir';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙 Tema Değiştir';
    }
}

themeToggle.addEventListener('click', function () {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    initTheme();
});

// Form Handling
const registrationForm = document.getElementById('registrationForm');
const resultArea = document.getElementById('resultArea');

registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value.trim();
    const terms = document.getElementById('terms').checked;
    const newsletter = document.getElementById('newsletter').checked;

    // Validate all fields
    if (!fullName || !email || !phone || !education || !experience) {
        showAlert('danger', '⚠️ Hata', 'Lütfen tüm alanları doldurunuz!');
        return;
    }

    if (!terms) {
        showAlert('danger', '⚠️ Hata', 'Etkinlik şartlarını kabul etmelisiniz!');
        return;
    }

    // Show success message
    showAlert('success', '✅ Başarılı', 'Kayıt işleminiz başarıyla tamamlandı!');

    // Create and display summary
    displaySummary(fullName, email, phone, education, experience, newsletter);

    // Reset form
    registrationForm.reset();
});

function showAlert(type, title, message) {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>${title}</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    resultArea.innerHTML = alertHtml;
    resultArea.scrollIntoView({ behavior: 'smooth' });
}

function displaySummary(fullName, email, phone, education, experience, newsletter) {
    const summaryHtml = `
        <div class="card shadow-lg rounded-4 border-0 mb-4">
            <div class="card-header bg-success text-white rounded-top-4">
                <h4 class="mb-0">📋 Kayıt Özeti</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p class="mb-3">
                            <strong>Adı Soyadı:</strong><br>
                            <span class="text-secondary">${escapeHtml(fullName)}</span>
                        </p>
                        <p class="mb-3">
                            <strong>E-posta:</strong><br>
                            <span class="text-secondary">${escapeHtml(email)}</span>
                        </p>
                        <p class="mb-3">
                            <strong>Telefon:</strong><br>
                            <span class="text-secondary">${escapeHtml(phone)}</span>
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="mb-3">
                            <strong>Eğitim Seviyesi:</strong><br>
                            <span class="text-secondary">${escapeHtml(education)}</span>
                        </p>
                        <p class="mb-3">
                            <strong>E-posta Listeleri:</strong><br>
                            <span class="badge ${newsletter ? 'bg-success' : 'bg-secondary'}">
                                ${newsletter ? 'Abone ✓' : 'Abone Değil'}
                            </span>
                        </p>
                    </div>
                </div>
                <div class="mt-4">
                    <strong>Deneyim Açıklaması:</strong><br>
                    <div class="bg-light p-3 rounded-3 mt-2 text-secondary">
                        ${escapeHtml(experience)}
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="window.location.reload()">
                        Başka Bir Kayıt Yap
                    </button>
                </div>
            </div>
        </div>
    `;

    resultArea.innerHTML += summaryHtml;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize theme on page load
initTheme();
