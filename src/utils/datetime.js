function getCurrentSQLDateTime() {
    const now = new Date();

    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const sqlDateTime = `${now.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return sqlDateTime;
}

export default getCurrentSQLDateTime;