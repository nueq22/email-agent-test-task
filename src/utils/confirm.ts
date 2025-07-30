export function confirmAction(
  fn: (...args: unknown[]) => unknown,
  confirmMessage: string = "Are you sure?",
) {
  if (window.confirm(confirmMessage)) {
    fn();
  }
}
