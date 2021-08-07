export interface IUser {
    name: string;
    age: number;
    email: string;
    newsletter: 'daily' | 'weekly' | 'monthly';
}