import Link from 'next/link';
import { IndianRupee } from 'lucide-react';
import type { Bus, Seat } from '@/lib/data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type BookingSummaryProps = {
  bus: Bus;
  selectedSeats: Seat[];
};

export function BookingSummary({ bus, selectedSeats }: BookingSummaryProps) {
  const baseFare = selectedSeats.length * bus.price;
  const tax = baseFare * 0.05; // 5% tax
  const totalFare = baseFare + tax;

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold">Boarding & Dropping</h4>
          <div className="space-y-3 mt-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Boarding Point" />
              </SelectTrigger>
              <SelectContent>
                {bus.boardingPoints.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    {p.name} - {p.time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Dropping Point" />
              </SelectTrigger>
              <SelectContent>
                {bus.droppingPoints.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    {p.name} - {p.time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator />
        <div>
          <h4 className="font-semibold">Selected Seats</h4>
          <p className="text-sm text-muted-foreground">
            {selectedSeats.length > 0
              ? selectedSeats.map((s) => s.id).join(', ')
              : 'No seats selected'}
          </p>
        </div>
        <Separator />
        <div>
          <h4 className="font-semibold">Fare Details</h4>
          <div className="space-y-1 text-sm mt-2">
            <div className="flex justify-between">
              <span>Base Fare</span>
              <span className='flex items-center'><IndianRupee className="w-3.5 h-3.5" />{baseFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span className='flex items-center'><IndianRupee className="w-3.5 h-3.5" />{tax.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span className='flex items-center'><IndianRupee className="w-4 h-4" />{totalFare.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/confirmation" className="w-full">
          <Button
            className="w-full text-lg"
            size="lg"
            disabled={selectedSeats.length === 0}
          >
            Proceed to Pay
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
