const timeStr = (t) =>{
    if(t === 0) {
        return `00`;
    }
    if(t < 10) {
        return `0${t}`;
    }
    if(t >= 10) {
        return `${t}`;
    }
};

const time = (t) =>{
    const min = Math.floor(t / 60);
    const sec = Math.ceil(t % 60);

    return `${timeStr(min)}:${timeStr(sec)}`
};

export default time;