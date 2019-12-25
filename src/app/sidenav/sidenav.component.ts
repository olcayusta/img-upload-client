import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from '../shared/services/feedback.service';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private feedbackService: FeedbackService) {
  }

  ngOnInit() {
  }

  menuButtonClicked() {
    this.closeSidenav.emit(true);
  }

  openFeedbackDialog() {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      autoFocus: false,
      minWidth: 768
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feedbackService.sendFeedback(result).subscribe(value => {
          this.snackBar.open('Mesaj gonderildi');
        });
      }
    });
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      minWidth: 768
    });
  }
}
