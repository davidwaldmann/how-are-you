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
  selectedScoreId?: string;

  constructor(private scoresService: ScoresService) { }

  ngOnInit(): void {
  }

  get_scores(): Iterable<ScoreEntry> {
    return this.scoresService.get_scores().values();
  }

  get_score_date(day: number): Date {
    return new Date(2023, 3, day);
  }

  get_today_score_key(): string {
    return this.get_score_key(new Date().getDate());
  }

  get_score_key(day: number): string {
    // console.debug("2023-04-" + (day < 10)? ("0" + day): ("" + day));
    let dayString: string;
    if (day < 10) {
      dayString = "0" + day;
    } else {
      dayString = "" + day;
    }
    return "2023-04-" + dayString;
  }

  edit_score_entry(day: number): void {
    let scoreId = this.get_score_key(day); 
    // if scoreEntry does not exist, do nothing
    if (!this.scoresService.get_scores().has(scoreId)) {
      return;
    }
    this.selectedScoreId = scoreId;

    // ************ TODO *********************
    // this.scoresService.set_add_new_entry_screen(true);
  }

  get_score_entry_mean(day: number): string {
    let scoreId = this.get_score_key(day); 
    let scoreEntry = this.scoresService.get_scores().get(scoreId);
    let scoreEntryMean = (scoreEntry !== undefined)? scoreEntry.get_mean().toString(): "";
    return (scoreEntryMean.length !== 0)? " [" + scoreEntryMean + "]": "";
  }

  score_entry_exists(day: number): boolean {
    let scoreId = this.get_score_key(day); 
    return this.scoresService.get_scores().has(scoreId);
  }

  get_color_class(day: number): string {
    let scoreId = this.get_score_key(day); 
    const scoreEntry = this.scoresService.get_scores().get(scoreId);
    if (scoreEntry) {
      return this.colorClasses[scoreEntry.get_total()];
    }
    // if no scoreEntry defined for this id, return empty string
    return '';
  }

  debug_add_score_entry(total: number) {
    let nextDay = this.scoresService.get_next_day();
    let d = new Date(2023, 3, nextDay);
    const scoreEntry: ScoreEntry = new ScoreEntry(d);
    scoreEntry.debug_set_total(total);
    this.scoresService.add_score_entry_return_key(scoreEntry);
  }

}
