import { useState, useCallback } from "react";
import { useTheme } from "./hooks";
import GlobalStyles from "./styles/GlobalStyles";

// Layout
import Nav from "./components/Nav";
import { Divider } from "./components/primitives";
import { Modal, GalleryModal, ContactModal } from "./components/Modals";

// Sections
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Awards from "./components/Awards";
import Certificates from "./components/Certificates";
import Events from "./components/Events";
import { Contact, FloatingContact } from "./components/Contact";

export default function App() {
  const { dark, toggle, t } = useTheme();

  // Modal state
  const [modal, setModal] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  const open = useCallback((data) => setModal(data), []);
  const close = useCallback(() => setModal(null), []);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      fontFamily: "'DM Sans', sans-serif",
      lineHeight: 1.6,
    }}>
      <GlobalStyles dark={dark} />

      {/* Navigation */}
      <Nav dark={dark} toggle={toggle} t={t} openContact={openContact} />

      {/* Main content */}
      <main id="main-content">
        <Hero open={open} t={t} dark={dark} openContact={openContact} />
        <Divider t={t} />
        <About t={t} />
        <Divider t={t} />
        <Skills open={open} t={t} dark={dark} />
        <Divider t={t} />
        <Projects open={open} t={t} setGallery={setGallery} />
        <Divider t={t} />
        <Experience open={open} t={t} dark={dark} />
        <Divider t={t} />
        <Education open={open} t={t} />
        <Divider t={t} />
        <Awards open={open} t={t} />
        <Divider t={t} />
        <Certificates open={open} t={t} />
        <Divider t={t} />
        <Events open={open} t={t} setGallery={setGallery} />
        <Contact t={t} openContact={openContact} />
      </main>

      {/* Floating CTA */}
      <FloatingContact openContact={openContact} t={t} />

      {/* Overlays */}
      {modal && (
        <Modal
          data={modal}
          onClose={close}
          t={t}
          openGallery={
            modal.images && modal.images.length > 0
              ? () => setGallery({ images: modal.images, title: modal.modal?.title || modal.title })
              : null
          }
        />
      )}
      {contactOpen && <ContactModal onClose={closeContact} t={t} />}
      {gallery && <GalleryModal images={gallery.images} title={gallery.title} onClose={() => setGallery(null)} t={t} />}
    </div>
  );
}
