export interface IReservations {
    id: number;
    betriebId: number;
    status: string
    gastId: number;
    peopleCount: number;
    msg: number;
    notes: number;
    tags: number;
    reservedFor: number;
    shiftId: number;
    roomId: number;
    stayTime: number;
    usePerSmsInform: string;
    isTablePlan: string;
    feedbackHash: string;
    feedbackSent: string;
    addOns: string;
    orderId: number;
    createdAt: string;
    hash: string;
    locked: number;
    paymentTemplate: number;
    paymentId: number;
    invoice: number
    recurrenceId: number;
    source: string;
    turnover: number;
    children: number;
    highChairs: number;
    resHotelId: number;
    referrer: string;
}