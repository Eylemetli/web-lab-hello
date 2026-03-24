import type { FilterState, Category, SortField, SortOrder } from "../types/project"

type Props = {
    filters: FilterState
    onChange: (next: FilterState) => void
}

const toCategory = (v: string): FilterState["category"] =>
    v === "all" ? "all" : (v as Category)

const toSortField = (v: string): SortField =>
    v === "title" || v === "category" ? v : "title"

const toSortOrder = (v: string): SortOrder =>
    v === "asc" || v === "desc" ? v : "asc"

export default function ProjectsFilters({ filters, onChange }: Props) {
    return (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
                <label htmlFor="project-search" className="font-semibold">
                    Ara
                </label>
                <input
                    id="project-search"
                    type="text"
                    value={filters.query}
                    onChange={(e) => onChange({ ...filters, query: e.target.value })}
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
                        onChange={(e) => onChange({ ...filters, category: toCategory(e.target.value) })}
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
                        onChange={(e) => onChange({ ...filters, sortField: toSortField(e.target.value) })}
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
                        onChange={(e) => onChange({ ...filters, sortOrder: toSortOrder(e.target.value) })}
                        className="border border-slate-300 rounded-md px-3 py-2"
                    >
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
            </div>
        </div>
    )
}