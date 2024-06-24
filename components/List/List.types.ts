import { SATAUS } from "../types";

export type ListProps = {
  data: string[];
  selectedItem: string;
  status: SATAUS | undefined;
  onSelect: (data: string) => void;
};
