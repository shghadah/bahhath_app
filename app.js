const screen = document.getElementById('screen');
const startBtn = document.getElementById('startBtn');
const navItems = () => Array.from(document.querySelectorAll('.nav-item'));

const views = {
  splash: `
    <div class="splash">
      <h1>بحّاث للاستشارات</h1>
      <p>جلسات استشارية في متناول يدك — تواصل مع الخبراء بخطوات يسيرة</p>
      <button class="book-btn" onclick="setView('home')">ابدأ الآن</button>
    </div>
  `,
  home: `
    <div>
      <h2>الصفحة الرئيسية</h2>
      <input class="search" placeholder="🔍 ابحث عن خبير..." />
      <div class="card"><strong>د. نورة العويد</strong><p>مجال: تربوية</p><p class="gold">السعر: 150 ر.س / 30 دقيقة</p><button class="book-btn" onclick="setView('booking')">ابدأ الجلسة</button></div>
      <div class="card"><strong>د. خالد المالكي</strong><p>مجال: أسري</p><p class="gold">السعر: 180 ر.س / 30 دقيقة</p><button class="book-btn" onclick="setView('booking')">ابدأ الجلسة</button></div>
      <div class="card"><strong>د. منيرة الراشد</strong><p>مجال: تطوير ذات</p><p class="gold">السعر: 200 ر.س / 30 دقيقة</p><button class="book-btn" onclick="setView('booking')">ابدأ الجلسة</button></div>
    </div>
  `,
  expert: `
    <div>
      <h2>ملف الخبير</h2>
      <div class="profile">
        <div class="avatar"></div>
        <div>
          <strong>د. خالد المالكي</strong>
          <p class="muted">التحليل الإحصائي والبحث العلمي</p>
          <p class="gold">تقييم: ★★★★☆ (4.8)</p>
        </div>
      </div>
      <div class="card"><p><strong>نبذة:</strong> خبير في تصميم وتحليل البحوث العلمية باستخدام SPSS و AMOS.</p></div>
      <div class="row">
        <button class="book-btn" onclick="setView('booking')">احجز الآن</button>
        <button class="black-btn" onclick="setView('live')">استشارة فورية</button>
      </div>
    </div>
  `,
  booking: `
    <div>
      <h2>حجز الجلسة</h2>
      <p class="muted">🕓 اختر مدة الجلسة:</p>
      <div class="grid4">
        <span class="chip">30 دقيقة</span>
        <span class="chip">60 دقيقة</span>
        <span class="chip">90 دقيقة</span>
        <span class="chip">120 دقيقة</span>
      </div>
      <div class="card gold-panel"><p class="gold"><strong>💰 السعر الإجمالي:</strong> 200 ر.س / 60 دقيقة</p></div>
      <p class="muted">📅 الموعد: الأربعاء 5 نوفمبر، 7:00 م</p>
      <p class="muted">💳 الدفع: مدى، Visa، Apple Pay</p>
      <button class="book-btn" style="width:100%" onclick="setView('live')">تأكيد الحجز الآن</button>
    </div>
  `,
  live: `
    <div>
      <h2>الجلسة المباشرة</h2>
      <div class="live-box">
        <p>🎥 بث مباشر مع الخبير</p>
        <p class="muted">الوقت المتبقي: 25 دقيقة</p>
      </div>
      <div class="card">
        <p><strong>ملاحظاتي:</strong></p>
        <div class="notes">- تحديد نقاط البحث الأساسية.<br/>- مراجعة النتائج الأولية.</div>
      </div>
      <button class="red-btn" onclick="setView('reports')">إنهاء الجلسة</button>
      <p class="muted">قيّم التجربة: ★★★★★</p>
    </div>
  `,
  reports: `
    <div>
      <h2>التقارير والمكاسب</h2>
      <div class="grid2">
        <div class="card"><p>عدد الجلسات</p><strong>48</strong></div>
        <div class="card"><p>إجمالي الأرباح</p><strong>9,600 ر.س</strong></div>
      </div>
      <div class="card">
        <p>نمو الجلسات والأرباح خلال الشهر</p>
        <div style="height:90px;background:linear-gradient(90deg,#fde68a,#facc15);border-radius:8px"></div>
      </div>
      <p class="muted">متوسط التقييم العام: ★★★★★ (135 تقييم)</p>
    </div>
  `,
  register: `
    <div>
      <h2>التسجيل كخبير</h2>
      <div class="card">
        <input class="search" placeholder="الاسم الكامل" />
        <input class="search" placeholder="البريد الإلكتروني" />
        <input class="search" placeholder="التخصص" />
        <input class="search" placeholder="المؤهل العلمي" />
        <textarea class="search" placeholder="نبذة مختصرة عن الخبرة" style="height:80px"></textarea>
        <div class="chip">📎 إرفاق الملفات (CV – شهادات)</div>
        <button class="book-btn" style="width:100%">إرسال الطلب للمراجعة</button>
        <p class="success">✅ تم استلام طلبك — سيتم مراجعته خلال 48 ساعة.</p>
      </div>
    </div>
  `,
  admin: `
    <div>
      <h2>إدارة الخبراء</h2>
      <input class="search" placeholder="ابحث عن خبير أو تخصص..." />
      <div class="card">
        <strong>د. منيرة الراشد</strong>
        <p class="muted">التخصص: القيادة التعليمية | المؤهل: دكتوراه</p>
        <div class="row">
          <button class="book-btn">اعتماد</button>
          <button class="chip">تحت المراجعة</button>
          <button class="red-btn">رفض</button>
        </div>
      </div>
      <div class="card">
        <strong>أ. هدى العتيبي</strong>
        <p class="muted">التخصص: جودة وتميز | المؤهل: ماجستير</p>
        <div class="row">
          <button class="book-btn">اعتماد</button>
          <button class="chip">تحت المراجعة</button>
          <button class="red-btn">رفض</button>
        </div>
      </div>
      <p class="success">✅ تم اعتماد الطلب بنجاح وإرسال إشعار.</p>
    </div>
  `,
  support: `
    <div>
      <h2>الدعم الفني</h2>
      <div class="support-box">
        <p>نحن هنا لمساعدتك على مدار الساعة.</p>
        <div class="support-actions">
          <a class="button-like" href="mailto:support@bahhath.app">✉️ راسلنا بالبريد</a>
          <a class="button-like" href="https://wa.me/966500000000" target="_blank">💬 واتساب مباشر</a>
          <a class="button-like" href="tel:+966500000000">📞 اتصال فوري</a>
        </div>
      </div>
      <div class="card"><p class="muted">الاستجابة المتوقعة: خلال 2–6 ساعات عمل.</p></div>
    </div>
  `,
  end: `
    <div>
      <h2>بحّاث</h2>
      <p>✨ خبرات تجمعنا، ومعرفة ترتقي بنا.</p>
      <button class="preview-btn" onclick="setView('home')">🔁 إعادة العرض</button>
    </div>
  `,
};

function setView(view) {
  screen.innerHTML = views[view] || views['home'];
  navItems().forEach(n => n.classList.toggle('active', n.dataset.view === view));
  window.location.hash = view;
}

startBtn.addEventListener('click', () => setView('home'));
document.addEventListener('click', (e) => {
  const item = e.target.closest('.nav-item');
  if (item) setView(item.dataset.view);
});

const initial = window.location.hash.replace('#','') || 'splash';
setView(initial);

