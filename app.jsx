/* ============================================
   App entry — Router state + mount
   ============================================ */

function App() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return hash && NAV_ITEMS.some(n => n.id === hash) ? hash : "home";
  });

  useEffect(() => {
    window.location.hash = route === "home" ? "" : route;
  }, [route]);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash !== route) setRoute(hash || "home");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [route]);

  const pages = {
    home: HomePage,
    about: AboutPage,
    services: ServicesPage,
    "new-case": NewCasePage,
    consultation: ConsultationPage,
    contact: ContactPage,
    faq: FAQPage,
    privacy: PrivacyPage,
    terms: TermsPage,
  };
  const CurrentPage = pages[route] || HomePage;

  return (
    <>
      <Header route={route} setRoute={setRoute} />
      <main key={route} data-screen-label={route}>
        <CurrentPage setRoute={setRoute} />
      </main>
      <Footer setRoute={setRoute} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
