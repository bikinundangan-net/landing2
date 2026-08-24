import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import { ThemedInvitationHamsyahYuyun } from "@/components/invitation/templates/themed-invitation-hamsyah-yuyun";
import { themedInvitationConfigs } from "@/components/invitation/templates/themed-invitation";

export function HamsyahYuyunEdition(props: InvitationTemplateProps) {
  return (
    <ThemedInvitationHamsyahYuyun
      {...props}
      config={themedInvitationConfigs["hamsyah-yuyun-edition"]}
    />
  );
}
