import { useEffect } from "react";
import { seoData } from "../constants/seoData";

export function useSEO(path: string) {
  useEffect(() => {
    const config = seoData[path] || seoData["/"];
    const origin = window.location.origin;

    // 1. Document Title
    document.title = config.title;

    // 2. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", origin + (config.canonical || ""));

    // 3. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", config.description);

    // 4. Open Graph & Twitter Tags
    const tags = [
      { property: "og:title", content: config.openGraph.title },
      { property: "og:description", content: config.openGraph.description },
      { property: "og:type", content: config.openGraph.type },
      { property: "og:url", content: origin + (config.openGraph.url || "") },
      { property: "og:image", content: origin + config.openGraph.image },
      { name: "twitter:card", content: config.twitter.card }
    ];

    tags.forEach((tag) => {
      const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (tag.property) el.setAttribute("property", tag.property);
        if (tag.name) el.setAttribute("name", tag.name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", tag.content);
    });

    // 5. Structured Data (JSON-LD)
    const scriptId = `seo-structured-${path.replace(/\//g, "-") || "home"}`;
    // Remove existing scripts if any
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (config.structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;

      // Replace origin placeholders in schemas
      const schemas = JSON.parse(
        JSON.stringify(config.structuredData).replace(/ORIGIN_PLACEHOLDER/g, origin)
      );

      script.innerHTML = JSON.stringify(schemas);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, [path]);
}

export default useSEO;
