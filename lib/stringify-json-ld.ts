/** Serialize JSON-LD for inline `<script>` without breaking out on `</script>`. */
export function stringifyJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
