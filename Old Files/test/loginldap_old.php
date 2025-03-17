<?php
if(isset($_POST['username']) && isset($_POST['password'])){
    $adServer = "ldap://INFT3GxP.FTO3GXP.COM";
    $ldap = ldap_connect($adServer);

    $domain = 'FTO3GXP.COM';
    $username = $_POST['username'];
    $password = $_POST['password'];
    $ldapconfig['host'] = '172.29.114.15';
    $ldapconfig['port'] = 389;
    $ldapconfig['basedn'] = 'DC=FTO3GXP,DC=COM';
    $ldap=ldap_connect($ldapconfig['host'], $ldapconfig['port']);

    ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);
    $dn=$ldapconfig['basedn'];
    $bind=@ldap_bind($ldap, $username .'@' .$domain, $password);
    $attr = array("memberof","givenname");

    if ($bind) {
        $filter="(sAMAccountName=$username)";
        $result = ldap_search($ldap,"dc=FTO3GXP,dc=COM",$filter);
        ldap_sort($ldap,$result,"sn");
        $info = ldap_get_entries($ldap, $result);
          $msg = NULL;
          echo $info;
        for ($i=0; $i<$info["count"]; $i++)
        {
            if($info['count'] > 1)
              $msg = "valid";
            $userDn = $info[$i]["distinguishedname"][0];
        }
        @ldap_close($ldap);
        echo "valid";
    } else {
        ldap_get_option($ldap, LDAP_OPT_DIAGNOSTIC_MESSAGE, $extended_error);

        if (!empty($extended_error))
        {
            $errno = explode(',', $extended_error)[2];
            $errno = explode(' ', $errno)[2];
            $errno = intval($errno);

            if ($errno == 775) {
            $msg = "locked";
         }
          else if ($errno == 52) {
            $msg = "invalid";
          }
        }
        echo $msg;
    }

}
?>
