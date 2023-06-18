const httpStatus = require('http-status');
const { generateUploadURl } = require("../../config/s3")
const { createSession } = require('../../config/stripe');
/**
 * Returns settings
 * @public
 */
exports.getSecureS3Url = async (req, res, next) => {
    try {
        const secureUrl = await generateUploadURl();
        res.json({
            secureUrl
        });
    } catch (error) {
        next(error);
    }
};

exports.createStripeSession = async (req, res, next) => {
    try {
        const line_items = [{
            price_data: {
                product_data: {
                    images: req.body.images,
                    name: req.body.name,
                },
                unit_amount: req.body.price,
                currency: "usd"
            },
            quantity: req.body.quantity,
        }]
        const session = await createSession(line_items, req.body.cancelUrl);
        res.json({ session })
    } catch (error) {
        next(error)
    }
}