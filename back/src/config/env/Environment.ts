export default class Environment {
    env: string;
    host: string;
    port: number;
    protocol: "http" | "https";
    db: string;
    dbName: string;
    jwt_secret: string;
    jwt_expiration: number;
    login_jwt_secret: string;
    login_jwt_expiration: number;
    loginEmail: {
        transport: any;
        username: string;
    }
    loginUrl: string;
};