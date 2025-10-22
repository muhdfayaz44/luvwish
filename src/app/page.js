import Image from "next/image";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

export default function Home({children}) {
  return (
    <>
    <Header />
    <main>{children}</main>
    <Footer />
    </>
  );
}
