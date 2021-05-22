export const checkInvalidEmail = email => {
    const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (re.test(
            email,
        )) {
        return false;
    } else {
        return true;
    }

}
export const checkInvalidPassword = password => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (re.test(
            password
        )) {
        return false;
    } else {
        return true;
    }

}