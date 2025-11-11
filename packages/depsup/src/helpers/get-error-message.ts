/**
 * Extracts a readable error message from an unknown error object.
 * @param {unknown} error The error object to process.
 * @returns {string} A string representing the error message.
 * @example
 * getErrorMessage(new Error('Something went wrong')); // Returns: "Something went wrong"
 * getErrorMessage('Custom error string'); // Returns: "Custom error string"
 */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
