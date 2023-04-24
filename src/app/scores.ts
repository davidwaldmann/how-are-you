import { ScoreEntry } from "./score-entry";

export interface IScores {
    [year: number]: {
        [month: number]: {
            [day: number]: ScoreEntry
        }
    }
}