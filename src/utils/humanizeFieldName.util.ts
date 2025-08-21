/**
 *  "email" -> "Email"
 *  "firstName" -> "First name"
 */
export function humanizeFieldName(field: string): string {
  // Insert space before uppercase letters and lowercase the rest
  const result = field
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .trim();

  // Capitalize the first letter
  return result.charAt(0).toUpperCase() + result.slice(1);
}
