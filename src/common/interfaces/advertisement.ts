export namespace IAdvertisement {
  export interface AdvertisementDto {
    id?: number;
    title?: string;
    content?: string;
    image?: string;
    status?: AdvertisementStatus;
  }

  export enum AdvertisementStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED'
  }
}
