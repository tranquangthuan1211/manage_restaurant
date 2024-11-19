export function checkInputError<T>(
  input: Partial<T>, 
  schema: { [K in keyof T]: string } 
): { valid: boolean; errors: { field: keyof T; message: string }[] } {
  const errors: { field: keyof T; message: string }[] = [];

  for (const key in schema) {
    if (!(key in input)) {
      errors.push({ field: key, message: "Field is missing" });
    } else if (typeof input[key] !== schema[key]) {
      errors.push({ field: key, message: `Expected ${schema[key]}, got ${typeof input[key]}` });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
