import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative min-h-screen bg-bg-950 text-mist-100">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(71,169,124,0.2),rgba(6,14,11,0)_42%),radial-gradient(circle_at_80%_18%,rgba(201,149,69,0.12),rgba(6,14,11,0)_32%),radial-gradient(circle_at_18%_88%,rgba(89,107,255,0.1),rgba(6,14,11,0)_36%)]"
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
