import { SettingForm } from '@/components/settings';

export default function SettingsPage() {
    {
        /** @todo 회원정보 수정 페이지 개발 예정 */
    }

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>
                        <SettingForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
