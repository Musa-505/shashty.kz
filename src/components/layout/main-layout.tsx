import { type ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ShareFab } from "../share-fab";

type Props = {
  children: ReactNode;
};

export function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ShareFab />
    </div>
  );
}
