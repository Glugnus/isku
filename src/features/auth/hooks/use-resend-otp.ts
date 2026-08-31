import {
  resendOtp,
  resetPasswordForEmail,
} from "@/src/features/auth/api/auth-api";
import { useCountdown } from "@/src/hooks/use-countdown";
import { EmailOtpType } from "@supabase/supabase-js";
import { useState } from "react";

export const useResendOtp = ({
  type,
  email,
}: {
  type: EmailOtpType;
  email: string;
}) => {
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const { secondsLeft, isRunning, start } = useCountdown();

  const handleResend = async () => {
    try {
      setIsResending(true);
      if (type === "recovery") {
        await resetPasswordForEmail({ email });
      }
      //TODO Renvoyer le code avec la fonction signup et non resend
      else {
        const resendType = type === "email_change" ? "email_change" : "signup";
        await resendOtp({ type: resendType, email });
      }
      start(60);
      setMessage("Code envoyé avec succès");
    } catch (err) {
      console.log(err);
      setMessage("Erreur lors de l'envoi du code");
    } finally {
      setIsResending(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return {
    isResending,
    handleResend,
    message,
    isRunning,
    secondsLeft,
  };
};
