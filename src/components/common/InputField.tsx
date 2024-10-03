export default function InputField({
    type,
    styleClass: { size },
    placeholder,
    value,
    readOnly,
    onChangeHandler,
    onBlurHandler,
    onKeyboardHandler,
}: {
    type: 'text' | 'password';
    styleClass: { size: 'xs' | 'sm' | 'lg' };
    placeholder: string;
    value?: string;
    readOnly?: boolean;
    onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyboardHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
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
