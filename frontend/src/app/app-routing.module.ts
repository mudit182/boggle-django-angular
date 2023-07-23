import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePlayComponent } from './game-play/game-play.component';
import { PanelPlayComponent } from './game-play/panel-play/panel-play.component';
import { PanelOptionsComponent } from './game-play/panel-options/panel-options.component';
import { HelpComponent } from './game-play/help/help.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'boggle', pathMatch: 'full'},
    {path: 'boggle', component: GamePlayComponent, children: [
        {path: 'play', component: PanelPlayComponent},
        {path: 'options', component: PanelOptionsComponent},
        {path: 'help', component: HelpComponent},
        {path: '', redirectTo: 'play', pathMatch: 'full'}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
