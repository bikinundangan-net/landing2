import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import { IbnuDinataInvitation } from "@/components/invitation/templates/ibnu-dinata";
import {
  ThemedInvitation,
  themedInvitationConfigs,
} from "@/components/invitation/templates/themed-invitation";

export function GardenSage(props: InvitationTemplateProps) {
  if (props.invitation.public_slug === "ibnu-dinata") {
    return <IbnuDinataInvitation {...props} />;
  }
  return (
    <ThemedInvitation
      {...props}
      config={themedInvitationConfigs["garden-sage"]}
    />
  );
}
