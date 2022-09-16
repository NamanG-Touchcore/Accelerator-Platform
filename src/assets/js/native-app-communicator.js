console.log("window Mainstream")
// window.communicationname.postMessage('{"screen" : "MAIN_SCREEN","action" : "READY"}')

function setUserDetails(userDetails) {
    let parsedUserDetails = JSON.parse(userDetails)
    const currentDate = new Date();
    const timestamp = currentDate.getTime() / 1000;
    document.cookie = `personId=${parsedUserDetails.personId}`
    document.cookie = `subjectIdentifier=${parsedUserDetails.subjectIdentifier}`
    document.cookie = `subjectId=${parsedUserDetails.subjectId}`
    document.cookie = `username=${parsedUserDetails.username}`
    document.cookie = `preferredLanguage=${parsedUserDetails.preferredLanguage}`
    document.cookie = `bearer_token=${parsedUserDetails.accessToken}`
    document.cookie = `refresh_token=${parsedUserDetails.refreshToken}`
    document.cookie = `expires_In_Seconds=${parsedUserDetails.expiresInSecond}`
    document.cookie = `app_downloaded_for_first_time=${parsedUserDetails.isFirstTime}`
    document.cookie = `notification_status=${parsedUserDetails.notificationPermission}`
    document.cookie = `userLoggedIn=true`
    let expireAt = timestamp + parseInt(parsedUserDetails.expiresInSecond)
    document.cookie = `expires_at=${expireAt}`


    console.log(`login_time ${timestamp}`)
    console.log(`personId ${parsedUserDetails.personId}`)
    console.log(`subjectIdentifier ${parsedUserDetails.subjectIdentifier}`)
    console.log(`subjectId ${parsedUserDetails.subjectId}`)
    console.log(`username ${parsedUserDetails.username}`)
    console.log(`preferredLanguage ${parsedUserDetails.preferredLanguage}`)
    console.log(`bearer_token ${parsedUserDetails.accessToken}`)

}

function setDefaultLanguageOnRegistration(preferredLanguage) {
    document.cookie = `preferredLanguage=${preferredLanguage}`
    document.cookie = `userLoaggedIn=false`
}

function updateNotificationStatus(notificationStatus) {
    document.cookie.split(";").forEach(function(el) {
        let [key, value] = el.split("=")
        if (key.trim() == "notification_status" && value.trim() !== notificationStatus) {
            console.log(`Message recieved from flutter to update notification status ${notificationStatus}`)
            document.cookie = `notification_status=${notificationStatus}`
            window.location.reload()
        }
    })
}


function sendMessageToFlutter(message) {
    console.log(`Sending message to flutter : ${message}`)
    window.communicationname.postMessage(message);
}
