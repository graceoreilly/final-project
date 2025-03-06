"use client";

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";
import BasicMasonry from "./Memory";

export default function About() {
  return (
    <div>
      <Header></Header>
      <Navigation></Navigation>
      <BasicMasonry />
      <Footer></Footer>
    </div>
  );
}
