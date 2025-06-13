// Simple Modal component for pixel/retro UI
export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-[#ffffdd] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#5eead4] p-6 min-w-[320px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-400 border-2 border-black rounded px-2 py-1 pixel-font text-xs hover:bg-red-500 transition"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
