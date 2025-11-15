export interface PersonConfig {
  person: string;
  device_trackers?: string[];
  step_sensor?: string;
  battery_sensor?: string;
  heart_rate_sensor?: string;
  distance_sensor?: string;
}

export interface FamilyDashboardConfig {
  type: string;
  entities: PersonConfig[];
  title?: string;
  description?: string;
}

export interface HomeAssistant {
  states: {
    [entity_id: string]: HassEntity;
  };
  callService: (domain: string, service: string, data?: any) => Promise<void>;
  callWS: (msg: any) => Promise<any>;
  config: {
    latitude: number;
    longitude: number;
    elevation: number;
    unit_system: {
      length: string;
      mass: string;
      temperature: string;
      volume: string;
    };
    location_name: string;
    time_zone: string;
    components: string[];
    version: string;
  };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    [key: string]: any;
    friendly_name?: string;
    battery_level?: number;
    latitude?: number;
    longitude?: number;
    location?: string;
    entity_picture?: string;
  };
  last_changed: string;
  last_updated: string;
}
