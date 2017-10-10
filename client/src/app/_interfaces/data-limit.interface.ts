export class DataLimit {
    limit: number;
    hide_button: boolean;
    increment: number;
    constructor (limit = 0, hide_button = false, increment = 5) {
      this.limit = limit;
      this.hide_button = hide_button;
      this.increment = increment;
    }
};
