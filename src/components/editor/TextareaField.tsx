export default function TextareaField({
    placeholder,
    onBlurHandler,
}: {
    placeholder: string;
    onBlurHandler?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}) {
    return (
        <fieldset className="form-group">
            <textarea className="form-control" rows={8} placeholder={placeholder} onBlur={onBlurHandler}></textarea>
        </fieldset>
    );
}
