export class ScoreEntry {
    private categoryScores = new Map<number, number>();
    private mean?: number;

    add_score(categoryId: number, score: number): void {
        this.categoryScores.set(categoryId, score);
    }

    delete_score(categoryId: number): void {
        this.categoryScores.delete(categoryId);
    }

    get_score(categoryId: number): number | undefined {
        return this.categoryScores.get(categoryId);
    }

    get_total(): number {
        let count: number = 0;
        let sum: number = 0;
        for (let score of this.categoryScores.values()) {
            if (score === undefined) {
                continue;
            }
            count++;
            // multiply score by 3 to get score 0 to 9
            sum += score * 3;
        }
        this.mean = sum / count;
        return Math.round(this.mean);
    }
}

export const COLOR_CLASSES: string[] = [
    "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", 
];