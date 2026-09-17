import {
  Toast,
  ToastTitle,
  ToastBody,
  useToastController,
} from "@fluentui/react-components";

import { toasterId } from "../appConstant/app";

const useAppToast = () => {
  const { dispatchToast } = useToastController(toasterId);

  const showSuccess = (message: string) => {
    dispatchToast(
      <Toast>
        <ToastTitle>Success</ToastTitle>
        <ToastBody>{message}</ToastBody>
      </Toast>,
      {
        intent: "success",
      }
    );
  };

  const showError = (message: string) => {
    dispatchToast(
      <Toast>
        <ToastTitle>Error</ToastTitle>
        <ToastBody>{message}</ToastBody>
      </Toast>,
      {
        intent: "error",
      }
    );
  };

  return {
    showSuccess,
    showError,
  };
};

export default useAppToast;