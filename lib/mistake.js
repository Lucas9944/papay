class Definer {
  /** general errors*/
  static general_err1 = "att: something went wrong!";
  static general_err2 = "att: there is no data with that params!";
  static general_err3 = "att: file upload error!";

  /**member auth related  errors*/
  static auth_err1 = "att: mongodb validation is failed!";
  static err_auth3 = "att: no member with that member nick!";
  static err_auth4 = "att: your credentials do not match!";

  /**products related  errors*/
  static product_err1 = "att: product creation is failed!";
}

module.exports = Definer;
