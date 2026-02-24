import appointmentImg from "./assets/AppointmentSystem.png"
import taskImg from "./assets/TaskManagement.png"

function App() {
  return (
    <>
      {/* Skip link (klavye kullanıcıları için) */}
      <a href="#main-content" className="skip-link">
        Ana içeriğe atla
      </a>

      <header>
        <h1>Eylem Etli - Kişisel Portföy</h1>

        {/* ARIA label navigasyon için */}
        <nav aria-label="Ana navigasyon">
          <ul>
            <li><a href="#hakkimda">Hakkımda</a></li>
            <li><a href="#projeler">Projeler</a></li>
            <li><a href="#iletisim">İletişim</a></li>
          </ul>
        </nav>
      </header>

      <main id="main-content">

        {/* Hakkımda */}
        <section id="hakkimda">
          <h2>Hakkımda</h2>

          <figure>
            <img
              src="https://via.placeholder.com/150"
              alt="Profil fotoğrafım"
              loading="lazy"
            />
            <figcaption>Eylem Etli</figcaption>
          </figure>

          <p>
            Yazılım mühendisliği öğrencisiyim. C#, Python, TensorFlow ve modern web
            teknolojileri ile projeler geliştiriyorum. Amacım yapay zeka ve
            full-stack geliştirme alanında uzmanlaşmak.
          </p>

          <h3>Kullandığım Teknolojiler</h3>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>ASP.NET Core</li>
            <li>Python</li>
            <li>TensorFlow</li>
          </ul>
        </section>

        {/* Projeler */}
        <section id="projeler">
          <h2>Projelerim</h2>

          <article>
            <h3>Randevu Sistemi</h3>
            <img
              src={appointmentImg}
              alt="Randevu yönetim sistemi ekran görüntüsü"
              loading="lazy"
            />
            <p>
              ASP.NET Core MVC ile geliştirilmiş CRUD tabanlı randevu uygulaması.
            </p>
          </article>

          <article>
            <h3>Task Management</h3>
            <img
              src={taskImg}
              alt="Task yönetim sistemi ana sayfa ekranı"
              loading="lazy"
            />
            <p>
              ASP.NET Core + LocalDB ile görev yönetimi ve takibi uygulaması.
            </p>
          </article>
        </section>

        <section id="iletisim">
          <h2>İletişim</h2>

          <form action="#" method="POST" noValidate>
            <fieldset>
              <legend>İletişim Formu</legend>

              <div className="form-group">
                <label htmlFor="name">Ad Soyad:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  aria-describedby="name-error"
                />
                <small id="name-error" className="error-msg" role="alert"></small>
              </div>

              <div className="form-group">
                <label htmlFor="email">E-posta:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-describedby="email-error"
                />
                <small id="email-error" className="error-msg" role="alert"></small>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Konu:</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  aria-describedby="subject-error"
                >
                  <option value="">-- Seçiniz --</option>
                  <option value="is">İş Teklifi</option>
                  <option value="soru">Soru</option>
                  <option value="oneri">Öneri</option>
                </select>
                <small id="subject-error" className="error-msg" role="alert"></small>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mesajınız:</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  aria-describedby="message-error"
                ></textarea>
                <small id="message-error" className="error-msg" role="alert"></small>
              </div>

              <button type="submit">Gönder</button>
            </fieldset>
          </form>
        </section>

      </main>

      {/* Landmark role */}
      <footer role="contentinfo">
        <p>© 2026 Eylem Etli. Tüm hakları saklıdır.</p>
      </footer>
    </>
  )
}

export default App