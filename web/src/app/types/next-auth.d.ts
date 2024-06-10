import 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string | any;
        name?: string;
        email?: string;
        phone?: string;
        password?: string;
        image?: string;
        role?: string;
        isActive?: boolean;
    }
    interface Session {
        user: {
            _id?: string | any;
            name?: string | any;
            email?: string | any;
            phone?: string | any;
            password?: string | any;
            image?: string | any;
            role?: string | any;
            isActive?: boolean | any;
        }
    } DefaultSession['user']
}