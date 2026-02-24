import appointmentImg from "./assets/AppointmentSystem.png"
import taskImg from "./assets/TaskManagement.png"

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Ana içeriğe atla</a>

      <header>
        <h1>Ad Soyad - Kişisel Portföy</h1>

        <nav aria-label="Ana navigasyon">
          <ul>
            <li><a href="#hakkimda">Hakkımda</a></li>
            <li><a href="#projeler">Projeler</a></li>
            <li><a href="#iletisim">İletisim</a></li>
          </ul>
        </nav>
      </header>

      <main id="main-content">

        <section id="hakkimda">
          <h2>Hakkımda</h2>

          <figure>
            <img
              src="https://via.placeholder.com/150"
              alt="Profil fotoğrafım"
            />
            <figcaption>Eylem Etli</figcaption>
          </figure>

          <p>
            Yazılım mühendisliği öğrencisiyim. C#, Python, TensorFlow ve web
            teknolojileri ile projeler geliştiriyorum. Amacım yapay zeka ve full-stack
            geliştirme alanında uzmanlaşmak.
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

        <section id="projeler">
          <h2>Projelerim</h2>

          <article>
            <h3>Randevu Sistemi</h3>
            <img
              src={appointmentImg}
              alt="Randevu yönetim sistemi ekran görüntüsü"
            />
            <p>ASP.NET Core MVC ile geliştirilmiş CRUD tabanlı randevu uygulaması.</p>
          </article>

          <article>
            <h3>Task Management</h3>
            <img
              src={taskImg}
              alt="Task Management Anasayfa"
            />
            <p>ASP.Net Core + LocalDB ile görev tönetimi ve takibi uygulaması.</p>
          </article>

        </section>

        <section id="iletisim">
          <h2>İletişim</h2>
        </section>

      </main>

      <footer>
        <p>© 2025 Ad Soyad. Tüm hakları saklıdır.</p>
      </footer>
    </>
  )
}

export default App