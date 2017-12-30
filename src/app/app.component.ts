import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  public navigationSideMenu: Array<{
    label: string;
    link: string;
  }> = [{
    label: 'Keywords',
    link: 'keywords'
  }, {
    label: 'About',
    link: 'about'
  }];
}
