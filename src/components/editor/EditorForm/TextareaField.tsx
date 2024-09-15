export default function TextareaField({
    value,
    placeholder,
    onChangeHandler,
    onBlurHandler,
    onKeyboardHandler,
    readOnly,
}: {
    value?: string;
    placeholder: string;
    onChangeHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlurHandler?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyboardHandler?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readOnly?: boolean;
}) {
    return (
        <fieldset className="form-group">
            <textarea
                className="form-control"
                rows={8}
                value={value}
                placeholder={placeholder}
                onBlur={onBlurHandler}
                onChange={onChangeHandler}></textarea>
        </fieldset>
    );
}
