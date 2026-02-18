"use client";
import React, { useState } from "react";
import { AuthMode, AuthUser } from "../types/reward";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { useAuth } from "../hooks/useAuth";
import { div } from "motion/react-client";
import { post } from "@/lib/api";

interface AuthGateProps {
  onAuthenticated: (user: AuthUser) => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const { signIn, signUp, loading, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setError] = useState<string | null>(null);
  const uuid = localStorage.getItem("uuid");

  const handleSignIn = async (payload: Parameters<typeof signIn>[0]) => {
    // const success = await signIn(payload);

    setIsLoading(true);
    setError("");

    const { data, error } = await post<any, any>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login-member`,
      { email: payload.email, password: payload.password, uuid: uuid ? uuid : "" }
    );
    if (!data) {

      setError(error);
      setIsLoading(false);
      return false;
    }
    if (error) {
      setError(error);
      setIsLoading(false);
      return false;
    }

    onAuthenticated({
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      token: data.token,
      game_level: data.user.game_level,
      createdAt: new Date().toISOString(),
    });

    return true;
  };

  const handleSignUp = async (payload: Parameters<typeof signUp>[0]) => {
    // const success = await signUp(payload);

    const { data, error } = await post<any, any>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/register-member`,
      {
        full_name: payload.name,
        email_or_phone: payload.email,
        password: payload.password,
        password_confirmation: payload.confirmPassword,
      }
    );

    if (error) {
      setError(error);
      setIsLoading(false);
      return false;
    }

    if (data) {
      onAuthenticated({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        token: data.token,
        game_level: data.user.game_level,
        createdAt: new Date().toISOString(),
      });
    }


    return true;
  };

  return (
    <div className="max-w-md mx-auto">
      {mode === "signin" ? (
        <SignIn onSignIn={handleSignIn} onSwitch={setMode} loading={loading} error={error} />
      ) : (
        <SignUp onSignUp={handleSignUp} onSwitch={setMode} loading={loading} error={error} />
      )}
    </div>
  )
};
