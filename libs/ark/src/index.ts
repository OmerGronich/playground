import { ChangeDetectorRef, inject, ViewRef } from '@angular/core';

export interface Reactivity {
  state<T>(value: T): readonly [() => T, (newValue: T) => void];
  derived: <T, Options>(
    fn: (v?: T) => T,
    value?: T | undefined,
    options?: Options
  ) => () => T;
  effect: <T, Options>(
    fn: (v?: T) => T,
    value?: T | undefined,
    options?: Options
  ) => () => void;
}


const reactivity: { system: Reactivity | null } = {
  system: null,
};

export const configureArk = (params: { reactivity: Reactivity }) => {
  reactivity.system = params.reactivity;
};

export class Store<T> {
  state!: () => T;
  setState!: (newValue: T) => void;
  derive!: Reactivity['derived'];
  effect!: Reactivity['effect'];

  #disposables: Set<() => void> = new Set();

  constructor(initialState: T) {
    if (!reactivity.system) return; // TODO create default reactivity

    const viewRef = inject(ChangeDetectorRef) as ViewRef;

    const { state, derived, effect } = reactivity.system;
    const [stateGetter, stateSetter] = state(initialState);

    this.state = stateGetter;
    this.setState = stateSetter;
    this.derive = derived;
    this.effect = effect;

    this.#disposables.add(
      this.effect(() => {
        this.state();
        viewRef.markForCheck();
      })
    );

    setTimeout(() => {
      viewRef.onDestroy(() => {
        this.dispose();
      });
    });
  }

  dispose() {
    this.#disposables.forEach((disposable) => {
      disposable();
    });
  }
}
