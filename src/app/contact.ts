export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phones: Phone[];
}

export interface Phone{
    id: number,
    type: string;
    number: string;
}