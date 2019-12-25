import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FileDropComponent } from './file-drop/file-drop.component';
import { SharedModule } from './shared/shared.module';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { OfflineBannerComponent } from './offline-banner/offline-banner.component';
import { MenuIconComponent } from './icon/menu-icon/menu-icon.component';
import { PhotoLibraryIconComponent } from './icon/photo-library-icon/photo-library-icon.component';
import { HomeIconComponent } from './icon/home-icon/home-icon.component';
import { HelpIconComponent } from './icon/help-icon/help-icon.component';
import { SettingsIconComponent } from './icon/settings-icon/settings-icon.component';
import { FeedbackIconComponent } from './icon/feedback-icon/feedback-icon.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { ExitToAppIconComponent } from './icon/exit-to-app-icon/exit-to-app-icon.component';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { BlockScrollStrategy, Overlay, OverlayModule } from '@angular/cdk/overlay';
import { AvatarPopupComponent } from './avatar-popup/avatar-popup.component';

function scrollFactory(overlay: Overlay): () => BlockScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBarComponent,
    FileDropComponent,
    SidenavContainerComponent,
    SidenavComponent,
    FeedbackDialogComponent,
    OfflineBannerComponent,
    MenuIconComponent,
    PhotoLibraryIconComponent,
    HomeIconComponent,
    HelpIconComponent,
    SettingsIconComponent,
    FeedbackIconComponent,
    SettingsDialogComponent,
    ExitToAppIconComponent,
    AvatarPopupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    OverlayModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 }},
    {provide: MAT_MENU_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
