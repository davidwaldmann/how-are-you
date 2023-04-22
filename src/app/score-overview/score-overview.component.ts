import { Component, OnInit } from '@angular/core';
import { ScoresService } from '../shared/scores.service';
import { COLOR_CLASSES, ScoreEntry } from '../score-entry';

@Component({
  selector: 'app-score-overview',
  templateUrl: './score-overview.component.html',
  styleUrls: ['./score-overview.component.css']
})
export class ScoreOverviewComponent implements OnInit {
  colorClasses: string[] = COLOR_CLASSES;
  selectedScoreId?: number;

  constructor(private scoresService: ScoresService) { }

  ngOnInit(): void {
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

    // ************ TODO *********************
    // this.scoresService.set_add_new_entry_screen(true);
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

  debug_add_score_entry(total: number) {
    const scoreEntry: ScoreEntry = new ScoreEntry();
    scoreEntry.debug_set_total(total);
    this.scoresService.add_score_entry_return_key(scoreEntry);
  }

}
