export const tagColors = [
  "text-purple-400 border-purple-500/30 bg-purple-500/10",
  "text-blue-400 border-blue-500/30 bg-blue-500/10",
  "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  "text-amber-400 border-amber-500/30 bg-amber-500/10",
  "text-green-400 border-green-500/30 bg-green-500/10",
  "text-teal-400 border-teal-500/30 bg-teal-500/10",
];

export function getTagColor(tag) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return tagColors[Math.abs(hash) % tagColors.length];
}
