import {
  Check,
  Circle,
  Clock3,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import TaskStatusBadge from "./TaskStatusBadge";

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nextStatus =
    task.status === "TODO"
      ? "IN_PROGRESS"
      : task.status === "IN_PROGRESS"
        ? "COMPLETED"
        : "TODO";

  const nextLabel =
    nextStatus === "IN_PROGRESS"
      ? "Start task"
      : nextStatus === "COMPLETED"
        ? "Complete task"
        : "Move to to do";

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <TaskStatusBadge status={task.status} />
          <h3 className="mt-3 break-words font-semibold text-slate-900">
            {task.title}
          </h3>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Task options"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <MoreHorizontal size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-10 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(task);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                <Pencil size={15} /> Edit task
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(task);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={15} /> Delete task
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 min-h-10 whitespace-pre-wrap break-words text-sm leading-5 text-slate-500">
        {task.description || "No description provided."}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          {task.createdAt
            ? new Date(task.createdAt).toLocaleDateString()
            : "Recently created"}
        </span>

        <button
          type="button"
          onClick={() => onStatusChange(task.id, nextStatus)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
        >
          {task.status === "TODO" ? (
            <Circle size={14} />
          ) : task.status === "IN_PROGRESS" ? (
            <Clock3 size={14} />
          ) : (
            <Check size={14} />
          )}
          {nextLabel}
        </button>
      </div>
    </article>
  );
}
