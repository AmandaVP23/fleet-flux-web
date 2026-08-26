export type RequestsResponse<T> =
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          error: any; // todo - remove any,
      };
