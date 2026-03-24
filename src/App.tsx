import { projects } from "./data/projects"
import { useRef, useState, useEffect } from "react"
import Button from "./components/Button"
import type { FilterState } from "./types/project"
import type { Category, SortField, SortOrder } from "./types/project"
import ProjectCard from "./components/ProjectCard"

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

  const [filters, setFilters] = useState<FilterState>({
    query: "",
    category: "all",
    sortField: "title",
    sortOrder: "asc",
  })

  const visibleProjects = projects
    .filter((p) => {
      const q = filters.query.trim().toLowerCase()
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)

      const matchesCategory =
        filters.category === "all" || p.category === filters.category

      return matchesQuery && matchesCategory
    })
    .sort((a, b) => {
      const aVal = a[filters.sortField].toLowerCase()
      const bVal = b[filters.sortField].toLowerCase()

      if (aVal < bVal) return filters.sortOrder === "asc" ? -1 : 1
      if (aVal > bVal) return filters.sortOrder === "asc" ? 1 : -1
      return 0
    })
  const toCategory = (v: string): FilterState["category"] =>
    v === "all" ? "all" : (v as Category)

  const toSortField = (v: string): SortField =>
    v === "title" || v === "category" ? v : "title"

  const toSortOrder = (v: string): SortOrder =>
    v === "asc" || v === "desc" ? v : "asc"
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

          {/* Filtre UI */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <label htmlFor="project-search" className="font-semibold">
                Ara
              </label>
              <input
                id="project-search"
                type="text"
                value={filters.query}
                onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                placeholder="Proje adı / açıklama..."
                className="border border-slate-300 rounded-md px-3 py-2 w-full sm:w-72"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="font-semibold">
                  Kategori
                </label>
                <select
                  id="category"
                  value={filters.category}
                  onChange={(e) => setFilters((f) => ({ ...f, category: toCategory(e.target.value) }))}
                  className="border border-slate-300 rounded-md px-3 py-2"
                >
                  <option value="all">Tümü</option>
                  <option value="backend">Backend</option>
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="ai">AI</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="sortField" className="font-semibold">
                  Sırala
                </label>
                <select
                  id="sortField"
                  value={filters.sortField}
                  onChange={(e) => setFilters((f) => ({ ...f, sortField: toSortField(e.target.value) }))}
                  className="border border-slate-300 rounded-md px-3 py-2"
                >
                  <option value="title">Başlık</option>
                  <option value="category">Kategori</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="sortOrder" className="font-semibold">
                  Yön
                </label>
                <select
                  id="sortOrder"
                  value={filters.sortOrder}
                  onChange={(e) => setFilters((f) => ({ ...f, sortOrder: toSortOrder(e.target.value) }))}
                  className="border border-slate-300 rounded-md px-3 py-2"
                >
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Liste */}
          <div className="projects-grid mt-6">
            {visibleProjects.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setActiveProjectId} />
            ))}
          </div>

          {/* Empty state: map dışı */}
          {visibleProjects.length === 0 && (
            <p className="mt-4 text-slate-600">Eşleşen proje bulunamadı.</p>
          )}
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
        {
          activeProject && (
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
          )
        }

      </main >

      {/* Landmark role */}
      < footer role="contentinfo" >
        <p>© 2026 Eylem Etli. Tüm hakları saklıdır.</p>
      </footer >
    </>
  )
}

export default App