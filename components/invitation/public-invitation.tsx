import { getPackage, getTemplate } from "@/lib/admin/catalog";
import type { PublicInvitation } from "@/lib/admin/types";
import {
  buildTemplateContext,
  invitationTemplateRegistry,
} from "@/components/invitation/templates";
import type { InvitationRenderMode } from "@/components/invitation/templates/shared";

export function PublicInvitationView({
  invitation,
  renderMode = "live",
}: {
  invitation: PublicInvitation;
  renderMode?: InvitationRenderMode;
}) {
  const template = getTemplate(invitation.template_slug);
  const selectedPackage = getPackage(invitation.package_slug);
  const TemplateComponent =
    invitationTemplateRegistry[invitation.template_slug] ??
    invitationTemplateRegistry["classic-rose"];

  return (
    <TemplateComponent
      {...buildTemplateContext(
        invitation,
        template,
        selectedPackage,
        renderMode,
      )}
    />
  );
}
