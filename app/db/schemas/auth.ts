import { Realm } from "@realm/react";
import { BSON, Object } from "realm";

export class AuthSchema extends Object {
    public _id: Realm.BSON.ObjectId = new BSON.ObjectID();
    public userEmail!: string;
    public userName!: string;
    public userPassword!: string;
}