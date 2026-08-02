import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import {
  ThemedInvitation,
  themedInvitationConfigs,
} from "@/components/invitation/templates/themed-invitation";

export function GoldPremium(props: InvitationTemplateProps) {
  return (
    <ThemedInvitation
      {...props}
      config={themedInvitationConfigs["gold-premium"]}
    />
  );
}
