import { BSON, Object } from "realm";

export class AuthSchema extends Object {
    public static primaryKey = "_id";
    public _id: BSON.ObjectId = new BSON.ObjectId();
    public userEmail!: string;
    public userName!: string;
    public userPassword!: string;
}