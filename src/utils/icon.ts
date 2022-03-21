export function isValidKey(
  key: string | number | symbol,
  object: Record<string, unknown>
): key is keyof typeof object {
  return key in object;
}
