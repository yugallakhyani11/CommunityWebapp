/**
 * Sets the HTTP response with a success status code and JSON data.
 * @param {Object} data - Data to be sent in the response body.
 * @param {Object} response - Express response object.
 * @param {Object} statusCode - Status code
 */
export const setResponse = (data, response, statusCode) => {
  response.status(statusCode);
  response.json(data);
};

/**
 * Sets the HTTP response with an error status code and error message.
 * @param {Error} error - Error object containing error details.
 * @param {Object} response - Express response object.
 */
export const setError = (err, response) => {
  response.status(500);
  response.json({
    error: {
      code: "InternalServerError",
      message: "Error occured while processing the request",
    },
  });
};
