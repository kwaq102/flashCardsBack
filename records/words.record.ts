import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";


type WordRecordResult = [WordRecord[], FieldPacket[]]

export class WordRecord {

    id?: string;
    title: string;
    description: string;
    notes: string;


    constructor(obj: WordRecord) {
        // TODO zrobić walidację

        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.notes = obj.notes;

    }

    static async listAll(): Promise<WordRecord[]> {

        const [results] = (await pool.execute("SELECT * FROM `words`")) as WordRecordResult;

        console.log(results);

        return results.map(obj => new WordRecord(obj))


    }

}