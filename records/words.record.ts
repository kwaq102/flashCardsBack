import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";
import { v4 as uuid } from 'uuid'


type WordRecordResult = [WordRecord[], FieldPacket[]]

export class WordRecord {

    id: string;
    title: string;
    description: string;
    notes: string;
    userId: string;

    constructor(obj: WordRecord) {
        // TODO zrobić walidację

        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.notes = obj.notes;
        this.userId = obj.userId;
    }

    static async listAll(id: string): Promise<WordRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `words` WHERE `userId` = :userId", {
            userId: id
        })) as WordRecordResult;

        return results.map(obj => new WordRecord(obj))
    }

    async addWord(): Promise<void> {
        const id = uuid();

        await pool.execute("INSERT INTO `words`(`id`, `title`, `description`, `notes`, `userId`) VALUES(:id, :title, :description, :notes, :userId)", {
            id,
            title: this.title,
            description: this.description,
            notes: this.notes,
            userId: this.userId,
        })
    }
}