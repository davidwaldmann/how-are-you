import { Injectable } from '@angular/core';
import { ScoreEntry } from '../score-entry';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  private categories = new Categories();
  private scores = new Map<number, ScoreEntry>();
  private nextKey = 0;
  private isAddNewEntryScreen = false;

  public add_score_entry(scoreEntry: ScoreEntry) {
    this.scores.set(this.nextKey, scoreEntry);
    this.nextKey++;
  }

  public add_category_return_key(categoryName: string): number {
    return this.categories.add_category_return_key(categoryName);
  }

  public delete_category_return_success(id: number): boolean {
    return this.categories.delete_category_return_success(id);
  }

  public get_category_name(id: number): string | undefined {
    return this.categories.get_name(id);
  } 

  public get_categories(): Map<number, string> {
    return this.categories.get_categories();
  }

  public get_scores(): Map<number, ScoreEntry> {
    return this.scores;
  }

  public set_add_new_entry_screen(isTrue: boolean) {
    this.isAddNewEntryScreen = isTrue;
  }

  public is_add_new_entry_screen(): boolean {
    return this.isAddNewEntryScreen;
  }
}

class Categories {
  private categories = new Map<number, string>([
    [0, "Bewegung"], [1, "Schlaf"], [2, "Ernährung"], [3, "Ordnung"], [4, "Screentime"]
  ]);
  private nextKey: number = 5;

  public add_category_return_key(name: string): number {
      this.categories.set(this.nextKey, name);
      this.nextKey++;
      return this.nextKey - 1;
  }

  public delete_category_return_success(id: number): boolean {
    return this.categories.delete(id);
  }

  public get_name(id: number): string | undefined {
      return this.categories.get(id);
  }

  public get_categories(): Map<number, string> {
    return this.categories;
  }
}
