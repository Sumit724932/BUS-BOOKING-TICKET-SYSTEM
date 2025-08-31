import Link from 'next/link';
import { Clock, Star, IndianRupee, ArrowRight, Armchair } from 'lucide-react';
import type { Bus as BusType } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type BusCardProps = {
  bus: BusType;
};

export function BusCard({ bus }: BusCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-4">
          <h3 className="text-xl font-bold">{bus.name}</h3>
          <p className="text-sm text-muted-foreground">{bus.type}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded-md text-sm font-semibold">
              <Star className="w-3 h-3 fill-white" />
              <span>{bus.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-lg">{bus.departureTime}</div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">
                  {bus.duration}
                </span>
                <ArrowRight className="w-8 h-4 text-muted-foreground" />
              </div>
              <div className="font-semibold text-lg">{bus.arrivalTime}</div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{bus.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Armchair className="w-4 h-4" />
              <span>{bus.seatsAvailable} Seats Available</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-primary flex items-center">
              <IndianRupee className="w-5 h-5" />
              {bus.price}
            </p>
          </div>
          <Link href={`/booking/${bus.id}`} className="w-full mt-4 md:mt-0">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Select Seats
            </Button>
          </Link>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="px-4 py-2 hover:no-underline text-sm font-semibold text-primary">
              View Route & Stops
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Boarding Points</h4>
                  <ul className="space-y-1">
                    {bus.boardingPoints.map((point) => (
                      <li
                        key={point.name}
                        className="flex items-center justify-between"
                      >
                        <span>{point.name}</span>
                        <span className="font-mono text-muted-foreground">
                          {point.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Dropping Points</h4>
                  <ul className="space-y-1">
                    {bus.droppingPoints.map((point) => (
                      <li
                        key={point.name}
                        className="flex items-center justify-between"
                      >
                        <span>{point.name}</span>
                        <span className="font-mono text-muted-foreground">
                          {point.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}
