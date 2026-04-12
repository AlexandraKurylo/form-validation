/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="react-scripts" />

declare module "*.svg?react" {
  import React from "react";
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
