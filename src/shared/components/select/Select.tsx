import { useState } from "react";

import ExpandMore from "../../../assets/expand_more.svg";
import ExpandLess from "../../../assets/expand_less.svg";
import s from "./Select.module.css";

interface Option {
  id: string;
  label: string;
}

interface Props {
  options: Option[];
  onSelect(option: Option): void;
  value: string;
}

export const Select = ({ options = [], value = "", onSelect }: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  const onSelectValue = (option: Option) => {
    onSelect(option);
    setIsOpened(false);
  };

  const renderedOptions = options.map(({ id, label }) => (
    <div onClick={() => onSelectValue({ id, label })} className={s.option} key={id}>
      {label}
    </div>
  ));

  return (
    <div className={s.wrapper}>
      <header onClick={() => setIsOpened((prev) => !prev)} className={s.header}>
        <span>{value}</span>
        {isOpened ? <img src={ExpandLess} alt="expand less" /> : <img src={ExpandMore} alt="expand more" />}
      </header>
      {isOpened ? <div className={s.options}>{renderedOptions}</div> : null}
    </div>
  );
};
