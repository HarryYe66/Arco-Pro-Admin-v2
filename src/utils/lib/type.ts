export interface IAttr {
  level: number;
  description: string;
  requiredSkillId: number | null;
  requiredSkillLevel: number | null;
  requiredPis: number | null;
  requiredPiCrystals: number | null;
  effect: { [key: string]: string };
}

export interface IFormAttr extends IAttr {
  method: string;
  cost: number | null;
  rSkill?: { label: string; value: number; child?: Array<any> } | null;
  effectList?: Array<any>;
}
