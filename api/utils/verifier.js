function checkRequiredParametersInBody(req, checkList) {
  let response = { isPass: true, errorFields: [] }
  checkList.forEach(function(field) {
    if (typeof req.body[field] == 'undefined') {
      response.isPass = false;
      response.errorFields.push(field);
    }
  });

  return response;
}

exports.checkRequiredParametersInBody = checkRequiredParametersInBody;
