export default function TextareaField({
    styleClass: { size },
    rows,
    placeholder,
    value,
    readOnly,
    onChangeHandler,
    onBlurHandler,
    onKeyboardHandler,
}: {
    styleClass: { size: 'xs' | 'sm' | 'lg' };
    rows: number;
    placeholder: string;
    value?: string;
    readOnly?: boolean;
    onChangeHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlurHandler?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyboardHandler?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}) {
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
