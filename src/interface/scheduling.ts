export interface IScheduling {
  id?: string;
  doctor?: string;
  date?: string;
  time?: string;
  location?: string;
  specialty?: string;
  completed?: boolean;
  canceled?: boolean;
  absent?: boolean;
}
