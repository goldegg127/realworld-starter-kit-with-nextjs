export default function UserBanner() {
    return (
        <>
            <Image src={image} alt={`${username} profile image`} className="user-img" width={32} height={32} />
            <h4>{username}</h4>
            <p>{bio}</p>
            {/**
         * @todo 로그인 기능 구현 후 적용 예정
            <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round"></i>
                &nbsp; Follow Eric Simons
            </button>
            <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-gear-a"></i>
                &nbsp; Edit Profile Settings
            </button> 
        */}
        </>
    );
}
