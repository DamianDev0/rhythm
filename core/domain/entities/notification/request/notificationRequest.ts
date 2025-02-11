export interface NotificationRequest {
  title: string;
  message: string;
  oneSignalIds?: string[];
  filters?: OneSignalFilter[];
  scheduleOptions?: ScheduleOptions;
}

export interface OneSignalFilter {
  field: 'tag' | 'device_type' | 'last_active';
  relation:
    | '='
    | '!='
    | '>'
    | '<'
    | '>='
    | '<='
    | 'exists'
    | 'not_exists'
    | 'in'
    | 'not_in';
  value: string | number | boolean;
}

export interface ScheduleOptions {
  sendAfter?: string;
  delayedOption?: 'timezone' | 'last-active';
  deliveryTimeOfDay?: string;
}
