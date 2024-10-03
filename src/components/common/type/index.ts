import { Articles, searchParamsType } from '@/type';

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

export type ArticleListProps = {
    articles: Articles;
    articlesCount: number;
    currentPage: number;
    searchParams?: searchParamsType;
};

export type TabNavProps = {
    children: React.ReactNode;
    navStyle: 'articles-toggle' | 'feed-toggle';
};

export type TabMenuProps = {
    children: React.ReactNode;
    isActive: boolean;
    link: string;
};

export type ArticleTabListProps = {
    children: TabNavProps['children'];
    navStyle: TabNavProps['navStyle'];
    articles: ArticleListProps['articles'];
    articlesCount: ArticleListProps['articlesCount'];
    currentPage: ArticleListProps['currentPage'];
    searchParams?: ArticleListProps['searchParams'];
};
