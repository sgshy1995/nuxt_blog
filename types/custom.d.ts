
type Post = {
  title: string;
  id: string;
  date: string;
  content: string;
  htmlContent: string;
}

type Result = {
  code: number;
  message: string;
  status: boolean;
  data?: {[key:string]:any}
}

/* TreeSelectDate Interface */

interface TreeSelectDataItem {
  title: string,
  value: string | number,
  key: string | number,
  selectable?: boolean,
  children?: TreeSelectDataItem[]
}

interface TreeSelectDataInterface extends Array<TreeSelectDataItem> {
}

/* TreeDate Interface */

interface TreeDataItem {
  title: string,
  num: string | number,
  key: string,
  children?: TreeDataItem[]
}

interface TreeDataInterface extends Array<Array<TreeDataItem>> {
}

/* Form Interface */

type FormInterface = {
  [key: string]: any
}

/* SpaceCol Interface */

interface SpaceColInterface {
  xs?: { span: number },
  sm?: { span: number },
  md?: { span: number },
  lg?: { span: number },
  xl?: { span: number },
  xxl?: { span: number },
  span?: number
}

/* Columns Interface */

interface ColumnItem {
  title: string;
  align?: string;
  dataIndex: string;
  key?: string;
  ellipsis?: true;
  width: number;
  filter?: any;
  disabled?: boolean;
  scopedSlots?: { customRender: string };
  customRender?: Function;
}

interface ColumnsInterface extends Array<ColumnItem> {

}

/* Select Interface */

interface SelectItem {
  value: string | number;
  label: string;
  title?: string;
  disabled?: boolean;
}

interface SelectInterface extends Array<SelectItem> {

}

/* Pagination Interface */

interface PaginationInterface {
  current: number | undefined;
  pageNum?: number;
  pageSize: number;
  pageSizeOptions: Array<string>;

  showTotal(total: number, range: Array<any>): string;

  itemRender(current: number, type: string, originalElement: HTMLElement): HTMLElement;

  showQuickJumper: boolean;
  showSizeChanger: boolean;
  total: number;
}

type Info = {
  browser?: {
    name: string;
    version: string;
    major: string;
  };
  device?: {
    type: string;
    model: string;
    vendor: string;
  };
  cpu?: {
    architecture: string | undefined;
  };
  os?: {
    name: string;
    version: string;
  };
  engine?: {
    name: string;
    version: string;
  };
}

type User = {
  username: string;
}

type ShowUser = {
  avatar: string | null;
  id: number;
  username: string;
  nickname: string;
}

type FormRule = {
  [key: string]: [{
    required: boolean;
    message?: string | (() => string);
    trigger: 'blur' | 'change';
    validator?: (rule: any, value: any, callback: Function) => any;
    pattern?: RegExp;
    transform?: (value: any) => any;
    type?: string;
  }]
}
