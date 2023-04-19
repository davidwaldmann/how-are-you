export class ScoreEntry {
    private categoryScores = new Map<number, number>();
    private mean?: number;
    private total?: number;

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
        if (this.total !== undefined) {
            return this.total;
        }
        let count: number = 0;
        let sum: number = 0;
        for (let score of this.categoryScores.values()) {
            if (score === undefined) {
                continue;
            }
            count++;
            // multiply score by 3 to get score 0 to 9
            sum += score * 3;
            // console.debug("get_total() count, score, sum: ", count, score, sum);
        }
        this.mean = sum / count;
        this.total = Math.round(this.mean);
        return this.total;
    }

    debug_set_total(total: number) {
        this.total = total;
    }
}

export const COLOR_CLASSES: string[] = [
    "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10",
];