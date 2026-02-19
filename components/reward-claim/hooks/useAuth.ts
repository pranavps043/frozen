"use client";
import { useState, useCallback } from "react";
import { AuthUser, SignInPayload, SignUpPayload } from "../types/reward";

// ---------------------------------------------------------------------------
// This is a local mock auth hook.
// Replace `mockSignIn` / `mockSignUp` with real API calls (e.g. NextAuth,
// Supabase, Firebase, your own backend) when ready.
// ---------------------------------------------------------------------------

interface UseAuthReturn {
  user: AuthUser | null;
  loading: boolean;
  error: string;
  signIn: (payload: SignInPayload) => Promise<boolean>;
  signUp: (payload: SignUpPayload) => Promise<boolean>;
  signOut: () => void;
}

// Simulated user store (in-memory, resets on refresh)
const mockStore: Record<string, { password: string; user: AuthUser }> = {};

async function mockSignIn(payload: SignInPayload): Promise<AuthUser> {
  await new Promise((r) => setTimeout(r, 800)); // simulate network
  const record = mockStore[payload.email.toLowerCase()];
  if (!record || record.password !== payload.password) {
    throw new Error("Invalid email or password.");
  }
  return record.user;
}

async function mockSignUp(payload: SignUpPayload): Promise<AuthUser> {
  await new Promise((r) => setTimeout(r, 800));
  if (mockStore[payload.email.toLowerCase()]) {
    throw new Error("An account with this email already exists.");
  }
  const user: AuthUser = {
    id: crypto.randomUUID(),
    name: payload.name,
    email: payload.email,
    token: "mock-token",
    game_level: "1",
    createdAt: new Date().toISOString(),
  };
  mockStore[payload.email.toLowerCase()] = { password: payload.password, user };
  return user;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = useCallback(async (payload: SignInPayload): Promise<boolean> => {
    setLoading(true);
    setError("");
    try {
      const u = await mockSignIn(payload);
      setUser(u);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (payload: SignUpPayload): Promise<boolean> => {
    setLoading(true);
    setError("");
    try {
      const u = await mockSignUp(payload);
      setUser(u);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign up failed.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setError("");
  }, []);

  return { user, loading, error, signIn, signUp, signOut };
}
