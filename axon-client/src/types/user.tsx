export interface IUser {
  user_id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  subscription: Subscription;
}

export interface Subscription {
  id: string;
  plan: "INACTIVE" | "EXPLORER" | "PRO";
}
