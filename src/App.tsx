import { projects } from "./data/projects"
import { useRef, useState, useEffect } from "react"
import Button from "./components/Button"

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
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)

  const closeModal = () => setActiveProjectId(null)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProjectId) {
        closeModal()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activeProjectId])
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (activeProjectId) {
      // modal DOM'a basıldıktan sonra focus
      setTimeout(() => closeBtnRef.current?.focus(), 0)
    }
  }, [activeProjectId])

  const activeProject = activeProjectId
    ? projects.find((p) => p.id === activeProjectId)
    : null
  return (
    <>
      {/* Skip link (klavye kullanıcıları için) */}
      <a href="#main-content" className="skip-link">
        Ana içeriğe atla
      </a>

      <header className="bg-primary text-white p-6 rounded-lg">
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
            {projects.map((p) => (
              <article key={p.id}>
                <h3>{p.title}</h3>

                {p.imageSrc && (
                  <img src={p.imageSrc} alt={`${p.title} ekran görüntüsü`} loading="lazy" />
                )}

                <p>{p.description}</p>

                <div className="flex gap-3 flex-wrap">
                  <Button type="button" onClick={() => setActiveProjectId(p.id)} variant="primary">
                    Detay
                  </Button>

                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-semibold"
                    >
                      Repo
                    </a>
                  )}
                </div>
              </article>
            ))}
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
            className="fixed inset-0 bg-black/50 grid place-items-center p-6"
            role="presentation"
            onClick={closeModal}
          >
            <div
              className="w-[min(520px,100%)] bg-white text-slate-900 rounded-2xl p-6 shadow-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="modal-title" className="text-xl font-bold">
                {activeProject.title}
              </h3>

              {activeProject.imageSrc && (
                <img
                  src={activeProject.imageSrc}
                  alt={`${activeProject.title} ekran görüntüsü`}
                  className="mt-4 w-full rounded-lg"
                  loading="lazy"
                />
              )}

              <p className="mt-4">{activeProject.description}</p>

              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  onClick={closeModal}
                  ref={closeBtnRef}
                  variant="outline"
                >
                  Kapat
                </Button>
              </div>
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