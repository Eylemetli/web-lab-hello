import appointmentImg from "../assets/AppointmentSystem.png"
import taskImg from "../assets/TaskManagement.png"
import type { Project } from "../types/project"

export const projects: Project[] = [
    {
        id: "appointment-system",
        title: "Randevu Sistemi",
        description: "ASP.NET Core MVC ile geliştirilmiş CRUD tabanlı randevu uygulaması.",
        category: "backend",
        imageSrc: appointmentImg,
        repoUrl: "https://github.com/Eylemetli/AppointmentSystem",
    },
    {
        id: "task-management",
        title: "Task Management",
        description: "ASP.NET Core + LocalDB ile görev yönetimi ve takibi uygulaması.",
        category: "backend",
        imageSrc: taskImg,
        repoUrl: "https://github.com/Eylemetli/TaskManagement",
    },
]