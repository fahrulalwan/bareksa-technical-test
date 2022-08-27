import { PropsWithChildren } from "react";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";

function Container({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Breadcrumb />

      <main className="p-3">{children}</main>
    </>
  );
}

export default Container;
