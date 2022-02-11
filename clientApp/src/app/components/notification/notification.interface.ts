export interface INotification {
    id: number;
    type: string;
    icon: string;
    message: string;
    startDate: number;
    endDate: number;
}


export enum NotificationTypeEnum {
    success = 'success',
    error = 'error',
    warning = 'warn',
    information = 'info'
}