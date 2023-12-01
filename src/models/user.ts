/**
 * @Obs
 * Esta entidade não deve mudar independente do tipo do DB
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
