import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { IRouterData } from '../types/INavigation';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { NavigationComponent } from "./navigation/navigation.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}


