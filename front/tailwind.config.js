/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "../src/**/*.{html,ts}",
    ],
    theme: {
        colors: {
            "transparent": "transparent",
            "current": "currentColor",
            "inherit": "inherit",
            "pink": "#EE88FF",
            "purple": "#8044FF",
            "dark-purple": "#6b3af2",
            "yellow": "#FFCD3C",
            "orange": "#FF631E",
            "red": "#F44",
            "blue": "#3CFFD0",
            "white": "#FFFFFF",
            "light": "#DFDFDF",
            "light-gray": "#A3A5A2",
            "gray": "#6A6A6A",
            "gray-zambezi": "#605A5A",
            "dark-gray": "#424242",
            "lighter-dark": "#2F2F2F",
            "light-dark": "#1F1F1F",
            "dark": "#121212",
            "black": "#030505"
        },
        fontSize: {
            10: '10px',
            12: '12px',
            13: '13px',
            14: '14px',
            16: '16px',
            20: '20px',
            22: '22px',
            25: '25px',
            28: '28px',
            36: '36px',
        },
        extend: {
            backgroundSize: {
                'cover-y': 'auto 100vh'
            },
            screens: {
                'xs': '520px',
            },
            listStyleType: {
                'square': 'square',
            }
        }
    },
    plugins: [
        plugin(function ({addVariant}) {
            // Combinaison of hover and focus
            addVariant('hocus', ['&:hover', '&:focus']);

            // Selectors for scrollbars
            addVariant('scrollbar', '&::-webkit-scrollbar');
            addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb');
            addVariant('scrollbar-track', '&::-webkit-scrollbar-track');
            addVariant('scrollbar-track-piece', '&::-webkit-scrollbar-track-piece');
            addVariant('scrollbar-corner', '&::-webkit-scrollbar-corner');
            addVariant('scrollbar-button', '&::-webkit-scrollbar-button');
            addVariant('resizer', '&::-webkit-resizer');
        })
    ],
}
