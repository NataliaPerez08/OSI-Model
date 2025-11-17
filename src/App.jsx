import Layout from "./components/Layout";
import OsiAnimation from "./components/OsiAnimation";

export default function App() {
  return (
    <Layout>
      <section className="mb-8 text-slate-300">
        <p>
          Modelo OSI interactivo y minimalista para usar como demo en GitHub Pages.
        </p>
      </section>
      <OsiAnimation />
    </Layout>
  );
}
