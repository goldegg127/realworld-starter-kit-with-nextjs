export default function InputField({
    placeholder,
    onBlurHandler,
    onKeyboardHandler,
}: {
    placeholder: string;
    onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyboardHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
    return (
        <fieldset className="form-group">
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder={placeholder}
                onBlur={onBlurHandler}
                onKeyDown={onKeyboardHandler}
            />
        </fieldset>
    );
}
