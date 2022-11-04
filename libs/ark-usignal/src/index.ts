import { computed, effect, signal } from 'usignal';
import { Reactivity } from '@playground/ark';

const state = <T>(value: T) => {
  const s = signal<T>(value);
  const getValue = (): T => s.value;
  const setValue = (newValue: T) => {
    s.value = newValue;
  };
  return [getValue, setValue] as const;
};

const derived = <T, Options>(
  cb: () => T,
  value: T | undefined,
  options?: Options
) => {
  const derived = computed(cb, value, options);
  return () => derived.value;
};

export default {
  state,
  effect,
  derived,
} as Reactivity;
