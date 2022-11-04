import { Component, inject, OnInit } from '@angular/core';
import { CounterStore } from '../app.component';

@Component({
  selector: 'playground-view-counter',
  templateUrl: './view-counter.component.html',
  styleUrls: ['./view-counter.component.scss'],
})
export class ViewCounterComponent {
  counterStore = inject(CounterStore);
}
