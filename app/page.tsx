import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Accroche } from "@/components/sections/Accroche";
import { Problem } from "@/components/sections/Problem";
import { Collection } from "@/components/sections/Collection";
import { Footer } from "@/components/chrome/Footer";

const Digester = dynamic(() =>
  import("@/components/sections/Digester").then((m) => m.Digester),
);
const Biogas = dynamic(() =>
  import("@/components/sections/Biogas").then((m) => m.Biogas),
);
const Electricity = dynamic(() =>
  import("@/components/sections/Electricity").then((m) => m.Electricity),
);
const Digestate = dynamic(() =>
  import("@/components/sections/Digestate").then((m) => m.Digestate),
);
const CircularLoop = dynamic(() =>
  import("@/components/sections/CircularLoop").then((m) => m.CircularLoop),
);
const Impact = dynamic(() =>
  import("@/components/sections/Impact").then((m) => m.Impact),
);
const Project = dynamic(() =>
  import("@/components/sections/Project").then((m) => m.Project),
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => m.Contact),
);

export default function Home() {
  return (
    <main>
      <Hero />
      <Accroche />
      <Problem />
      <Collection />
      <Digester />
      <Biogas />
      <Electricity />
      <Digestate />
      <CircularLoop />
      <Impact />
      <Project />
      <Contact />
      <Footer />
    </main>
  );
}
