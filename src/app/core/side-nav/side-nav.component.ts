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
      "name": "Clients",
      "route": "clients",
      "icon": "users",
      "order": 3,
      "subsNavbar": []
    },
    {
      "name": "Fournisseurs",
      "route": "providers",
      "icon": "user",
      "order": 4,
      "subsNavbar": []
    },
    {
      "name": "Catégories",
      "route": "categories",
      "icon": "grid-view",
      "order": 5,
      "subsNavbar": []
    },
    {
      "name": "Tva",
      "route": "tva",
      "icon": "factory",
      "order": 6,
      "subsNavbar": []
    },
    {
      "name": "Marques",
      "route": "brands",
      "icon": "tags",
      "order": 7,
      "subsNavbar": []
    },
    {
      "name": "Modèles",
      "route": "models",
      "icon": "cog",
      "order": 8,
      "subsNavbar": []
    },
    {
      "name": "Produits",
      "route": "products",
      "icon": "shopping-cart",
      "order": 9,
      "subsNavbar": []
    }
  ];
}
