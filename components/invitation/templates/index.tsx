import type { TemplateSlug } from "@/lib/admin/catalog";
import type { InvitationTemplateComponent } from "@/components/invitation/templates/shared";
import { buildTemplateContext } from "@/components/invitation/templates/shared";
import { ClassicRose } from "@/components/invitation/templates/classic-rose";
import { ModernMinimal } from "@/components/invitation/templates/modern-minimal";
import { GardenSage } from "@/components/invitation/templates/garden-sage";
import { LuxuryMaroon } from "@/components/invitation/templates/luxury-maroon";
import { IslamicElegant } from "@/components/invitation/templates/islamic-elegant";
import { RusticCream } from "@/components/invitation/templates/rustic-cream";
import { PastelFloral } from "@/components/invitation/templates/pastel-floral";
import { GoldPremium } from "@/components/invitation/templates/gold-premium";
import { HamsyahYuyunEdition } from "@/components/invitation/templates/hamsyah-yuyun-edition";

export { buildTemplateContext };
export { ClassicRose } from "@/components/invitation/templates/classic-rose";
export { ModernMinimal } from "@/components/invitation/templates/modern-minimal";
export { GardenSage } from "@/components/invitation/templates/garden-sage";
export { LuxuryMaroon } from "@/components/invitation/templates/luxury-maroon";
export { IslamicElegant } from "@/components/invitation/templates/islamic-elegant";
export { RusticCream } from "@/components/invitation/templates/rustic-cream";
export { PastelFloral } from "@/components/invitation/templates/pastel-floral";
export { GoldPremium } from "@/components/invitation/templates/gold-premium";
export { HamsyahYuyunEdition } from "@/components/invitation/templates/hamsyah-yuyun-edition";

export const invitationTemplateRegistry: Record<
  TemplateSlug,
  InvitationTemplateComponent
> = {
  "classic-rose": ClassicRose,
  "modern-minimal": ModernMinimal,
  "garden-sage": GardenSage,
  "luxury-maroon": LuxuryMaroon,
  "islamic-elegant": IslamicElegant,
  "rustic-cream": RusticCream,
  "pastel-floral": PastelFloral,
  "gold-premium": GoldPremium,
  "hamsyah-yuyun-edition": HamsyahYuyunEdition,
};
