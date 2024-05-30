export type Suite = {
  id: string;
  number: string;
  is_male_accommodation: boolean;
  lounges: LoungeMina[] | null;
};
export type LoungeMina = {
  name: string;
  suiteId: Suite['id']; // fk
  id: string;
  beds: BedTentMina[] | null;
};

export type BedTentMina = {
  id: string;
  code: string;
  loungeMinaId: LoungeMina['id']; // fk
  pilgrim?: Pilgrim | null;
  info?: {
    place: string;
    gender: string;
    suite_number: number;
    lounge_number: number;
    bed_number: number;
  };
};
export type BedBuidingMina = {
  id: string;
  code: string;
  room: Room['id']; // fx
  pilgrim: Pilgrim | null;
};
export type Room = {
  id: string;
  number: number;
  max_capacity: number;
  current_capacity: number;
  floor: Floor['id'];
  beds: BedBuidingMina[] | null;
};
export type Floor = {
  id: string;
  number: number;
  building: Building['id'];
  rooms?: Room[] | null;
};
export type Building = {
  id: string;
  name: number;
  max_capacity: number;
  current_capacity: number;
  floors?: Floor[] | null;
};
export type Supervisor = {
  id: string;
  name: string;
  phone_number: string;
  busId: Bus['id'];
};
export type Bus = {
  id: string;
  bus_code: string;
  bus_plate: string;
  bus_name: string;
  max_capacity: number;
  current_capacity: number;
  start_location_id: Location['id'];
  destination_location_id: Location['id'];
  from_location_id: Location['id'];
  supervisor_id: Supervisor['id'];
};

export type Location = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  cityId: City['id'];
};
export type City = {
  id: string;
  name: string;
};

export type BedTentArafah = {
  id: string;
  code: string;
  pilgrim?: Pilgrim | null;
  lounge?: LoungeArafah['id'];
  loungeArafahId: LoungeArafah['id']; // fk
};
export type LoungeArafah = {
  id: string;
  name: string;
  lounge_number: number;
  max_capacity: number;
  current_capacity: number;
  is_male_accmidations: boolean;
};

export type Pilgrim = {
  id: string;
  mina_tent_accommodation: BedTentMina['id']; //fk
  bus_accommodation: Bus['id']; //fk
  national_id: string;
  permit_status: string;
  name: string;
  is_male: boolean;
  nationality: string;
  phone_number: string;
  status: boolean;
  booking_reference: string;
  package_name: string;
  package_number: string;
  transportation: string;
  date_of_birth: Date | string;
  date_of_birth_hijri: string;
  city: string;
  code: string;
  mina_building_accommodation: BedBuidingMina['id']; //fk
  arafah_accommodation: BedTentArafah['id']; //fk
};

export type Auth = {
  access: string;
  refresh: string;
};

export type TPState = 'sending' | 'prompt' | 'error' | 'success';
export type DialogData<T> = {
  type: 'create' | 'update' | 'delete';
  data: T;
};
