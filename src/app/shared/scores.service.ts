import { Injectable } from '@angular/core';
import { ScoreEntry } from '../score-entry';
import { CategoryService } from './category.service';
import { IScores } from '../scores';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  private scores: IScores = {};
  private nextDay = 1;

  public constructor(private categoryService: CategoryService) {
  }

  public get_score_entry(year: number, month: number, day: number): ScoreEntry | undefined {
    if (!this.has_entry(year, month, day)) return undefined;
    return this.scores[year][month][day];
  }

  public get_score_month(year: number, month: number) {
    if (this.scores[year] && this.scores[year][month]) {
      return this.scores[year][month];
    }
    return {};
  }

  public add_score_entry_return_not_already_exists(scoreEntry: ScoreEntry): boolean {
    let date = scoreEntry.get_date();
    console.log("add_score_entry() date = ", date);
    if (this.scores[date.getFullYear()] === undefined) {
      // Initialize year and month before assigning entry;
      this.scores[date.getFullYear()] = {};
      this.scores[date.getFullYear()][date.getMonth()] = {};
      this.scores[date.getFullYear()][date.getMonth()][date.getDate()] = scoreEntry;
      console.debug("Added score. scores = ");
      console.debug(this.scores);
      return true;
    }
    else if (this.scores[date.getFullYear()][date.getMonth()] === undefined) {
      this.scores[date.getFullYear()][date.getMonth()] = {};
      this.scores[date.getFullYear()][date.getMonth()][date.getDate()] = scoreEntry;
      console.debug("Added score. scores = ");
      console.debug(this.scores);
      return true;
    }
    else if (this.scores[date.getFullYear()][date.getMonth()][date.getDate()] === undefined) {
      this.scores[date.getFullYear()][date.getMonth()][date.getDate()] = scoreEntry;
      console.debug("Added score. scores = ");
      console.debug(this.scores);
      return true;
    }
    console.error("ScoresService add_score_entry(): Can't add entry, because entry already exists with date = ", scoreEntry.get_date());
    return false;
  }

  public get_next_empty_day(year: number, month: number): number {
    while (this.has_entry(year, month, this.nextDay)) {
      this.nextDay++;
    }
    this.nextDay++;
    return (this.nextDay - 1);
  }

  public has_entry(year: number, month: number, day: number): boolean {
    return this.scores[year] ?
      this.scores[year][month] ?
        this.scores[year][month][day] ? true : false :
        false :
      false;
  }
  
  public edit_score_entrie(scoreEntry: ScoreEntry): void {
    let date = scoreEntry.get_date();
    this.scores[date.getFullYear()][date.getMonth()][date.getDate()] = scoreEntry;
    this.scores[date.getFullYear()][date.getMonth()][date.getDate()].force_recalculation_of_total();
    console.debug("Edited scoreEntry. scores = ");
    console.debug(this.scores);
  }

  public edit_score_entry_return_success(scoreEntry: ScoreEntry): boolean {
    let date = scoreEntry.get_date();
    if (!this.has_entry(date.getFullYear(), date.getMonth(), date.getDate())) {
      return false;
    } 
    this.edit_score_entrie(scoreEntry);
    return true;
  }

  public add_category_return_key(categoryName: string): number {
    return this.categoryService.add_category_return_key(categoryName);
  }

  public delete_category_return_success(id: number): boolean {
    return this.categoryService.delete_category_return_success(id);
  }

  public get_category_name(id: number): string | undefined {
    return this.categoryService.get_name(id);
  }

  public get_categories(): Map<number, string> {
    return this.categoryService.get_categories();
  }

  public get_scores(): IScores {
    return this.scores;
  }
}
