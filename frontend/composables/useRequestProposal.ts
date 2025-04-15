import eventBus from "@/composables/useEventBus";

export const showRequestAProposal = (identifier: string) => {
  eventBus.emit("showRequestAProposal", identifier);
};
