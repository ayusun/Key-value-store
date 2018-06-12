function ValidationError(errorMsg, errorStatus){
    this.errorMsg = errorMsg;
    this.status = errorStatus;

}

ValidationError.prototype = Object.create(Error.prototype);

ValidationError.prototype.toString = function () {
  return JSON.stringify(this.toJSON());
};

ValidationError.prototype.toJSON = function () {
  return {
    msg: this.errorMsg,
    status:this.status
  };
};
module.exports = ValidationError;