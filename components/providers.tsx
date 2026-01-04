"use client";

import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-right"
        theme="system"
        richColors
        closeButton
        toastOptions={{
          classNameFunction: (toast) => {
            let cn = "group";
            if (toast.type === "error")
              cn +=
                " bg-destructive text-destructive-foreground border-destructive/20";
            if (toast.type === "success")
              cn += " bg-green-500 text-white border-green-500/20";
            if (toast.type === "loading")
              cn += " bg-blue-500 text-white border-blue-500/20";
            return cn;
          },
          style: {
            padding: "12px 16px",
            fontSize: "0.875rem",
            borderRadius: "0",
            border: "1px solid hsl(var(--border))",
            boxShadow:
              "0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
            fontFamily: "inherit",
          },
        }}
      />
    </QueryClientProvider>
  );
}
