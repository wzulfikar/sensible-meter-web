import toast from "react-hot-toast";
import { CustomToast } from "./CustomToast";
import type { CustomToastProps } from "./CustomToast";

export const customToast = (props: CustomToastProps) =>
  toast.custom(
    (t) => (
      <CustomToast {...t} {...props} onClose={() => toast.dismiss(t.id)} />
    ),
    { duration: 5000 }
  );
