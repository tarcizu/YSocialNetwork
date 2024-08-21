export function formattedDate(dbTimestamp) {

    const formattedTimestamp = new Date(dbTimestamp);
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }
    const formattedTime = formattedTimestamp.toLocaleString('pt-BR', timeOptions);


    const dateOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }
    const formattedDate = formattedTimestamp.toLocaleString('pt-BR', dateOptions).replace('.', '');

    const date = `${formattedTime} - ${formattedDate}`
    return date;
}
export function timeAgo(dbTimestamp) {

    const now = new Date();
    const postTime = new Date(dbTimestamp);
    let timeDifference = Math.floor((now - postTime) / 1000);

    if (timeDifference < 60) {
        return `${timeDifference} seg${timeDifference <= 1 ? '' : 's'} atrás`
    }
    timeDifference = Math.floor(timeDifference / 60);
    if (timeDifference < 60) {
        return `${timeDifference} min atrás`
    }
    timeDifference = Math.floor(timeDifference / 60);
    if (timeDifference < 60) {
        return `${timeDifference} h atrás`
    }
    timeDifference = Math.floor(timeDifference / 24);
    if (timeDifference < 365) {
        const dateOptions = {
            day: '2-digit',
            month: 'short'
        }
        return postTime.toLocaleString('pt-BR', dateOptions).replace('.', '');
    } else {
        const dateOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }
        return postTime.toLocaleString('pt-BR', dateOptions).replace('.', '');
    }


}

