import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  role: string | null = null;
  NavBars: any[] = [
    {
        "name": "Tableau de board",
        "route": "/dashboard",
        "icon": "dashboard",
        "order": 1,
        "subsNavbar": [],
        "roles": ["SuperAdmin", "Admin"]
    },
    {
        "name": "Utilisateurs",
        "route": "users",
        "icon": "users",
        "order": 2,
        "subsNavbar": [],
        "roles": ["SuperAdmin"]
    },
    {
      "name": "Clients",
      "route": "clients",
      "icon": "users",
      "order": 3,
      "subsNavbar": [],
      "roles": ["SuperAdmin", "Admin"]
    },
    {
      "name": "Fournisseurs",
      "route": "providers",
      "icon": "user",
      "order": 4,
      "subsNavbar": [],
      "roles": ["SuperAdmin"]
    },
    {
      "name": "Catégories",
      "route": "categories",
      "icon": "grid-view",
      "order": 5,
      "subsNavbar": [],
      "roles": ["SuperAdmin", "Admin"]
    },
    {
      "name": "Tva",
      "route": "tva",
      "icon": "factory",
      "order": 6,
      "subsNavbar": [],
      "roles": ["SuperAdmin", "Admin"]
    },
    {
      "name": "Marques",
      "route": "brands",
      "icon": "tags",
      "order": 7,
      "subsNavbar": [],
      "roles": ["SuperAdmin", "Admin"]
    },
    {
      "name": "Modèles",
      "route": "models",
      "icon": "cog",
      "order": 8,
      "subsNavbar": [],
      "roles": ["SuperAdmin", "Admin"]
    },
    {
      "name": "Produits",
      "route": "products",
      "icon": "shopping-cart",
      "order": 9,
      "subsNavbar": [],
      "roles": ["SuperAdmin", "Admin"]
    }
  ];
  filteredNavBars: any[] = [];

  constructor(private sharedService: SharedService) {}
  ngOnInit(): void {
    this.role = this.sharedService.getCookie('role');
    this.filterNavItems();
  }

  filterNavItems() {
    if (this.role) {
      this.NavBars = this.NavBars.filter(item => item.roles.includes(this.role));
    } else {
      this.NavBars = [];
    }
  }
}
