"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useSession } from "next-auth/react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // NextAuth session
  const { data: session, status } = useSession();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const nextAuthUser = session?.user;

      // 🔥 TRUE if either Firebase user OR NextAuth user exists
      const isAuthenticated = firebaseUser || nextAuthUser;

      if (!isAuthenticated) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, session]);

  if (loading || status === "loading") {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return <>{children}</>;
}
