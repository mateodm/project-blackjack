export default function notFoundHandler (req, res, next) {
    return res.render("error404", {url: req.url})
}