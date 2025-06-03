import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router'; 
import { filter } from 'rxjs/operators';


interface Breadcrumb {
  label: string;
  url: string;
}



@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.router.routerState.snapshot.root);
    });
  }

  buildBreadCrumb(route: any, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    const path = route.routeConfig ? route.routeConfig.path : '';
  
    const nextUrl = `${url}${path}/`;
    const breadcrumb: Breadcrumb = {
      label: label,
      url: nextUrl
    };
  
    const newBreadcrumbs = label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs ];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
  
}
