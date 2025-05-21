export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "user";
}

export interface UserWithPermissions extends User {
  permissions: string[];
}
