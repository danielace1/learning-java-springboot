const statusStyles = {
  TODO: "bg-slate-100 text-slate-700 ring-slate-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 ring-amber-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const statusLabels = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

export default function TaskStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[status] || statusStyles.TODO
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
