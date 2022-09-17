function timeoutHelper(func, duration) {
    setTimeout(() => {
        func()
    }, duration || 5000);
}

export default timeoutHelper;