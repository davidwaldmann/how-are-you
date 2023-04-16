import { CATEGORIES } from "./mock-categories";

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
}