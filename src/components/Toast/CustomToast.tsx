import { RiErrorWarningLine } from "react-icons/ri";

export type CustomToastProps = {
  title: string;
  subtitle: string;
};

type ToastProps = {
  visible: boolean;
  onClose: () => void;
};

export const CustomToast = ({
  title,
  subtitle,
  visible,
  onClose,
}: CustomToastProps & ToastProps) => {
  return (
    <div
      className={`${
        visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <RiErrorWarningLine size={32} className="text-orange-800" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-black">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};
