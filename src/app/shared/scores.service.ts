import { Injectable } from '@angular/core';
import { ScoreEntry } from '../score-entry';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  private scores = new Map<number, ScoreEntry>();
  private nextKey = 0;
  private isAddNewEntryScreen = false;

  public constructor(private categoryService: CategoryService) {
  }

  public add_score_entry(scoreEntry: ScoreEntry) {
    this.scores.set(this.nextKey, scoreEntry);
    this.nextKey++;
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
