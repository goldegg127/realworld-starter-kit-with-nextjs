import { TextareaFieldProps } from './type';

export default function TextareaField({
    styleClass: { size },
    rows,
    placeholder,
    value,
    readOnly,
    onChangeHandler,
    onBlurHandler,
    onKeyboardHandler,
}: TextareaFieldProps) {
    const className = `form-control form-control-${size}`;

    return (
        <fieldset className="form-group">
            <textarea
                className={className}
                rows={rows}
                value={value}
                placeholder={placeholder}
                readOnly={readOnly}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onKeyDown={onKeyboardHandler}></textarea>
        </fieldset>
    );
}
