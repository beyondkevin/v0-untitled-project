import { cn } from "@/lib/utils"

export default function ProjectList() {
  const projects = [
    { id: 1, name: "个人", active: true },
    { id: 2, name: "111", active: false },
  ]

  return (
    <div className="space-y-1">
      {projects.map((project) => (
        <button
          key={project.id}
          className={cn(
            "w-full text-left px-3 py-2 rounded-md text-sm",
            project.active ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100 text-gray-700",
          )}
        >
          {project.name}
        </button>
      ))}
    </div>
  )
}
