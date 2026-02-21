"use client";
import React, { useState, useEffect } from "react";
import { AuthMode, AuthUser } from "../types/reward";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { useAuth } from "../hooks/useAuth";
import { post } from "@/lib/api";
import { loginMember, registerMember } from "../lib/reward-apis";

interface AuthGateProps {
  onAuthenticated: (user: AuthUser) => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const { signIn, signUp, loading, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setError] = useState<string | null>(null);
  const [uuid, setUuid] = useState<string>("");

  useEffect(() => {
    setUuid(localStorage.getItem("uuid") || "");
  }, []);

  const handleSwitch = (mode: AuthMode) => {
    setMode(mode);
    setError(null);
  }

  const handleSignIn = async (payload: Parameters<typeof signIn>[0]) => {
    setIsLoading(true);
    setError("");

    const { data, error } = await loginMember(payload, uuid);
    if (!data) {
      setError(error);
      setIsLoading(false);
      return false;
    }

    if (data.success == false) {
      setError(data.message);
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
      token: data.tokens_login,
      game_level: '1',
      createdAt: new Date().toISOString(),
    });

    return true;
  };

  const handleSignUp = async (payload: Parameters<typeof signUp>[0]) => {
    setIsLoading(true);
    setError("");
    const { data, error } = await registerMember(payload);
    if (error) {
      setError(error);
      setIsLoading(false);
      return false;
    }

    if (data.success == false) {
      setError(data.message);
      setIsLoading(false);
      return false;
    }

    if (data.success) {
      setIsLoading(false);
      setMode("signin");
    }

    return true;
  };

  return (
    <div className="max-w-md mx-auto">
      {mode === "signin" ? (
        <SignIn onSignIn={handleSignIn} onSwitch={handleSwitch} loading={isLoading} error={errorMsg} />
      ) : (
        <SignUp onSignUp={handleSignUp} onSwitch={handleSwitch} loading={isLoading} error={errorMsg} />
      )}
    </div>
  )
};
