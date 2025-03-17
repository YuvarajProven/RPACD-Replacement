var gxp_options = [
    {
        name: "FTO3 - Bachupally",
        value: "FTO3"
    },
    {
        name: "FTO2 - Bachupally",
        value: "FTO2"
    },
    {
        name: "CTO1 - Bollaram",
        value: "CTO1"
    },
    {
        name: "CTO2 - Bollaram",
        value: "CTO2"
    },
    {
        name: "CTO3 - Bollaram",
        value: "CTO3"
    },
    {
        name: "CTO5",
        value: "CTO5"
    },
    {
        name: "CTOSEZ",
        value: "CTOSEZ"
    },
    {
        name: "CTO6 - Pydi",
        value: "CTO6"
    },
    {
        name: "FTO6 - Baddi",
        value: "FTO6"
    },
    {
        name: "FTO7",
        value: "FTO7"
    },
    {
        name: "FTO8 - Baddi",
        value: "FTO8"
    },
    {
        name: "FTO9",
        value: "FTO9"
    },
    {
        name: "FTO11",
        value: "FTO11"
    },
    {
        name: "FTOPU1",
        value: "FTOPU1"
    },
    {
        name: "FTOPU2",
        value: "FTOPU2"
    }
]

function getUrl(cluster) {
  if (cluster == 'FTO3' || cluster == 'FTO2') {
      url_ = 'includeRPA/loginldap.php'
      console.log("cluster=FTO");
  }
  else if (cluster == 'CTO') {
      url_ = 'includeRPA/loginldap.php'
      console.log("cluster=CTO");
  }
  else {
      url_ = 'includeRPA/loginldap.php'
      console.log("cluster =  Other - Corporate");
  }

  return url_
}
