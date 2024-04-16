// typing.d.ts

type MultiSelectOption = {
  id: string;
  name: string;
  color: string;
};

// Ai_List
type aiListStructured = {
  ai_name: string;
  ai_description: string;
  ai_url: string;
  ai_img_url: string;
  ai_rate: number;
  ai_date_post: number;
  ai_input: MultiSelectOption[];
  ai_output: MultiSelectOption[];
  ai_uses: MultiSelectOption[];
  ai_sector: MultiSelectOption[];
  ai_api: MultiSelectOption[];
  ai_cost: MultiSelectOption[];
  ai_from_ukr: MultiSelectOption[];
  [key: string]: any;
};

// Promts_List
type promtsListStructured = {
  prompt_name: string;
  prompt_ai_url: string;
  prompt_result_img_url: string;
  prompt_pattern: string;
  prompt_type: MultiSelectOption[];
  prompt_speciality: MultiSelectOption[];
  prompt_ai_title: MultiSelectOption[];
  prompt_rate: number;
  prompt_date_post: number;
  [key: string]: any;
};
