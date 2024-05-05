import { passwordRegex } from './regex';

export function passwordValidation(val: string) {
  return passwordRegex.test(val);
}
