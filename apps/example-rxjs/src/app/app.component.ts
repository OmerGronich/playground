import {Component, inject, Injectable} from '@angular/core';
import {Store} from "@playground/ark";
import {$, autorun} from "@playground/rxjs-autorun";
import {tap, timer} from "rxjs";

const initialState = { count: 0, multiplier: 2 };

@Injectable()
export class CounterStore extends Store<typeof initialState> {
  multipliedCount = this.derive(
    () => this.state().count * this.state().multiplier
  );

  // intervalId: ReturnType<typeof setInterval>;

  constructor() {
    super(initialState);

    // this.intervalId = setInterval(() => {
    //   this.setState({
    //     ...this.state(),
    //     multiplier: this.state().multiplier + 1,
    //   });
    // }, 1000);
  }

  increment() {
    this.setState({ ...this.state(), count: this.state().count + 1 });
  }

  decrement() {
    this.setState({ ...this.state(), count: this.state().count - 1 });
  }

  override dispose() {
    super.dispose();
    // clearInterval(this.intervalId);
  }
}



@Component({
  selector: 'playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CounterStore]
})
export class AppComponent {
  counterStore = inject(CounterStore)
}
