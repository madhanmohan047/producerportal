export interface Base {
  _id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface TypeList extends Base {
  code: string;
  name: string;
  priority?: number;
}

export interface TypeKeyValue {
  code: string;
  name: string;
}

export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

