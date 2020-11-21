const AWS = require("aws-sdk");
// name of your bucket here
const NAME_OF_BUCKET = "supdog-hosting";
const multer = require('multer');


if (process.env.NODE_ENV !== "production") {
  AWS.config.loadFromPath("./credentials.json");
}
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const singlePublicFileUpload = async (file, folder="") => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = folder + "/" + new Date().getTime().toString() + path.extname(originalname);

  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
    ACL: "public-read"
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Location;
};

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '');
    }
});

const singleMulterUpload = (nameOfKey) => multer({ storage: storage }).single(nameOfKey);

module.exports = {
  s3,
  singlePublicFileUpload,
  singleMulterUpload,
};
