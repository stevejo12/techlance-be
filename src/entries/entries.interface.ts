
export interface User {
  email: string;
  password: string;
}

export interface NewUser extends User {
  id: string
}