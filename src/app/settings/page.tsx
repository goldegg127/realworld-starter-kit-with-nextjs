import { Button } from '@/components/common';

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

                        <ul className="error-messages">
                            <li>That name is required</li>
                        </ul>

                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control" type="text" placeholder="URL of profile picture" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        rows={8}
                                        placeholder="Short bio about you"></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Email" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="New Password"
                                    />
                                </fieldset>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
