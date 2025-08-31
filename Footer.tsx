import Link from 'next/link';
import { BusFront } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <BusFront className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground tracking-tight">
              Rouge Voyage
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Careers
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Rouge Voyage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
