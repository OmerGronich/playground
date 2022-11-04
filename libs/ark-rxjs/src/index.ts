import { $, autorun, computed } from '@playground/rxjs-autorun';

import { BehaviorSubject } from 'rxjs';
import { Reactivity } from '@playground/ark';

const state: Reactivity['state'] = <T>(value: T) => {
  const subj = new BehaviorSubject(value);
  const getValue = () => $(subj.asObservable());
  const setValue = (newValue: T) => subj.next(newValue);
  return [getValue, setValue];
};
const effect: Reactivity['effect'] = (cb) => {
  const sub = autorun(cb);
  return () => sub.unsubscribe();
};
const derived: Reactivity['derived'] = <T>(cb: () => T) => {
  return () => $(computed(cb));
};

export default {
  state,
  effect,
  derived,
} as Reactivity;
