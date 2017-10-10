export class Pagination {
  page: number;
  state: string;
  total_pages: number;
  no_pages_left: boolean;
  loading: boolean;
  constructor() {
    this.no_pages_left = false;
    this.loading = true;
  }
}
