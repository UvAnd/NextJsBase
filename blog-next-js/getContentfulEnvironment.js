const contentfulManagement = require("contentful-management")

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-iLfsP8B3DdRGHLCHxLoyZk-C0HaHsQPDjpjBOv11kL4',
  })

  return contentfulClient
    .getSpace('c7wjwnxaj4y1')
    .then(space => space.getEnvironment('master'))
}