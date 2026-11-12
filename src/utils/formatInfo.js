export function formatInfo(category, area) {
  return [category, area]
    .filter((v) => v && v.trim() !== '' && v !== 'Unknown')
    .join(' · ')
}