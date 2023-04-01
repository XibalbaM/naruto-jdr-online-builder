export default class Environment {
    env: string;
    host: string;
    port: number;
    protocol: "http" | "https";
    db: string;
    jwt_secret: string;
    jwt_expiration: number;
    loginTokenExpiration: number;
    loginEmail: {
        transport: any;
        username: string;
    }
    loginUrl: string;
};