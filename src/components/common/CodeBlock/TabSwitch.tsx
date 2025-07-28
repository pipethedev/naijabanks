import type React from 'react';

interface TabSwitchProps {
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
}

export const TabSwitch: React.FC<TabSwitchProps> = ({ options, value, onChange }) => (
    <div className='border-border flex items-center rounded-md border p-0.5 text-xs'>
        {options.map((opt) => (
            <button
                key={opt.value}
                type='button'
                onClick={() => onChange(opt.value)}
                className={`rounded-sm px-2 py-0.5 ${value === opt.value ? 'bg-secondary' : ''}`}>
                {opt.label}
            </button>
        ))}
    </div>
);
