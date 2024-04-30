// typing.d.ts

type MultiSelectOption = {
  id: string;
  name: string;
  color: string;
};

// Ai_List_Types
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

// Promts_List_Types
type promtsListStructured = {
  prompt_name: string;
  promt_result_type: MultiSelectOption[];
  prompt_ai_url: string;
  prompt_result_img_url: string;
  prompt_result_video_url: string;
  prompt_pattern: string;
  prompt_type: MultiSelectOption[];
  prompt_speciality: MultiSelectOption[];
  prompt_ai_title: MultiSelectOption[];
  prompt_rate: number;
  prompt_date_post: number;
  [key: string]: any;
};

// News_List_Types
type newsListStructured = {
  news_name: string;
  news_type: MultiSelectOption[];
  news_img_url: string;
  news_video_url: string;
  news_source_url: string;
  news_text_full: string;
  news_time_to_read: number;
  news_date_post: number;
  [key: string]: any;
};
