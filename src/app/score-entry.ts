import { CATEGORIES } from "./mock-categories";

export const COLOR_CLASSES: string[] = [
    "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", 
];

export class CategoryScore {
    categoryId: number;
    score?: number;

    public constructor(categoryId: number, score?: number) {
        this.categoryId = categoryId;
        this.score = score;
    }

    get_name(): string {
        return CATEGORIES[this.categoryId];
    }
}

export class ScoreEntry {
    private categoryScores: CategoryScore[] = [];
    private total: number = -1;
    private mean?: number;

    public constructor() {
        CATEGORIES.forEach((category, idx) => {
            this.categoryScores.push(new CategoryScore(idx))
        });
    }

    add_score(categoryId: number, score: number): void {
        this.categoryScores[categoryId].score = score;
    }

    get_score(categoryId: number): number | undefined {
        return (categoryId < this.categoryScores.length)? this.categoryScores[categoryId].score: NaN;
    }

    get_total(): number {
        if (this.total === -1) {
            this.calculate_total();
        }
        return this.total;
    }
    
    calculate_total(): void {
        let size = this.categoryScores.length;
        let sum: number = 0;
        for (let i = 0; i < size; i++) {
            let score = this.get_score(i);
            if (score === undefined) {
                console.error("*** David: Error in score-entry.ts -> calculate_total()");
                return;
            }
            sum += score * 3;
        }
        this.mean = sum / size;
        this.total = Math.round(this.mean);
    }
}