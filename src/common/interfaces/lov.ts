export namespace ILov {
  export interface Lov {
    displayName: string;
    parent: number;
    term: string;
    type: LovType;
    children: Lov[];
  }

  export enum LovType {
    CITY = "CITY",
    TOWN = "TOWN",
    TRANSLATION_TR = "TRANSLATION_TR",
    TRANSLATION_EN = "TRANSLATION_EN",
    TRANSLATION = "TRANSLATION"
  }
}
