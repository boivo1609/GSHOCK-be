const aws = require("aws-sdk");
const crypto = require("crypto")
const { promisify } = require("util")
const randomBytes = promisify(crypto.randomBytes);
const region = process.env.AMAZON_S3_REGION
const accessKeyId = process.env.AMAZON_S3_ACCESS_KEY_ID
const secretAccessKey = process.env.AMAZON_S3_SECRET_ACCESS_KEY
const bucketName = process.env.AMAZON_S3_BUCKET

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
})

const generateUploadURl = async () => {
    const rawBytes = await randomBytes(16);
    const key = rawBytes.toString("hex");
    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 60
    }
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)

    return uploadURL
}
module.exports = {
    generateUploadURl   
}