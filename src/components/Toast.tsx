export function Toast({
  message,
  show,
  onClose,
}: {
  message: string;
  show: boolean;
  onClose: () => void;
}) {
  return (
    <button
      className={`toast toast-top toast-center ${show ? "" : "hidden"}`}
      onClick={onClose}
    >
      <div className="alert alert-info">
        <span>{message}</span>
      </div>
    </button>
  );
}
