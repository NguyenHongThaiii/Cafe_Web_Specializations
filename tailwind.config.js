module.exports = {
  content: ["./index.html", "./src/**/*.{react,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "virtual-gradient-webkit": `-webkit-linear-gradient(339deg,#000,rgba(36,0,255,.3),hsla(0,0%,100%,.2))`,
        "date-gradient-webkit": `-webkit-linear-gradient(339deg,#000,rgba(255,0,184,.3),hsla(0,0%,100%,.2))`,
        "work-gradient-webkit": `-webkit-linear-gradient(339deg,#000,rgba(0,255,209,.3),hsla(0,0%,100%,.2))`,
        "read-gradient-webkit": `-webkit-linear-gradient(339deg,#000,rgba(238,255,100,.3),hsla(0,0%,100%,.2))`,
        "chill-gradient-webkit": `-webkit-linear-gradient(339deg,#000,rgba(36,0,255,.3),hsla(0,0%,100%,.2))`,
        "near-gradient-webkit": `-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.9)))`,

        "virtual-gradient": `linear-gradient(339deg,#000,rgba(36,0,255,.3),hsla(0,0%,100%,.2))`,
        "date-gradient": `linear-gradient(339deg,#000,rgba(255,0,184,.3),hsla(0,0%,100%,.2))`,
        "work-gradient": `linear-gradient(339deg,#000,rgba(0,255,209,.3),hsla(0,0%,100%,.2))`,
        "read-gradient": `linear-gradient(339deg,#000,rgba(238,255,100,.3),hsla(0,0%,100%,.2))`,
        "chill-gradient": `linear-gradient(339deg,#000,rgba(36,0,255,.3),hsla(0,0%,100%,.2))`,
        "near-gradient": `linear-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.9)))`,
      },
      // work
      //  chill
      spacing: {
        35: "35px",
      },
      colors: {
        primary: "#e03",
        text: "rgba(0, 0, 0, 0.85)",
        secondary: "#00b707",
      },
      keyframes: {
        typing: {
          from: {
            width: "0%",
          },
          to: {
            width: "680px",
          },
        },
        blinking: {
          from: {
            borderColor: "#fff",
          },
          to: {
            borderColor: "transparent",
          },
        },
        typingMobile: {
          from: {
            width: "0%",
          },
          to: {
            width: "360px",
          },
        },
        blinkingMobile: {
          from: {
            borderColor: "#fff",
          },
          to: {
            borderColor: "transparent",
          },
        },
        shake: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "40%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(-20deg)",
          },
          "60%": {
            transform: "rotate(20deg)",
          },
          "70%": {
            transform: "rotate(-20deg)",
          },
          "80%": {
            transform: "rotate(20deg)",
          },
          "100%": {
            transform: "rotate(0)",
          },
        },
        move: {
          from: {
            transform: "translateX(-2px)",
          },
          to: {
            transform: "translateX(2px)",
          },
        },
      },
      animation: {
        typing:
          "typing 5s steps(34) alternate infinite ,blinking 0.8s steps(3) infinite",
        typingMobile:
          "typingMobile 5s steps(34) alternate infinite ,blinkingMobile 0.8s steps(3) infinite",
        shake: "shake 2s ease infinite ",
        move: "move 0.5s alternate infinite ",
      },
      screens: {
        xs: "414px",
        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "990px",
        // => @media (min-width: 1024px) { ... }
        xl: "1280px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
