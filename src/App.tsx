import { useEffect, useState } from "react";
import clsx from "clsx";

import { Button, Select } from "./shared/components";
import s from "./App.module.css";

interface Preset {
  id: string;
  field: number;
  name: string;
}

export const App = () => {
  const [mode, setMode] = useState<Preset>({ id: "0", name: "Pick mode", field: 0 });
  const [activeIndexes, setActiveIndexes] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [presets, setPresets] = useState<Preset[]>([]);

  const fetchPresets = async () => {
    const response = await fetch("https://60816d9073292b0017cdd833.mockapi.io/modes");
    const data = await response.json();

    if (data) {
      setPresets(data);
    }
  };

  const onSelectMode = (option: { id: string; label: string }) => {
    const preset = presets.find((preset) => preset.id === option.id);

    if (preset) {
      setMode(preset);
      setActiveIndexes([]);
      setIsStarted(false);
    }
  };

  const onStart = () => setIsStarted(true);

  const onFieldMouseEnter = (index: number) => {
    if (activeIndexes.includes(String(index))) {
      setActiveIndexes((prev) => prev.filter((item) => item !== String(index)));
    } else {
      setActiveIndexes((prev) => [...prev, String(index)]);
    }
  };

  const renderFields = () => {
    if (!isStarted) {
      return null;
    } else {
      const fields = Array.from({ length: mode.field }, (_, index) => (
        <div key={index} className="field">
          Field {index + 1}
        </div>
      ));

      const renderedFields = fields.map((_, index) => (
        <div
          className={clsx(s.field, { [s.active]: activeIndexes.includes(String(index)) })}
          onMouseEnter={() => onFieldMouseEnter(index)}
          key={index}
        />
      ));

      return renderedFields;
    }
  };

  const calculateRowAndColumn = (index: number): { row: number; column: number } => {
    const itemsPerRow = 5;

    const row = Math.floor(index / itemsPerRow) + 1; // Add 1 because index starts from zero
    const column = (index % itemsPerRow) + 1; // Add 1 because index starts from zero

    return { row, column };
  };

  const renderedHoveredSquares = activeIndexes
    .sort((a, b) => Number(a) - Number(b))
    .map((index) => (
      <div key={index} className={s.index}>{`row ${calculateRowAndColumn(Number(index)).row} col ${
        calculateRowAndColumn(Number(index)).column
      }`}</div>
    ));

  useEffect(() => {
    fetchPresets();
  }, []);

  return (
    <div className={s.app}>
      <h1>StarNavi - Test Task</h1>
      <div className={s.row}>
        <main className={s.main}>
          <header className={s.header}>
            <Select options={presets.map(({ id, name }) => ({ id, label: name }))} value={mode.name} onSelect={onSelectMode} />
            <Button title="START" onClick={onStart} />
          </header>
          <section className={s.fields}>{renderFields()}</section>
        </main>
        <section className={s.results}>
          <span className={s.results__title}>Hover squares:</span>
          <div className={s.indexes}>{renderedHoveredSquares}</div>
        </section>
      </div>
    </div>
  );
};
