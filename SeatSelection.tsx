import { cn } from '@/lib/utils';
import type { Seat, SeatLayout } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Armchair, BedDouble, User } from 'lucide-react';

type SeatSelectionProps = {
  layout: SeatLayout;
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
};

const SeatIcon = ({ type }: { type: 'seater' | 'sleeper' }) => {
  if (type === 'sleeper') return <BedDouble className="w-5 h-5" />;
  return <Armchair className="w-5 h-5" />;
};

export function SeatSelection({
  layout,
  selectedSeats,
  onSeatSelect,
}: SeatSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Seats</CardTitle>
        <CardDescription>Click on a seat to select or deselect it.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 border rounded-lg overflow-x-auto bg-muted/20">
          <div className="inline-block">
            {layout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 mb-2">
                {row.map((seat, seatIndex) => {
                  if (!seat) {
                    return <div key={seatIndex} className="w-12 h-12" />; // Aisle
                  }
                  const isSelected = selectedSeats.some((s) => s.id === seat.id);
                  const isBooked = seat.isBooked;

                  return (
                    <Button
                      key={seat.id}
                      variant="outline"
                      disabled={isBooked}
                      onClick={() => onSeatSelect(seat)}
                      className={cn(
                        'w-12 h-12 relative border-2 flex flex-col',
                        isBooked &&
                          'bg-muted text-muted-foreground cursor-not-allowed',
                        seat.isLadies && !isBooked && 'border-pink-400',
                        isSelected &&
                          'bg-accent text-accent-foreground border-accent'
                      )}
                    >
                      <SeatIcon type={seat.type} />
                      <span className="text-xs">{seat.id}</span>
                      {seat.isLadies && (
                        <User className="absolute -top-1 -right-1 h-3 w-3 bg-pink-400 text-white rounded-full p-0.5" />
                      )}
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm border-2 bg-background"></div> Available
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-accent border-2 border-accent"></div>{' '}
            Selected
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-muted border-2"></div> Booked
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm border-2 border-pink-400"></div>{' '}
            Ladies
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
