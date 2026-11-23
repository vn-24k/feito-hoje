import React from "react";
import { Area, AREAS } from "../domain/action";

interface AreaPickerProps {
  selectedArea: Area;
  onSelect: (area: Area) => void;
  disabled?: boolean;
}

export const AreaPicker: React.FC<AreaPickerProps> = ({ selectedArea, onSelect, disabled }) => {
  const areasList = Object.values(AREAS);

  return (
    <div className="area-picker" role="group" aria-label="Selecione a área do compromisso de hoje">
      <p className="area-picker__label">Qual dimensão pede sua presença hoje?</p>
      <div className="area-picker__grid">
        {areasList.map(item => {
          const isSelected = selectedArea === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`area-button ${isSelected ? "area-button--selected" : ""}`}
              onClick={() => onSelect(item.id)}
              disabled={disabled}
              aria-pressed={isSelected}
            >
              <span className="area-button__indicator" aria-hidden="true" />
              <span className="area-button__name">{item.name}</span>
            </button>
          );
        })}
      </div>
      <p className="area-picker__tagline">{AREAS[selectedArea]?.tagline}</p>
    </div>
  );
};
