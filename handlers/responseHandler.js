
const Responses = {
    201: "Successfully created new data",
    200: "Operation completed successfully",
    400: "You might be missing required parameters",
    401: "You, my friend are not authenticated. Thanks, and do the needful!",
    403: "You, my friend are not authorized to carry out this operation. Thanks, and do the needful!",
    500: "Something went wrong internally... Just chill, we've got this!"
}


export function handleResponse(res, status, data) {
    const message = Responses[status];
    res.status(status).json({ status, message, data });
}
