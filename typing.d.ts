// typing.d.ts

type MultiSelectOption = {
  id: string;
  name: string;
  color: string;
};

type rowsStructured = {
  ai_name: string;
  ai_url: string;
  ai_types: MultiSelectOption[];
};
