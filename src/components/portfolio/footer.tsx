import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card border-t py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-xl">DevVault</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Built with Next.js and SOLID principles. A modular activity log documenting my technical journey and growth during the internship.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/work" className="text-sm hover:text-primary transition-colors">Work Gallery</Link></li>
              <li><Link href="/logs" className="text-sm hover:text-primary transition-colors">Activity Logs</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Contact</h4>
            <div className="text-sm text-muted-foreground">
              <p>Renzcell Rick V. Loresco</p>
              <p>MIH Internship 2024</p>
              <p className="mt-2 text-foreground">renzcellrick@example.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} DevVault Portfolio. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}