// Dropdown.tsx
import React from 'react';

type DropdownProps = {
  options: string[]; // ドロップダウンの選択肢
  selectedValue: string;
  onChange: (value: string) => void; // 値が変更されたときの処理
  label?: string; // ドロップダウンのラベル
  text: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onChange,
  label,
  text,
}) => {
  return (
    <div className="flex flex-col items-start">
      <label className="text-white text-sm font-semibold mb-2">{label}</label>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-200 text-white border border-gray-300 rounded-md p-2 w-48  text-xs bg-gradient-to-r from-black via-indigo-700 to-purple-800 shadow-md hover:bg-indigo-800 focus:outline-none "
      >
        <option value="" disabled>
          {text}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
