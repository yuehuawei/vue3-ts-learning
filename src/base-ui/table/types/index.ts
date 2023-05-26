type IformType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  field: string;
  type: IformType;
  label: string;
  rules?: any[];
  placeholder?: any;
  // 针对Select
  options?: any[];
  // 针对特殊属性
  otherOptions?: any;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemLayout?: any;
}
