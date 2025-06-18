export const Input = ({ label, value, error, onChange }: Props) => {
  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}

      <input value={value} onChange={(e) => onChange(e.target.value)} />
      {error && <div className="input-error">{error} </div>}
    </div>
  );
};

interface Props {
  label: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
}
