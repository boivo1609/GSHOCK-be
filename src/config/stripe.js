const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const createSession = async (line_items, cancel_url) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: `${process.env.CLIENT_URL}/payment/successfully`,
        cancel_url,
    })
    return session
}
module.exports = {
    createSession
}