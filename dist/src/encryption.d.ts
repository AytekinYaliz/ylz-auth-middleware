export interface IPayload {
    ext: number;
    iat: number;
    uid: string;
}
export declare function decodeToken(token: string): Promise<IPayload>;
export declare function verifyToken(token: string): Promise<boolean>;
