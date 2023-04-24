import { Injectable } from '@angular/core';
import { ScoreEntry } from '../score-entry';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  private scores = new Map<string, ScoreEntry>();
  private nextDay = 1;

  public constructor(private categoryService: CategoryService) {
  }

  public add_score_entry_return_key(scoreEntry: ScoreEntry): string {
    let key = this.get_date_string_from_date(scoreEntry.get_date());
    this.scores.set(key, scoreEntry);
    console.debug("scores = ");
    console.debug(this.scores);
    return key;
  }

  get_date_string_from_date(date: Date): string {
    console.debug(date);
    let monthString = "" + (date.getMonth() + 1);
    if (date.getMonth() < 9) { monthString = "0" + monthString; }
    let dayString = "" + date.getDate();
    if (date.getDate() < 10) { dayString = "0" + dayString;}
    console.debug("dateString: month, monthStr, day, dayStr = ", date.getMonth(), monthString, date.getDate(), dayString);
    return "" + date.getFullYear() + "-" + monthString + "-" + dayString;
  }

  public get_next_day(): number {
    this.nextDay++;
    return (this.nextDay - 1);
  }

  public edit_score_entry(scoreId: string, scoreEntry: ScoreEntry) {
    this.scores.set(scoreId, scoreEntry);
    this.scores.get(scoreId)?.force_recalculation_of_total();
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

  public get_scores(): Map<string, ScoreEntry> {
    return this.scores;
  }
}
