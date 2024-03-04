export interface TableProps {
    headers: string[];
    data: any[];
    onEdit:(data:any) => void;
  }