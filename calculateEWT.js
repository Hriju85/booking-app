function calculateEWT({

    peopleAhead,
    averageServiceTime,
    elapsedCurrentService

}) {

    const estimated =
        (peopleAhead * averageServiceTime)
        - elapsedCurrentService;

    return Math.max(estimated,0);
}

module.exports = calculateEWT;