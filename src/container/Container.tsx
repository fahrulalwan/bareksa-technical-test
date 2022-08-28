import { PropsWithChildren } from "react";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";

function Container({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Breadcrumb />

      <main className="flex flex-1 flex-col p-3">{children}</main>
    </div>
  );
}

export default Container;
