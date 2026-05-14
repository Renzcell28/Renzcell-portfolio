import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900/80 backdrop-blur-sm border-t border-red-500/20 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-xl text-white">DevVault</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Built with Next.js and SOLID principles. A modular activity log documenting my technical journey and growth during the internship.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-red-500">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link href="/work" className="text-sm text-gray-400 hover:text-red-500 transition-colors">Work Gallery</Link></li>
              <li><Link href="/logs" className="text-sm text-gray-400 hover:text-red-500 transition-colors">Activity Logs</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-red-500">Contact</h4>
            <div className="text-sm text-gray-400">
              <p>Renzcell Rick V. Loresco</p>
              <p>MIH Internship 2024</p>
              <p className="mt-2 text-white">renzcell.loresco.3@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} DevVault Portfolio. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-500 transition-colors">GitHub</a>
            <a href="#" className="hover:text-red-500 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-red-500 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}