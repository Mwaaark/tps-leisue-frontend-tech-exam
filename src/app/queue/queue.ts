export interface Queue {
  queueNumber: string;
  customerInfo: {
    name: string;
    phoneNumber: string;
    people: number;
  };
  queueType: number;
  timeQueued: Date;
  timeServed: string;
  isServed: boolean;
  queueStatus: number;
}
