export function Toast({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  return (
    <button
      className={`toast toast-top toast-center ${show ? "" : "hidden"}`}
      onClick={onClose}
    >
      <div className="alert alert-info">
        <span>Saved.</span>
      </div>
    </button>
  );
}
