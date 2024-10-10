import { Realm } from "@realm/react";
import { BSON, Object, Types } from "realm";

export class CommentSchema extends Object {
    public _id: Realm.BSON.ObjectId = new BSON.ObjectID();
    public id!: string;
    public username!: string;
    public text!: string;
    public replies!: Types.List<string>;
}