import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from '../button';
import { Link } from 'react-router-dom';
function Hero() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'flex flex-col gap-5 mt-12 mx-52', children: [_jsxs("h2", { className: 'text-center', children: [_jsx("span", { className: 'my-2 text-4xl font-extrabold text-rose-500', children: "Explore Your Dream with Forayaje AI Trip Planner!" }), _jsx("span", { className: 'text-3xl font-bold', children: "Get personalized travel plans, and enjoy hassle-free trips\u2014powered by smart AI." })] }), _jsx("span", { className: 'text-xl text-center text-gray-500', children: "Start your adventure today and make every journey unforgettable with Forayaje AI Trip Planner." })] }), _jsx("div", { className: 'flex items-center justify-center mt-7', children: _jsx(Link, { to: '/create-trip', children: _jsx(Button, { className: 'px-4 py-2', children: "Get Started, It's Free" }) }) }), _jsx("div", { className: 'flex items-center justify-center mt-12 mb-14', children: _jsx("div", { className: 'relative  w-[600px] h-[400px]', children: _jsx("img", { src: '/mockup-image.png', alt: 'AI Trip Planner on Laptop Screen', className: 'w-full h-full mb-5 rounded-lg shadow-lg cursor-not-allowed' }) }) })] }));
}
export default Hero;
