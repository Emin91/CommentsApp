import { BSON, Object } from "realm";

export class CommentSchema extends Object {
    public static primaryKey = "_id";
    public _id: BSON.ObjectId = new BSON.ObjectId();
    public username!: string;
    public text!: string;
    public replies: Realm.List<CommentSchema> = new Realm.List();
}