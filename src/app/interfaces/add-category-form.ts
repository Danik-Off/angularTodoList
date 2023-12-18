import { FormControl } from "@angular/forms";

export interface AddCategoryForm{
  categoryName: FormControl<string|null>;
}
