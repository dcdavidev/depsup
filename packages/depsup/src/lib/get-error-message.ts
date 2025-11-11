/**
 * Extracts a readable error message from an unknown error object.
 * @param error The error object to process.
 * @returns A string representing the error message.
 * @example
 * getErrorMessage(new Error('Something went wrong'));
 */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
