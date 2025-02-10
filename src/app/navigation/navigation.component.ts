import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgClass, NgFor, NgStyle } from '@angular/common';
import { IRouterData } from '../../types/INavigation';
import { NavigationModel } from '../model/navigation.model';

@Component({
  selector: 'app-navigation',
  imports: [NgFor, RouterLink, NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})



export class NavigationComponent {
  router: Array<IRouterData>;
  menuState: boolean;

  constructor() {
    this.router = NavigationModel.routes

    this.menuState = true
  }

  setManuState() : void {
    this.menuState = !this.menuState
  }

  setActiveRoute(component: IRouterData, index: number): void {
    component.isShown = !component.isShown
  }


}
