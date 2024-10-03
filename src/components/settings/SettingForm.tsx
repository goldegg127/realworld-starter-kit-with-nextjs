'use client';

import { Button, InputField, TextareaField } from '@/components/common';

export default function SettingForm() {
    {
        /** @todo 회원정보 수정 페이지 개발 예정 */
    }

    return (
        <>
            <ul className="error-messages">
                <li>That name is required</li>
            </ul>

            <form>
                <fieldset>
                    <InputField type="text" styleClass={{ size: 'xs' }} placeholder="URL of profile picture" />
                    <InputField type="text" styleClass={{ size: 'lg' }} placeholder="Your Name" />
                    <TextareaField rows={8} styleClass={{ size: 'lg' }} placeholder="Short bio about you" />
                    <InputField type="text" styleClass={{ size: 'lg' }} placeholder="Email" />
                    <InputField type="password" styleClass={{ size: 'lg' }} placeholder="New Password" />
                    <Button
                        type="button"
                        styleClass={{
                            size: 'lg',
                            outline: false,
                            color: 'primary',
                            pull: 'pull-xs-right',
                        }}>
                        Update Settings
                    </Button>
                </fieldset>
            </form>
            <hr />
            <Button type="button" styleClass={{ outline: true, color: 'danger' }}>
                Or click here to logout.
            </Button>
        </>
    );
}
