import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { GameComponent } from './components/game/game.component';
import { TestMenuComponent } from './components/test-menu/test-menu.component';
import { ResultComponent } from './components/result/result.component';
import { TableMenuComponent } from './components/table-menu/table-menu.component';
import { TestComponent } from './components/test/test.component';
import { GameMenuComponent } from './components/game-menu/game-menu.component';

const routes: Routes = [
  { path : '', component: MainMenuComponent},
  { path : 'table', component: TableMenuComponent},
  { path : 'test', component: TestMenuComponent},
  { path : 'game', component: GameMenuComponent},
  { path : 'game-detail', component: GameComponent},
  { path : 'result', component: ResultComponent},
  { path : 'test-detail', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
