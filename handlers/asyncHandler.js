/**
 * Catch error in async route controller
 */
export default (fn) => {
    return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};
  