import Button from "./Button"
import type { Project } from "../types/project"

type Props = {
    project: Project
    onOpen: (id: string) => void
}

export default function ProjectCard({ project, onOpen }: Props) {
    return (
        <article>
            <h3>{project.title}</h3>

            {project.imageSrc && (
                <img
                    src={project.imageSrc}
                    alt={`${project.title} ekran görüntüsü`}
                    loading="lazy"
                />
            )}

            <p>{project.description}</p>

            <div className="flex gap-3 flex-wrap">
                <Button type="button" onClick={() => onOpen(project.id)} variant="primary">
                    Detay
                </Button>

                {project.repoUrl && (
                    <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline font-semibold"
                    >
                        Repo
                    </a>
                )}
            </div>
        </article>
    )
}