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

    static async getOne(id: string): Promise<WordRecord | null> {
        const [result] = await pool.execute("SELECT * FROM `words` WHERE `id` = :id", {
            id,
        }) as WordRecordResult;
        return result.length === 0 ? null : new WordRecord(result[0]);
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `words` WHERE `id` =:id", {
            id: this.id,
        });
    }

    async addWord(userId: string): Promise<void> {
        const id = uuid();

        await pool.execute("INSERT INTO `words`(`id`, `title`, `description`, `notes`, `userId`) VALUES(:id, :title, :description, :notes, :userId)", {
            id,
            title: this.title,
            description: this.description,
            notes: this.notes,
            userId,
        })
    }
}