"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { refresh } from "@/entities/user/model/thunks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = "/login",
  requireAdmin = false,
}: ProtectedRouteProps) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      dispatch(refresh());
    } else if (
      (requireAuth && status === "guest") ||
      (requireAdmin && status === "guest")
    ) {
      router.push(redirectTo);
    } else if (
      (!requireAuth && status === "logged") ||
      (requireAdmin && status === "logged")
    ) {
      router.push("/user-profile");
    } else if (
      (!requireAuth && status === "admin") ||
      (!requireAdmin && status === "admin")
    ) {
      router.push("/admin-profile");
    }
    setIsLoading(false);
  }, [status, requireAuth, redirectTo, router, dispatch, requireAdmin]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (requireAuth && status === "guest") {
    return null;
  }

  if (!requireAuth && status === "logged") {
    return null;
  }

  if (!requireAuth && status === "admin") {
    return null;
  }

  return <>{children}</>;
}
