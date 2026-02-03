// Mermaid init for MkDocs Material + instant navigation
if (window.mermaid) {
  window.mermaid.initialize({ startOnLoad: false });
}

if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    const els = document.querySelectorAll(".mermaid");
    if (els.length && window.mermaid) {
      window.mermaid.init(undefined, els);
    }
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    const els = document.querySelectorAll(".mermaid");
    if (els.length && window.mermaid) {
      window.mermaid.init(undefined, els);
    }
  });
}
