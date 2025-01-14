const redirectToLogin = (currentUrl: string) => {
    window.location.href = 'http://localhost:5173/login/?previous=' + currentUrl

    return null
}

export default redirectToLogin
