import { getPackage, getTemplate } from "@/lib/admin/catalog";
import type { PublicInvitation } from "@/lib/admin/types";
import {
  buildTemplateContext,
  invitationTemplateRegistry,
} from "@/components/invitation/templates";

export function PublicInvitationView({
  invitation,
}: {
  invitation: PublicInvitation;
}) {
  const template = getTemplate(invitation.template_slug);
  const selectedPackage = getPackage(invitation.package_slug);
  const TemplateComponent =
    invitationTemplateRegistry[invitation.template_slug] ??
    invitationTemplateRegistry["classic-rose"];

  return (
    <TemplateComponent
      {...buildTemplateContext(invitation, template, selectedPackage)}
    />
  );
}
