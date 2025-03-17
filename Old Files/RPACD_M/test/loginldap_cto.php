<?php
// if(isset($_POST['username']) && isset($_POST['password'])){

    $adServer = "ldap://INCTBOLGXP.CTOBOLGXP.COM";
    $ldap = ldap_connect($adServer);

    $domain = 'CTOBOLGXP.COM';
    $username = "p00004485";
    $password = "Lims@1234";
    $ldapconfig['host'] = '172.29.209.11';
    $ldapconfig['port'] = 389;
    $ldapconfig['basedn'] = 'DC=CTOBOLGXP,DC=COM';
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
      $entries = ldap_get_entries($ldap, $result);
      $dirty = 0;
      foreach($entries[0]['distinguishedname'] as $member) {
        if($dirty == 0) {
          $dirty = 1;
        } else {
          $member_dets = explode_dn($member);
          $members[] = $member_dets;
        }
      }

        $filter="(sAMAccountName=$username)";
        $result = ldap_search($ldap,"dc=FTO3GXP,dc=COM",$filter);
        ldap_sort($ldap,$result,"sn");
        $info = ldap_get_entries($ldap, $result);
          $msg = NULL;

        for ($i=0; $i<$info["count"]; $i++)

        {
            if($info['count'] > 1)
            {
            }
              $msg = "valid";
            $userDn = $info[$i]["distinguishedname"][0];
        }

        print_r($info);
    }

    function explode_dn($dn,$with_attributes=0) {
    	$result = ldap_explode_dn($dn, $with_attributes);
    	//translate hex code into ascii again
    	// foreach($result as $key => $value) $result[$key] = preg_replace("/\\\([0-9A-Fa-f]{2})/e", "''.chr(hexdec('\\1')).''", $value);
    	return $result;
    }

// }
?>
