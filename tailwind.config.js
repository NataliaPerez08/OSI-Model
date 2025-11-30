export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          bg: "#0f0f0f",
          panel: "#1a1a1a",
          border: "#2a2a2a",
          text: "#d0d0d0",
          accent: "#bfbfbf"
        },
        day: {
          bg: "#f5fff5",        // verde pastel MUY claro
          panel: "#e3ffe3",     // verde pastel suave
          border: "#b7e8b7",    // verde tenue
          text: "#063e06",      // verde oscuro
          accent: "#2eb82e"     // verde fuerte para botones
        }
      }
    }
  },
  plugins: [],
};
