export type InvitationFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialInvitationFormState: InvitationFormState = {
  status: "idle",
  message: "",
};
