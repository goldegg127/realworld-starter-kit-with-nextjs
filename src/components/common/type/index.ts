export type ButtonProps = {
    children: React.ReactNode;
    type?: 'submit' | 'reset' | 'button' | undefined;
    styleClass: {
        size?: 'xs' | 'sm' | 'lg';
        outline: boolean;
        color: 'primary' | 'secondary' | 'danger';
        pull?: 'pull-xs-right';
        action?: boolean;
    };
    onClick?: (event: React.MouseEvent) => Promise<void>;
    link?: string;
};

export type InputFieldProps = {
    type: 'text' | 'password';
    styleClass: { size: 'xs' | 'sm' | 'lg' };
    placeholder: string;
    value?: string;
    readOnly?: boolean;
    onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyboardHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type TextareaFieldProps = {
    styleClass: { size: 'xs' | 'sm' | 'lg' };
    rows: number;
    placeholder: string;
    value?: string;
    readOnly?: boolean;
    onChangeHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlurHandler?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyboardHandler?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};
