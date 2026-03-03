import appointmentImg from "./assets/AppointmentSystem.png"
import taskImg from "./assets/TaskManagement.png"
import { useRef, useState } from "react"

function App() {
  const formRef = useRef<HTMLFormElement | null>(null)

  const setError = (id: string, message: string) => {
    const el = document.getElementById(id)
    if (el) el.textContent = message
  }

  const clearErrors = () => {
    setError("name-error", "")
    setError("email-error", "")
    setError("subject-error", "")
    setError("message-error", "")

      ;["name", "email", "subject", "message"].forEach((fieldId) => {
        const input = document.getElementById(fieldId)
        if (input) input.setAttribute("aria-invalid", "false")
      })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearErrors()

    const name = (document.getElementById("name") as HTMLInputElement | null)?.value?.trim() ?? ""
    const email = (document.getElementById("email") as HTMLInputElement | null)?.value?.trim() ?? ""
    const subject = (document.getElementById("subject") as HTMLSelectElement | null)?.value ?? ""
    const message = (document.getElementById("message") as HTMLTextAreaElement | null)?.value?.trim() ?? ""

    let hasError = false

    if (name.length < 2) {
      setError("name-error", "Ad Soyad en az 2 karakter olmalıdır.")
      document.getElementById("name")?.setAttribute("aria-invalid", "true")
      hasError = true
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) {
      setError("email-error", "Lütfen geçerli bir e-posta adresi giriniz.")
      document.getElementById("email")?.setAttribute("aria-invalid", "true")
      hasError = true
    }

    if (!subject) {
      setError("subject-error", "Lütfen bir konu seçiniz.")
      document.getElementById("subject")?.setAttribute("aria-invalid", "true")
      hasError = true
    }

    if (message.length < 10) {
      setError("message-error", "Mesaj en az 10 karakter olmalıdır.")
      document.getElementById("message")?.setAttribute("aria-invalid", "true")
      hasError = true
    }

    if (hasError) return

    alert("Form başarıyla gönderildi (demo).")
    formRef.current?.reset()
  }
  const [activeProject, setActiveProject] = useState<null | "appointment" | "task">(null)

  const closeModal = () => setActiveProject(null)
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

          <div className="projects-grid">
            <article>
              <h3>Randevu Sistemi</h3>
              <img
                src={appointmentImg}
                alt="Randevu yönetim sistemi ekran görüntüsü"
                loading="lazy"
              />
              <p>ASP.NET Core MVC ile geliştirilmiş CRUD tabanlı randevu uygulaması.</p>
              <button type="button" onClick={() => setActiveProject("appointment")}>
                Detay
              </button>
            </article>

            <article>
              <h3>Task Management</h3>
              <img
                src={taskImg}
                alt="Task yönetim sistemi ana sayfa ekranı"
                loading="lazy"
              />
              <p>ASP.NET Core + LocalDB ile görev yönetimi ve takibi uygulaması.</p>
              <button
                type="button"
                onClick={() => {

                  setActiveProject("task")
                }}
              >
                Detay
              </button>
            </article>
          </div>
        </section>

        <section id="iletisim">
          <h2>İletişim</h2>

          <form ref={formRef} action="#" method="POST" noValidate onSubmit={handleSubmit}>
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
        {activeProject && (
          <div
            className="modal-overlay"
            role="presentation"
            onClick={closeModal}
          >
            <div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="modal-title">
                {activeProject === "appointment" ? "Randevu Sistemi" : "Task Management"}
              </h3>

              <p>
                {activeProject === "appointment"
                  ? "Bu projede kullanıcıların randevu oluşturma, güncelleme, silme ve listeleme işlemleri yapılır. ASP.NET Core MVC + CRUD mimarisi."
                  : "Bu projede görev oluşturma, tamamlama, silme ve filtreleme gibi işlemler yapılır. ASP.NET Core + LocalDB ile geliştirildi."}
              </p>

              <button type="button" onClick={closeModal}>
                Kapat
              </button>
            </div>
          </div>
        )}
        {activeProject && (
          <div className="modal-overlay" role="presentation" onClick={closeModal}>
            <div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="modal-title">
                {activeProject === "appointment" ? "Randevu Sistemi" : "Task Management"}
              </h3>

              <p>
                {activeProject === "appointment"
                  ? "Bu projede kullanıcıların randevu oluşturma, güncelleme, silme ve listeleme işlemleri yapılır. ASP.NET Core MVC + CRUD mimarisi."
                  : "Bu projede görev oluşturma, tamamlama, silme ve filtreleme gibi işlemler yapılır. ASP.NET Core + LocalDB ile geliştirildi."}
              </p>

              <button type="button" onClick={closeModal}>
                Kapat
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Landmark role */}
      <footer role="contentinfo">
        <p>© 2026 Eylem Etli. Tüm hakları saklıdır.</p>
      </footer>
    </>
  )
}

export default App