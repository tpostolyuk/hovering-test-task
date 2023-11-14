import { MouseEvent } from "react";

import s from "./Button.module.css";

interface Props {
  onClick(e: MouseEvent<HTMLButtonElement>): void;
  title: string;
}

export const Button = ({ onClick, title = "" }: Props) => {
  return (
    <button onClick={onClick} className={s.btn}>
      {title}
    </button>
  );
};
