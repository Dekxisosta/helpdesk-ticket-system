import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            fontFamily: { sans: ['Space Grotesk', ...defaultTheme.fontFamily.sans] },
            colors: {
                nb: { yellow: '#FFE14D', pink: '#FF6B9D', blue: '#4D9DFF', green: '#3DDC84', paper: '#FFF8E7' },
            },
            boxShadow: { nb: '6px 6px 0 0 #000', 'nb-sm': '3px 3px 0 0 #000' },
        },
    },
    plugins: [forms],
};
