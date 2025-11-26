"use client";

import { LoginForm } from "@/components/login-form";
import { loginAction } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function Page() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm action={formAction} error={state?.error} />
      </div>
    </div>
  );
}
