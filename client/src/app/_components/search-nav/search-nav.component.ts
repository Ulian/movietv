import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.css']
})
export class SearchNavComponent {
  input = '';

  constructor(
    private router: Router) { }

  search(query, $event) {
    if ((event['code'] === 'Enter' || event['code'] === 'NumpadEnter') && query.length > 0) {
      this.router.navigate(['/search', query]);
      this.input = '';
    }
  }
}
