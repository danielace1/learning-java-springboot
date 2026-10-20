import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  Workflow,
} from "lucide-react";

import useAuthStore from "../store/authStore";
import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../services/taskService";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";

const filters = [
  { label: "All tasks", value: "ALL" },
  { label: "To do", value: "TODO" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.message ||
          "Could not load your tasks. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      await loadTasks();
    };

    fetchTasks();
  }, [loadTasks]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      inProgress: tasks.filter((task) => task.status === "IN_PROGRESS").length,
      completed: tasks.filter((task) => task.status === "COMPLETED").length,
    }),
    [tasks],
  );

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesFilter = filter === "ALL" || task.status === filter;

      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        (task.description || "").toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask.id, taskData);

        setTasks((current) =>
          current.map((task) =>
            task.id === updatedTask.id ? updatedTask : task,
          ),
        );
        setNotice("Task updated successfully.");
      } else {
        const newTask = await createTask(taskData);
        setTasks((current) => [newTask, ...current]);
        setNotice("Task created successfully.");
      }

      setModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the task.");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setError("");
    setNotice("");

    try {
      const updatedTask = await updateTaskStatus(id, status);

      setTasks((current) =>
        current.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        ),
      );

      setNotice("Task status updated.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update task status.");
    }
  };

  const handleDeleteTask = async (task) => {
    const confirmed = window.confirm(
      `Delete "${task.title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      await deleteTask(task.id);
      setTasks((current) => current.filter((item) => item.id !== task.id));
      setNotice("Task deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete the task.");
    }
  };

  const handleLogout = async () => {
    try {
      // Logout is handled locally for the current Bearer-token setup.
      logout();
      navigate("/login", { replace: true });
    } finally {
      // No cookie-based logout request is needed.
    }
  };

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Workflow size={23} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              TaskFlow
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-700 p-7 text-white shadow-lg shadow-indigo-600/10 sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-indigo-100">
                YOUR WORKSPACE
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back, {firstName}!
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                Organize your work, prioritize your goals, and make progress one
                task at a time.
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
            >
              <Plus size={19} />
              Create task
            </button>
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="mt-6 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <span>{error}</span>
            <button onClick={() => setError("")} className="font-semibold">
              Dismiss
            </button>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mt-6 flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            <span>{notice}</span>
            <button onClick={() => setNotice("")} className="font-semibold">
              Dismiss
            </button>
          </div>
        )}

        <section className="mt-9">
          <h2 className="text-xl font-bold text-slate-900">Overview</h2>
          <p className="mt-1 text-sm text-slate-500">
            A live summary of your tasks.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              {
                label: "Total tasks",
                value: stats.total,
                icon: ClipboardList,
                color: "bg-indigo-50 text-indigo-600",
              },
              {
                label: "In progress",
                value: stats.inProgress,
                icon: Clock3,
                color: "bg-amber-50 text-amber-600",
              },
              {
                label: "Completed",
                value: stats.completed,
                icon: CheckCircle2,
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      {item.label}
                    </span>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon size={20} />
                    </span>
                  </div>
                  <p className="mt-4 text-3xl font-bold text-slate-900">
                    {stats.total === 0 && loading ? "—" : item.value}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Your tasks</h2>
              <p className="mt-1 text-sm text-slate-500">
                Create tasks and keep track of your progress.
              </p>
            </div>

            <button
              onClick={loadTasks}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 sm:self-auto"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500"
            >
              {filters.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
              Loading your tasks...
            </div>
          ) : visibleTasks.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <ClipboardList size={26} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {tasks.length === 0
                  ? "Your task list is empty"
                  : "No matching tasks"}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {tasks.length === 0
                  ? "Create your first task to start organizing your work."
                  : "Try another search term or change the selected filter."}
              </p>

              {tasks.length === 0 && (
                <button
                  onClick={openCreateModal}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Plus size={18} />
                  Create your first task
                </button>
              )}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={openEditModal}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <TaskModal
        open={modalOpen}
        task={editingTask}
        saving={saving}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSaveTask}
      />
    </main>
  );
}
