export function UploadImageMessage({ id, message }: { id: string; message: string | undefined }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true" className="mb-3">
      <p className="text-red-500">{message}</p>
    </div>
  );
}
