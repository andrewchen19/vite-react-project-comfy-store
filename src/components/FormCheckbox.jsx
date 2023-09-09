const FormCheckbox = ({ label, name, size, defaultValue }) => {
  return (
    <div className="form-control grid place-items-center">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        // 當 defaultValue 沒有傳入時，undefined -> falsy value
        // 當 defaultValue 有傳入時，string -> truthy value
        defaultChecked={defaultValue}
        className={`checkbox checkbox-primary ${size}`}
      />
    </div>
  );
};

export default FormCheckbox;
