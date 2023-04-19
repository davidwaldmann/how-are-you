import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ScoreEntry } from '../score-entry';
import { ScoresService } from '../shared/scores.service';

@Component({
  selector: 'app-add-new-score',
  templateUrl: './add-new-score.component.html',
  styleUrls: ['./add-new-score.component.css']
})
export class AddNewScoreComponent implements OnInit {
  scoreEntry: ScoreEntry = new ScoreEntry();
  isEditing: boolean = false;
  newCategory?: string;

  constructor(private scoresService: ScoresService) { }

  ngOnInit(): void {
  }

  post_new_score_entry(): void {
    if (!Number.isNaN(this.scoreEntry.get_total())) {
      this.scoresService.add_score_entry(this.scoreEntry);
    }
    this.scoresService.set_add_new_entry_screen(false);
  }

  on_tap(categoryId: number, score: number): void {
    // console.debug("on_tap()");
    // console.debug("id, score: ", categoryId, score);

    // if already pressed, delete the score
    if (this.scoreEntry.get_score(categoryId) == score) {
      this.scoreEntry.delete_score(categoryId);
    } else {
      this.scoreEntry.add_score(categoryId, score);
    }
  }

  get_category_score(categoryId: number): number | undefined {
    return this.scoreEntry.get_score(categoryId);
  }

  get_categories(): Map<number, string> {
    return this.scoresService.get_categories();
  }

  edit_categories(): void {
    this.isEditing = !this.isEditing;
    // In Edit-Mode destroy all tapped scores from this entry
    this.scoreEntry = new ScoreEntry();
  }

  delete_category(id: number): boolean {
    return this.scoresService.delete_category_return_success(id);
  }

  submit_new_category(event: any): void {
    let newCat: string = event.target.value;
    newCat = newCat?.trim();
    if (newCat.length > 0) {
      this.scoresService.add_category_return_key(newCat);
    }
    event.target.value = "";
  }
  
}
