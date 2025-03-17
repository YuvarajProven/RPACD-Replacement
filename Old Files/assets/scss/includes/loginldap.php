<?php
    use DRL\RPACD;
    $domain = 'FTO3GXP.COM';
    $username = $_POST['username'];
    $password = $_POST['password'];
    $ldapconfig['host'] = '172.29.114.15';
    $ldapconfig['port'] = 389;
    $ldapconfig['basedn'] = 'DC=FTO3GXP,DC=COM';
    $ds=ldap_connect($ldapconfig['host'], $ldapconfig['port']);
    ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ds, LDAP_OPT_REFERRALS, 0);
    $dn=$ldapconfig['basedn'];
    $bind=ldap_bind($ds, $username .'@' .$domain, $password);
    $attr = array("memberof","givenname");
    $isITuser = ldap_search($ds,$dn,"(sAMAccountName=" . $username. ")" ,$attr);
    $data = ldap_get_entries($ds,$isITuser);
     if ($isITuser > 0) {
            echo "valid";
          }
      else {
      echo "invalid";
      }
?>
