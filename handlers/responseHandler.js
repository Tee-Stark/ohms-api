function handleResponse(res, status, data = {}) {
    switch (status) {
        case 201: message = "Successfully created new data";
        break;

        case 200: message = "Operation comnpleted successfully";
        break;

        case 400: message = "You might be missing required parameters";
        break;

        case 401: message = "You, my friend are not authenticated. Thanks, and do the needful!";
        break;

        case 403: message = "You, my friend are not authorized to carry out this operation. Thanks, and do the needful!";
        break;

        case 500: message = "Something went wrong internally... Just chill, we've got this!";
        break;
        
    }
    res.status(status).json({ status, message, data });
}
