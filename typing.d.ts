// typing.d.ts

type MultiSelectOption = {
  id: string;
  name: string;
  color: string;
};

type aiListStructured = {
  ai_name: string;
  ai_description: string;
  ai_url: string;
  ai_img_url: string;
  ai_rate: number;
  ai_input: MultiSelectOption[];
  ai_output: MultiSelectOption[];
  ai_uses: MultiSelectOption[];
  ai_sector: MultiSelectOption[];
  ai_api: MultiSelectOption[];
  ai_cost: MultiSelectOption[];
  ai_from_ukr: MultiSelectOption[];
};
