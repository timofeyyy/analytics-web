import { NgFor, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent } from "../navigation/navigation.component";
import { ILinks } from '../../types/ITemplate';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { NavigationModel } from '../model/navigation.model';

@Component({
  selector: 'app-template',
  imports: [NgFor, HttpClientModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})




export class TemplateComponent implements OnInit {

  url!: string;
  appRoutes!: Array<ILinks>

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.appRoutes = []

      let path: string = `${params.get('table')}/${params.get('column')}`
      this.url = `${NavigationModel.baseUrl}/${path}`

      let routes: Array<string> = ['/main/bar', '/main/line', '/main/area', '/main/stacked']

      routes.forEach(link => {
        this.appRoutes.push({
          url: `${link}/${path}`,
          safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(`${link}/example/example`)
        })
      });
    })

  }

  navigate(route: string): void {
    this.router.navigate([route])   
  }

}
