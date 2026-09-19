import { ArrowUpRight, ArrowUp, ArrowDown, ArrowLeft, CircleHalf, Plus, Minus } from "@phosphor-icons/react/dist/ssr";

const icons = { outward: ArrowUpRight, up: ArrowUp, down: ArrowDown, back: ArrowLeft, theme: CircleHalf, plus: Plus, minus: Minus };

export function UiIcon({ name }: { name: keyof typeof icons }) {
  const Icon = icons[name];
  return <Icon className="ui-icon" size="1em" weight="regular" aria-hidden="true" focusable="false" />;
}
