

type Post = {
  title :string;
  id: string;
  date :string;
  content: string;
  htmlContent: string;
}

type Result = {
  code: number;
  message: string;
  status: boolean;
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
  title: string
  align?: string
  dataIndex: string
  key?: string
  ellipsis?: true
  width: number
  filter?: any
  disabled?: boolean
  scopedSlots?: { customRender: string }
  customRender?: Function
}

interface ColumnsInterface extends Array<ColumnItem> {

}

/* Select Interface */

interface SelectItem {
  value: string | number
  label: string
  title?: string
  disabled?: boolean
}

interface SelectInterface extends Array<SelectItem> {

}

/* Pagination Interface */

interface PaginationInterface {
  current: number | undefined
  pageNum?: number
  pageSize: number
  pageSizeOptions: Array<string>
  showTotal(total: number, range: Array<any>): string
  itemRender(current: number, type: string, originalElement: HTMLElement): HTMLElement
  showQuickJumper: boolean
  showSizeChanger: boolean
  total: number
}
