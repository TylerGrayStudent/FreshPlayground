import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  auto = ['Tyler', 'Evan', 'Gary', 'Desi', 'Chris', 'Carlos'];
  nest = [
    {
      name: 'Devs',
      people: [
        {
          name: 'Tyler',
        },
      ],
    },
    {
      name: 'Devs',
      people: [
        {
          name: 'Tyler',
        },
      ],
    },
    {
      name: 'Devs',
      people: [
        {
          name: 'Tyler',
        },
      ],
    },
  ];
}
