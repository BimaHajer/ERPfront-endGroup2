export class FilterDto<OBJ extends object = AnyObject>{
  select?: (keyof OBJ)[];
  order?: Order<OBJ>;
  skip?: number;
  take?: number;
  relations?: string[];
  join?: string;
  where?: ObjectLiteral | string | any;
  loadRelationIds?: boolean
}

export declare type Fields<MT = AnyObject> = {
  [P in keyof MT]?: boolean;
};

export declare type Order<MT = AnyObject> = {
  [P in keyof MT]: Direction;
};

export declare type Direction = 'ASC' | 'DESC' | 1 | -1;

export interface ObjectLiteral {
  [key: string]: any;
}

export interface AnyObject {
  [property: string]: any;
}
