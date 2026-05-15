document.getElementById('notForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Değerleri al
    const adSoyad = document.getElementById('adSoyad').value.trim();
    const vizeNotu = parseFloat(document.getElementById('vizeNotu').value);
    const finalNotu = parseFloat(document.getElementById('finalNotu').value);

    // Validasyon
    if (!adSoyad) {
        alert('Lütfen ad soyad giriniz!');
        return;
    }

    if (isNaN(vizeNotu) || vizeNotu < 0 || vizeNotu > 100) {
        alert('Vize notu 0-100 arasında olmalıdır!');
        return;
    }

    if (isNaN(finalNotu) || finalNotu < 0 || finalNotu > 100) {
        alert('Final notu 0-100 arasında olmalıdır!');
        return;
    }

    // Ortalama hesapla (Vize %40, Final %60)
    const ortalama = (vizeNotu * 0.40) + (finalNotu * 0.60);

    // Harf notunu belirle
    let harfNotu = '';
    if (ortalama >= 90) harfNotu = 'AA';
    else if (ortalama >= 80) harfNotu = 'BA';
    else if (ortalama >= 70) harfNotu = 'BB';
    else if (ortalama >= 60) harfNotu = 'CB';
    else if (ortalama >= 50) harfNotu = 'CC';
    else harfNotu = 'FF';

    // Durumu belirle
    const durum = ortalama >= 50 ? '✅ GEÇTİ' : '❌ KALDI';
    const durumClass = ortalama >= 50 ? 'gecti' : 'kaldi';

    // Sonuçları göster
    document.getElementById('sonucAdSoyad').textContent = adSoyad;
    document.getElementById('sonucVize').textContent = vizeNotu.toFixed(2);
    document.getElementById('sonucFinal').textContent = finalNotu.toFixed(2);
    document.getElementById('sonucOrtalama').textContent = ortalama.toFixed(2);
    document.getElementById('sonucHarfNotu').innerHTML = `<span class="badge-${harfNotu.toLowerCase()}">${harfNotu}</span>`;
    document.getElementById('sonucDurum').innerHTML = `<span style="font-weight: bold; font-size: 1.1em;">${durum}</span>`;

    // Sonuç bölümünü göster
    document.getElementById('sonuc').style.display = 'block';

    // Sayfayı sonuç bölümüne kaydır
    document.getElementById('sonuc').scrollIntoView({ behavior: 'smooth' });
});
