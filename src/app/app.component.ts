import { Component } from '@angular/core';
import { COLOR_CLASSES, ScoreEntry } from './score-entry';
import { ScoresService } from './shared/scores.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'how-are-you';
  colorClasses: string[] = COLOR_CLASSES;
  selectedScoreId?: number;

  public constructor(private scoresService: ScoresService) {
  }

  get_scores(): Iterable<ScoreEntry> {
    return this.scoresService.get_scores().values();
  }

  edit_score_entry(scoreId: number): void {
    // if scoreEntry does not exist, do nothing
    if (!this.scoresService.get_scores().has(scoreId)) {
      return;
    }
    this.selectedScoreId = scoreId;
    this.scoresService.set_add_new_entry_screen(true);
  }

  get_score_entry_mean(scoreId: number): number | undefined {
    return this.scoresService.get_scores().get(scoreId)?.get_mean();
  }

  score_entry_exists(scoreId: number): boolean {
    return this.scoresService.get_scores().has(scoreId);
  }

  get_color_class(scoreId: number): string {
    const scoreEntry = this.scoresService.get_scores().get(scoreId);
    if (scoreEntry) {
      return this.colorClasses[scoreEntry.get_total()];
    }
    // if no scoreEntry defined for this id, return css class for default color
    return this.colorClasses[-1];
  }

  is_add_new_entry_screen(): boolean {
    return this.scoresService.is_add_new_entry_screen();
  }

  add_score(): void {
    this.selectedScoreId = undefined;
    this.scoresService.set_add_new_entry_screen(true);
  }

  debug_add_score_entry(total: number) {
    const scoreEntry: ScoreEntry = new ScoreEntry();
    scoreEntry.debug_set_total(total);
    this.scoresService.add_score_entry(scoreEntry);
  }
}
