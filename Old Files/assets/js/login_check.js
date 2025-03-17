function getUrl(cluster) {
  if (cluster == 'FTO') {
      url_ = 'includeRPA/loginldap_fto.php'
      console.log("cluster=FTO");
  }
  else if (cluster == 'CTO') {
      url_ = 'includeRPA/loginldap_cto.php'
      console.log("cluster=CTO");
  }
  else {
      url_ = 'includeRPA/loginldap.php'
      console.log("cluster =  Other - Corporate");
  }

  return url_
}
