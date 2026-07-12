// Badge.jsx
// Small reusable pill for priority + status, used across Tasks/Edit/Create/Dashboard.
// Color encodes meaning consistently across the whole app:
//   priority -> High: coral · Medium: amber · Low: mint
//   status   -> Pending: amber · In Progress: sky · Completed: mint

const PRIORITY_STYLES = {
  High: { color: "var(--coral)", bg: "var(--coral-soft)" },
  Medium: { color: "var(--amber)", bg: "var(--amber-soft)" },
  Low: { color: "var(--mint)", bg: "var(--mint-soft)" },
};

const STATUS_STYLES = {
  Pending: { color: "var(--amber)", bg: "var(--amber-soft)" },
  "In Progress": { color: "var(--sky)", bg: "var(--sky-soft)" },
  Completed: { color: "var(--mint)", bg: "var(--mint-soft)" },
};

export function PriorityBadge({ value }) {
  const s = PRIORITY_STYLES[value] || PRIORITY_STYLES.Medium;
  return (
    <span
      style={{
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.color}33`,
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.02em",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />
      {value}
    </span>
  );
}

export function StatusBadge({ value }) {
  const s = STATUS_STYLES[value] || STATUS_STYLES.Pending;
  return (
    <span
      style={{
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.color}33`,
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.02em",
      }}
    >
      {value}
    </span>
  );
}

// Maps priority -> the signature spine color (used as a left border on cards)
export const PRIORITY_SPINE = {
  High: "var(--coral)",
  Medium: "var(--amber)",
  Low: "var(--mint)",
};

// Small initials-avatar + name chip for showing who a task is assigned to.
export function AssigneeChip({ user }) {
  const name = user?.name;
  const initials = name
    ? name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 700,
          color: name ? "white" : "var(--text-muted)",
          background: name
            ? "linear-gradient(135deg, var(--accent-light), var(--accent-dark))"
            : "var(--bg-input)",
          border: name ? "none" : "1px dashed var(--border-medium)",
        }}
      >
        {name ? initials : "—"}
      </div>
      <span
        style={{
          fontSize: 12.5,
          color: name ? "var(--text-secondary)" : "var(--text-muted)",
          fontStyle: name ? "normal" : "italic",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {name || "Unassigned"}
      </span>
    </div>
  );
}



// Badge.jsx
// Small reusable pill for priority + status, used across Tasks/Edit/Create/Dashboard.
// Color encodes meaning consistently across the whole app:
//   priority -> High: coral · Medium: amber · Low: mint
//   status   -> Pending: amber · In Progress: sky · Completed: mint

// const PRIORITY_STYLES = {
//   High: { color: "var(--coral)", bg: "var(--coral-soft)" },
//   Medium: { color: "var(--amber)", bg: "var(--amber-soft)" },
//   Low: { color: "var(--mint)", bg: "var(--mint-soft)" },
// };

// const STATUS_STYLES = {
//   Pending: { color: "var(--amber)", bg: "var(--amber-soft)" },
//   "In Progress": { color: "var(--sky)", bg: "var(--sky-soft)" },
//   Completed: { color: "var(--mint)", bg: "var(--mint-soft)" },
// };

// export function PriorityBadge({ value }) {
//   const s = PRIORITY_STYLES[value] || PRIORITY_STYLES.Medium;
//   return (
//     <span
//       style={{
//         color: s.color,
//         background: s.bg,
//         border: `1px solid ${s.color}33`,
//         padding: "4px 10px",
//         borderRadius: "999px",
//         fontSize: "12px",
//         fontWeight: 600,
//         letterSpacing: "0.02em",
//         display: "inline-flex",
//         alignItems: "center",
//         gap: "6px",
//       }}
//     >
//       <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />
//       {value}
//     </span>
//   );
// }

// export function StatusBadge({ value }) {
//   const s = STATUS_STYLES[value] || STATUS_STYLES.Pending;
//   return (
//     <span
//       style={{
//         color: s.color,
//         background: s.bg,
//         border: `1px solid ${s.color}33`,
//         padding: "4px 10px",
//         borderRadius: "999px",
//         fontSize: "12px",
//         fontWeight: 600,
//         letterSpacing: "0.02em",
//       }}
//     >
//       {value}
//     </span>
//   );
// }

// // Maps priority -> the signature spine color (used as a left border on cards)
// export const PRIORITY_SPINE = {
//   High: "var(--coral)",
//   Medium: "var(--amber)",
//   Low: "var(--mint)",
// };