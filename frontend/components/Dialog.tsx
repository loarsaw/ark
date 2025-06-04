export const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg text-black font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-black hover:text-black text-xl font-bold"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
