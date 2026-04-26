/*
    Mert Baytas - 138320067
    Hafta 7 Laboratuvar - Bootstrap + JavaScript ile Etkileşimli Etkinlik Kayıt Sayfası
    JavaScript Dosyası: Tema değiştirme ve form işlemleri
*/

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function initTheme() {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Tema';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙 Tema';
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
    const department = document.getElementById('department').value.trim();
    const grade = document.getElementById('grade').value;
    const session = document.getElementById('session').value;
    const participationType = document.getElementById('participationType').value;
    const message = document.getElementById('message').value.trim();
    const terms = document.getElementById('terms').checked;

    // Validate all fields
    if (!fullName || !email || !department || !grade || !session || !participationType || !message) {
        showAlert('danger', '⚠️ Hata', 'Lütfen tüm alanları doldurunuz!');
        return;
    }

    if (!terms) {
        showAlert('danger', '⚠️ Hata', 'Şartları kabul etmelisiniz!');
        return;
    }

    // Show success message
    showAlert('success', '✅ Başarılı', 'Henüz başvuru oluşturulmuştur. Form doldurduktan sonra sonuç burada görünecek.');

    // Create and display summary
    displaySummary(fullName, email, department, grade, session, participationType, message);

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

function displaySummary(fullName, email, department, grade, session, participationType, message) {
    const summaryHtml = `
        <div class="card shadow-lg rounded-4 border-0 mb-4">
            <div class="card-header bg-success text-white rounded-top-4 p-4">
                <h4 class="mb-0">📋 Başvuru Özeti</h4>
            </div>
            <div class="card-body p-4">
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <strong class="text-secondary">Adı Soyadı:</strong><br>
                            <span class="h6">${escapeHtml(fullName)}</span>
                        </div>
                        <div class="mb-3">
                            <strong class="text-secondary">E-posta:</strong><br>
                            <span class="h6">${escapeHtml(email)}</span>
                        </div>
                        <div class="mb-3">
                            <strong class="text-secondary">Bölüm:</strong><br>
                            <span class="h6">${escapeHtml(department)}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <strong class="text-secondary">Sınıf:</strong><br>
                            <span class="h6">${escapeHtml(grade)}</span>
                        </div>
                        <div class="mb-3">
                            <strong class="text-secondary">Katılım Türü:</strong><br>
                            <span class="badge bg-info">${escapeHtml(participationType)}</span>
                        </div>
                        <div class="mb-3">
                            <strong class="text-secondary">Oturum:</strong><br>
                            <span class="h6">${escapeHtml(session)}</span>
                        </div>
                    </div>
                </div>

                <div class="border-top pt-4">
                    <strong class="text-secondary d-block mb-3">Mesaj:</strong>
                    <div class="bg-light p-3 rounded-3 text-secondary">
                        ${escapeHtml(message)}
                    </div>
                </div>

                <div class="mt-4 text-center">
                    <button type="button" class="btn btn-outline-primary btn-sm rounded-pill"
                            onclick="document.getElementById('registrationForm').reset(); document.getElementById('resultArea').innerHTML=''; document.getElementById('registrationForm').scrollIntoView();">
                        Yeni Başvuru Yap
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
