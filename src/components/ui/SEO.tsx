import React from "react";
import { useSEO } from "../../hooks/useSEO";

export function SEO({ path }: { path: string }) {
  useSEO(path);
  return null;
}

export default SEO;
