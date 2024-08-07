export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="block mb-2 text-xs">&copy; {new Date().getFullYear()} mkhotami; All rights reserved</small>
      <p className="text-xs">
        <span>About this website:</span> built with React & Next.js (App Router & Server Actions), typescript, tailwind,
        framer motion, react email, resend, vercel
      </p>
    </footer>
  );
}
