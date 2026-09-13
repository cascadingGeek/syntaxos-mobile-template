/**
 * GENERATED PRIMITIVE — baked once at template build. DO NOT HAND-EDIT
 * (structure contract, invariant 8).
 *
 * Lucide takes its colour as a PROP, and NativeWind resolves classes to
 * STYLES — so `className="text-primary"` on a bare lucide icon does nothing
 * and the only way to colour one used to be a literal. A literal is a second
 * palette that the approved design tokens can never restyle. This interop
 * moves the resolved `color` style onto the prop, so icons follow global.css
 * like everything else:
 *
 *   <Icon as={Flame} size={20} className="text-primary" />
 */
import type { LucideIcon, LucideProps } from "lucide-react-native";
import { cssInterop } from "nativewind";

export type IconProps = LucideProps & { as: LucideIcon };

function IconGlyph({ as: Glyph, ...props }: IconProps) {
  return <Glyph {...props} />;
}

export const Icon = cssInterop(IconGlyph, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
