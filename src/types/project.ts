export type Category = "web" | "mobile" | "backend" | "ai" | "other"

export type SortField = "title" | "category"
export type SortOrder = "asc" | "desc"

export type Project = {
    id: string
    title: string
    description: string
    category: Category
    imageSrc?: string
    repoUrl?: string
    liveUrl?: string
}

export type FilterState = {
    query: string
    category: Category | "all"
    sortField: SortField
    sortOrder: SortOrder
}