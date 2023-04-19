import { Component } from '@angular/core';
import { COLOR_CLASSES, ScoreEntry } from './score-entry';
import { ScoresService } from './shared/scores.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'how-are-you';
  colorClasses: string[] = COLOR_CLASSES;

  public constructor(private scoresService: ScoresService) {
  }

  get_scores(): Iterable<ScoreEntry> {
    return this.scoresService.get_scores().values();
  }

  is_add_new_entry_screen(): boolean {
    return this.scoresService.is_add_new_entry_screen();
  }

  add_score(): void {
    this.scoresService.set_add_new_entry_screen(true);
  }
}
