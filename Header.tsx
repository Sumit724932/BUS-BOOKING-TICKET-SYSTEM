import Link from 'next/link';
import { BusFront, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AuthDialog } from '@/components/AuthDialog';

type HeaderProps = {
  transparent?: boolean;
};

export function Header({ transparent = false }: HeaderProps) {
  const headerClasses = cn(
    'top-0 left-0 right-0 z-20 transition-colors duration-300',
    transparent ? 'absolute bg-transparent' : 'sticky bg-card border-b shadow-sm'
  );

  const textClasses = transparent ? 'text-white' : 'text-foreground';
  const buttonHoverClasses = transparent
    ? 'hover:bg-white/10 hover:text-white'
    : 'hover:bg-accent';
  const busIconColor = transparent ? 'text-white' : 'text-primary';

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className={cn('flex items-center gap-2', textClasses)}>
            <BusFront className={cn('h-8 w-8', busIconColor)} />
            <span className="text-2xl font-bold tracking-tight">
              Rouge Voyage
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/manage-booking">
              <Button
                variant="ghost"
                className={cn(textClasses, buttonHoverClasses)}
              >
                Manage Booking
              </Button>
            </Link>
            <Link href="/contact">
            <Button
              variant="ghost"
              className={cn(textClasses, buttonHoverClasses)}
            >
              Contact Us
            </Button>
            </Link>
            <AuthDialog
              trigger={
                <Button
                  className={
                    transparent
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : ''
                  }
                >
                  Sign In
                </Button>
              }
            />
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={textClasses}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                 <div className="flex flex-col gap-4 p-4">
                 <Link href="/" className={cn('flex items-center gap-2 text-foreground')}>
                    <BusFront className={cn('h-8 w-8', "text-primary")} />
                    <span className="text-2xl font-bold tracking-tight">
                      Rouge Voyage
                    </span>
                  </Link>
                  <Link href="/manage-booking">
                    <Button variant="ghost">Manage Booking</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="ghost">Contact Us</Button>
                  </Link>
                  <AuthDialog trigger={<Button>Sign In</Button>} />
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
