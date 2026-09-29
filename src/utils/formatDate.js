export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const formatDateLong = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export const formatDateIN = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
