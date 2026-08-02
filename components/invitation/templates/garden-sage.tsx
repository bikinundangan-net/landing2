import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import {
  ThemedInvitation,
  themedInvitationConfigs,
} from "@/components/invitation/templates/themed-invitation";

export function GardenSage(props: InvitationTemplateProps) {
  return (
    <ThemedInvitation
      {...props}
      config={themedInvitationConfigs["garden-sage"]}
    />
  );
}
