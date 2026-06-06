/**
 * Data shape for the confirmation dialog.
 */
export interface ConfirmDialogData {
  /** Dialog title displayed in the header. */
  title: string;

  /** Body message describing the action to confirm. */
  message: string;

  /** Label for the confirm button. Defaults to "OK" in the service. */
  confirmLabel?: string;

  /** Label for the cancel button. Defaults to "Cancel" in the service. */
  cancelLabel?: string;
}
