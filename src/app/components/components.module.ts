import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameComponent } from './game/game.component';
import { TestMenuComponent } from './test-menu/test-menu.component';
import { TestComponent } from './test/test.component';
import { ResultComponent } from './result/result.component';
import { TableMenuComponent } from './table-menu/table-menu.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    GameComponent,
    TestMenuComponent,
    TestComponent,
    ResultComponent,
    TableMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
