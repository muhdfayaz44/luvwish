import Image from "next/image";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Hero from "./app/landingPage/Hero";
import Category from "./app/landingPage/category/category";
import Solution from "./app/shared/solution/solution";
import Count from "./app/shared/counts/count";
import Test from "./app/shared/review/review";
import Subscribe from "./app/shared/subscribe/subscribe";
export default function Home({children}) {
  return (
    <>
    <Header />
    <Hero />
    <Category />
    <Solution />
    <Count />
    <Test />
    <Subscribe />
    <main>{children}</main>
    <Footer />
    </>
  );
}
