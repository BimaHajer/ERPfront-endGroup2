import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  NavBars: any[] = [
    {
        "name": "Tableau de board",
        "route": "/dashboard",
        "icon": "dashboard",
        "order": 1,
        "subsNavbar": []
    },
    {
        "name": "Utilisateurs",
        "route": "users",
        "icon": "users",
        "order": 2,
        "subsNavbar": []
    },
    {
      "name": "Fournisseurs",
      "route": "providers",
      "icon": "user",
      "order": 3,
      "subsNavbar": []
    },
    {
      "name": "Catégories",
      "route": "categories",
      "icon": "grid-view",
      "order": 4,
      "subsNavbar": []
    },
    {
      "name": "Tva",
      "route": "tva",
      "icon": "factory",
      "order": 5,
      "subsNavbar": []
    }
]

}
