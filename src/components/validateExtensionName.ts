/**
 * Validates whether the provided extension name is valid.
 *
 * An extension name is considered valid if it:
 * - Starts with a lowercase letter (`a-z`)
 * - Is followed by one or more characters that can be uppercase or lowercase letters (`a-zA-Z`), digits (`0-9`), or underscores (`_`)
 *
 * @param name - The extension name to validate.
 * @returns `true` if the name is a valid extension name, otherwise `false`.
 */
const extensionNameRegex = new RegExp('^[a-z][a-zA-Z0-9_]+$');

export default function validateExtensionName(name: string): boolean {
  return extensionNameRegex.test(name);
}