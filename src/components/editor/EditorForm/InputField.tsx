export default function InputField({
    value,
    placeholder,
    onChangeHandler,
    onBlurHandler,
    onKeyboardHandler,
    readOnly,
}: {
    value?: string;
    placeholder: string;
    onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyboardHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
}) {
    return (
        <fieldset className="form-group">
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder={!readOnly ? placeholder : ''}
                onBlur={onBlurHandler}
                onKeyDown={onKeyboardHandler}
                readOnly={readOnly}
                value={value}
                onChange={onChangeHandler}
            />
        </fieldset>
    );
}
