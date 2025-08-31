import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BusSearchForm } from '@/components/BusSearchForm';
import { BusCard } from '@/components/BusCard';
import { buses } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header transparent />
      <main className="flex-grow">
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
          <Image
            src="https://picsum.photos/1920/1080"
            alt="Winding road through mountains"
            data-ai-hint="winding road"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/50 to-black/60" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline">
              Your Journey, Our Passion
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Seamless Travel, Unforgettable Destinations.
            </p>
          </div>
        </section>
        <div className="relative z-10 container mx-auto px-4 -mt-20">
          <BusSearchForm />
        </div>
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
              Available Journeys
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {buses.map((bus) => (
                <BusCard key={bus.id} bus={bus} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
