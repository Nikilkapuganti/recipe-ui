import { ReactNode } from "react";

export interface PopupProps {
    header: string;
    onClose: () => void;
    children: ReactNode;
  }