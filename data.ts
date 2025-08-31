export type Seat = {
  id: string;
  isBooked: boolean;
  isLadies: boolean;
  type: 'seater' | 'sleeper';
};

export type SeatLayout = (Seat | null)[][];

export type Bus = {
  id: string;
  name: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  rating: number;
  seatsAvailable: number;
  from: string;
  to: string;
  stops: string[];
  boardingPoints: { name: string; time: string }[];
  droppingPoints: { name: string; time: string }[];
  seatLayout: SeatLayout;
};

const generateSeats = (rows: number, cols: number): SeatLayout => {
  const layout: SeatLayout = [];
  for (let i = 0; i < rows; i++) {
    const row: (Seat | null)[] = [];
    for (let j = 0; j < cols; j++) {
      // Create gaps for aisle
      if ((cols === 5 && j === 2) || (cols === 4 && j === 2)) {
        row.push(null);
        continue;
      }
      row.push({
        id: `${i + 1}${String.fromCharCode(65 + j - (cols === 5 && j > 2 ? 1: 0))}`,
        isBooked: Math.random() > 0.6, // 40% chance of being booked
        isLadies: Math.random() > 0.9, // 10% chance of being a ladies seat
        type: i < rows - 2 ? 'sleeper' : 'seater',
      });
    }
    layout.push(row);
  }
  return layout;
};


export const buses: Bus[] = [
  {
    id: '1',
    name: 'Red Arrow Express',
    type: 'A/C Sleeper (2+1)',
    departureTime: '21:00',
    arrivalTime: '06:00',
    duration: '9h 0m',
    price: 1200,
    rating: 4.5,
    seatsAvailable: 15,
    from: 'Mumbai',
    to: 'Pune',
    stops: ['Lonavala', 'Khandala'],
    boardingPoints: [{ name: 'Dadar', time: '21:00' }, { name: 'Thane', time: '22:00' }],
    droppingPoints: [{ name: 'Wakad', time: '05:30' }, { name: 'Hinjewadi', time: '06:00' }],
    seatLayout: generateSeats(10, 4), // 2+1 sleeper/seater config
  },
  {
    id: '2',
    name: 'Voyager King',
    type: 'Volvo Multi-Axle A/C Semisleeper (2+2)',
    departureTime: '22:30',
    arrivalTime: '07:15',
    duration: '8h 45m',
    price: 950,
    rating: 4.8,
    seatsAvailable: 25,
    from: 'Mumbai',
    to: 'Pune',
    stops: ['Panvel', 'Lonavala'],
    boardingPoints: [{ name: 'Borivali', time: '22:30' }, { name: 'Sion', time: '23:30' }],
    droppingPoints: [{ name: 'Katraj', time: '06:45' }, { name: 'Swargate', time: '07:15' }],
    seatLayout: generateSeats(12, 5), // 2+2 seater config
  },
   {
    id: '3',
    name: 'Capital Cruiser',
    type: 'A/C Seater (2+2)',
    departureTime: '08:00',
    arrivalTime: '15:30',
    duration: '7h 30m',
    price: 700,
    rating: 4.2,
    seatsAvailable: 30,
    from: 'Delhi',
    to: 'Jaipur',
    stops: ['Gurugram', 'Behror'],
    boardingPoints: [{ name: 'ISBT Kashmiri Gate', time: '08:00' }, { name: 'Dhaula Kuan', time: '08:45' }],
    droppingPoints: [{ name: 'Sindhi Camp', time: '15:30' }],
    seatLayout: generateSeats(12, 5),
  },
  {
    id: '4',
    name: 'Garden City Runner',
    type: 'Non-A/C Sleeper (2+1)',
    departureTime: '20:15',
    arrivalTime: '05:00',
    duration: '8h 45m',
    price: 850,
    rating: 3.9,
    seatsAvailable: 18,
    from: 'Bangalore',
    to: 'Chennai',
    stops: ['Hosur', 'Vellore'],
    boardingPoints: [{ name: 'Madiwala', time: '20:15' }, { name: 'Electronic City', time: '21:00' }],
    droppingPoints: [{ name: 'Koyambedu', time: '05:00' }],
    seatLayout: generateSeats(10, 4),
  },
  {
    id: '5',
    name: 'Noida Shuttle',
    type: 'A/C Seater (2+2)',
    departureTime: '09:00',
    arrivalTime: '10:30',
    duration: '1h 30m',
    price: 150,
    rating: 4.1,
    seatsAvailable: 40,
    from: 'Delhi',
    to: 'Noida',
    stops: ['Akshardham', 'Mayur Vihar'],
    boardingPoints: [{ name: 'ISBT Kashmiri Gate', time: '09:00' }, { name: 'Anand Vihar', time: '09:30' }],
    droppingPoints: [{ name: 'Noida Sector 18', time: '10:15' }, { name: 'Noida City Center', time: '10:30' }],
    seatLayout: generateSeats(12, 5),
  },
  {
    id: '6',
    name: 'Delhi Darshan Tour',
    type: 'A/C Tourist Seater (2+2)',
    departureTime: '09:30',
    arrivalTime: '18:30',
    duration: '9h 0m',
    price: 800,
    rating: 4.7,
    seatsAvailable: 25,
    from: 'Delhi',
    to: 'Delhi',
    stops: ['India Gate', 'Red Fort', 'Qutub Minar', 'Lotus Temple', 'Humayun\'s Tomb'],
    boardingPoints: [{ name: 'Connaught Place', time: '09:30' }, { name: 'Karol Bagh', time: '10:00' }],
    droppingPoints: [{ name: 'Connaught Place', time: '18:30' }],
    seatLayout: generateSeats(10, 5),
  },
];

export const getBusById = (id: string): Bus | undefined => {
  return buses.find(bus => bus.id === id);
}
