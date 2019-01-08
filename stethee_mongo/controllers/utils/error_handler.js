exports.handleError = function (errors) {
    let error = {type: 500, errors: {}};
    let finalErr = {}
    let index =0;
    for (let errName in errors) {
        finalErr = Object.assign(error.errors, {
            [index]: {
                'Error area': errName,
                'Error type': errors[errName].name,
                'Error reason': errors[errName].message,
                'Error kind': errors[errName].kind,
                'Provided value': errors[errName].value
            }
        });
        index++;
    }
    return error;
}