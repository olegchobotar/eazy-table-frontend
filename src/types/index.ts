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
  id: string;
  address: string;
  name: string;
  photoUrl: string;
  description?: string;
  tags: Tag[];
  tables: Table[];
}

export type RootStackParamList = {
  Home: undefined;
  Restaurant: { restaurantId: string };
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
