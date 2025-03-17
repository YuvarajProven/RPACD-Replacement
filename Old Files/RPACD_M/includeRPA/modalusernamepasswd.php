
<?php
session_start();
error_reporting(0);


$plant = $_SESSION['plant'];
$flag = $_SESSION['flag'];
if ($plant) {
}

      $plant = $_POST['modalplant']; //cluster
      if ($flag == 'Corporate')
      {
        $adServer = "ldap://NEWADC03.CORP.DRREDDYS.COM";
        $ds = ldap_connect($adServer);
        $domain = 'CORP.DRREDDYS.COM';
        $username = $_POST['modalusername'];
        $password = $_POST['modalpassword'];
        $ldapconfig['host'] = '152.63.1.204';
        $ldapconfig['port'] = 389;
        $ldapconfig['basedn'] = 'DC=CORP,DC=DRREDDYS,DC=COM';
      }
      elseif($flag == 'GXP')
      {

        if ($plant == 'FTO3')
        {
          $domain = 'FTO3GXP.COM';
          $username = $_POST['modalusername'];
          $password = $_POST['modalpassword'];
          $ldapconfig['host'] = '172.29.114.15';
          $ldapconfig['port'] = 389;
          $ldapconfig['basedn'] = 'DC=FTO3GXP,DC=COM';
        }
        elseif ($plant == 'CTO1' || $plant == 'CTO2' || $plant == 'CTO3')
        {
          $domain = 'CTOBOLGXP.COM';
          $username = $_POST['modalusername'];
          $password = $_POST['modalpassword'];
          $ldapconfig['host'] = '172.29.209.11';
          $ldapconfig['port'] = 389;
          $ldapconfig['basedn'] = 'DC=CTOBOLGXP,DC=COM';
        }
      }

      $ds=ldap_connect($ldapconfig['host'], $ldapconfig['port']);
      ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
      ldap_set_option($ds, LDAP_OPT_REFERRALS, 0);
      $dn=$ldapconfig['basedn'];
      $bind=ldap_bind($ds, $username .'@' .$domain, $password);
      $attr = array("memberof","givenname");
      $isITuser = ldap_search($ds,$dn,"(sAMAccountName=" . $username. ")" ,$attr);
      $data = ldap_get_entries($ds,$isITuser);
       if ($isITuser > 0)
       {
              echo "valid";
        }
        else {
            echo "invalid";
        }
?>
