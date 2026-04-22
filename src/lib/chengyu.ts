import { readFileSync } from 'fs';
import { join } from 'path';

type Chengyu = {
    word: string;
    pinyin: string;
    explanation: string;
    derivation: string;
    example: string;
    abbreviation: string;
};

function getDaysSinceEpoch(): number {
    const now = new Date();
    const epoch = new Date('2000-01-01');
    const diff = now.getTime() - epoch.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getDailyChengyu(): Chengyu {
    const filePath = join(process.cwd(), 'src/data/chengyu-raw.json');
    const raw = readFileSync(filePath, 'utf-8');
    const data: Chengyu[] = JSON.parse(raw);

    if (data.length === 0) {
        throw new Error('Chengyu dataset is empty');
    }

    const index = getDaysSinceEpoch() % data.length;
    const entry = data[index];

    if (!entry) {
        throw new Error(`No chengyu found at index ${index}`);
    }

    return entry;
}