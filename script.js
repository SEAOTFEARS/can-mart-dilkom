document.addEventListener('DOMContentLoaded', () => {

    // 1. INTRO OVERLAY (HER AÇILIŞTA 5 SANİYE OTOMATİK FADE)
    const introOverlay = document.getElementById('intro-overlay');

    if (introOverlay) {
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            introOverlay.classList.add('hide-intro');
            document.body.style.overflow = 'auto';
        }, 5000);
    }

    // 2. MOBİL MENÜ
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close');

    if (navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-mobile'));
    if (navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-mobile'));

    // Menüdeki bir linke tıklayınca mobil menüyü otomatik kapat
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => navMenu.classList.remove('show-mobile'));
    });

    // 3. SCROLL ANİMASYONLARI
    const animatedCards = document.querySelectorAll('.animate-card-left, .animate-card-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });

    animatedCards.forEach(card => observer.observe(card));

    // 4. FLOATING ORB LIVE CHAT
    const chatOrb = document.getElementById('chat-orb'),
          chatModal = document.getElementById('chat-modal'),
          chatCloseBtn = document.getElementById('chat-close-btn'),
          chatLogs = document.getElementById('chat-logs'),
          chatUserInput = document.getElementById('chat-user-input'),
          chatSendBtn = document.getElementById('chat-send-btn');

    if (chatOrb) chatOrb.addEventListener('click', () => chatModal.classList.toggle('active'));
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', () => chatModal.classList.remove('active'));

    function pushMessage() {
        const text = chatUserInput.value.trim();
        if (text === "") return;

        createBubble(text, 'user');
        chatUserInput.value = "";

        setTimeout(() => {
            const reply = getAssistantReply(text);
            createBubble(reply, 'bot');
        }, 500);
    }

    function createBubble(text, sender) {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender);
        bubble.innerHTML = text;
        chatLogs.appendChild(bubble);
        chatLogs.scrollTop = chatLogs.scrollHeight;
    }

    function getAssistantReply(input) {
        const query = input.toLocaleLowerCase('tr-TR');

        if (query.includes("servis") || query.includes("ulaşım")) {
            return "Evet, kurumumuzun <b>ücretsiz özel servis hizmeti</b> bulunmaktadır.";
        } else if (query.includes("iletişim") || query.includes("telefon") || query.includes("numara")) {
            return "Bize doğrudan <b>+90 553 488 63 01</b> numarasından ulaşabilirsiniz.";
        } else if (query.includes("adres") || query.includes("nerede")) {
            return "Adresimiz: <b>Osmaniye Düziçi Şehit Asker Kemal Keskin Mahallesi Vadi Sokak No: 17</b>";
        } else {
            return "Sorunuz için **+90 553 488 63 01** telefon hattımızdan veya <a href='https://wa.me/905534886301' target='_blank' style='color:#06b6d4;'>WhatsApp hattımızdan</a> bilgi alabilirsiniz.";
        }
    }

    if (chatSendBtn) chatSendBtn.addEventListener('click', pushMessage);
    if (chatUserInput) {
        chatUserInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') pushMessage();
        });
    }

    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chatUserInput.value = chip.innerText;
            pushMessage();
        });
    });

});








document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    if (!introOverlay) return;

    // Sadece index.html veya anasayfada olup olmadığını URL sonundan veya body etiketinden kontrol edelim
    const path = window.location.pathname;
    const isHomepage = path === '/' || path.endsWith('index.html') || path === '' || path.endsWith('/') || document.body.getAttribute('data-page') === 'home';

    // Eğer anasayfada değilsek intro elementini anında tamamen yok et
    if (!isHomepage) {
        introOverlay.remove();
        return;
    }

    // Anasayfadayız ancak bu oturumda (sekme açık kaldığı sürece) daha önce gösterildi mi?
    if (sessionStorage.getItem('canMartIntroShown')) {
        introOverlay.remove();
        return;
    }

    // İlk kez giriliyor; oturum hafızasına kaydet ki diğer sayfalara gidip gelince tetiklenmesin
    sessionStorage.setItem('canMartIntroShown', 'true');

    // İntronun ekranda düzgünce kalıp okunabilmesi için süreyi 3 saniye (3000ms) yaptık
    setTimeout(() => {
        introOverlay.classList.add('fade-out');
        setTimeout(() => introOverlay.remove(), 800); // Fade-out animasyonu bittikten sonra DOM'dan sil
    }, 3000);
});


