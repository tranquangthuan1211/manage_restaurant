import { WithId, ObjectId } from 'mongodb';


export function extractId(doc: WithId<any>):any {
    const { _id, ...rest } = doc;
    return { id: _id.toHexString(), ...rest };
}