export interface Tag {
  name: string;
  color?: string;
}

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
}

export interface Table {
  tableNumber: number;
  seatsCount: number;
  timeSlots: string[];
}

export interface Restaurant {
  name: string;
  photoUrl: string;
  description?: string;
  tags: Tag[];
  tables: Table[];
}
