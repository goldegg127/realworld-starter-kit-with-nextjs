import { InputFieldProps } from './type';

export default function InputField({
    type,
    styleClass: { size },
    placeholder,
    value,
    readOnly,
    onChangeHandler,
    onBlurHandler,
    onKeyboardHandler,
}: InputFieldProps) {
    const className = `form-control form-control-${size}`;

    return (
        <fieldset className="form-group">
            <input
                type={type}
                className={className}
                placeholder={!readOnly ? placeholder : ''}
                value={value}
                readOnly={readOnly}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onKeyDown={onKeyboardHandler}
            />
        </fieldset>
    );
}
