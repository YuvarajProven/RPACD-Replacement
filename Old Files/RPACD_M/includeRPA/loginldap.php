<?php
function explode_dn($dn,$with_attributes=0) {
	$result = ldap_explode_dn($dn, $with_attributes);
	//translate hex code into ascii again
	// foreach($result as $key => $value) $result[$key] = preg_replace("/\\\([0-9A-Fa-f]{2})/e", "''.chr(hexdec('\\1')).''", $value);
	return $result;
}
if(isset($_POST['username']) && isset($_POST['password'])){
    $adServer = "ldap://NEWADC03.CORP.DRREDDYS.COM";
    $ldap = ldap_connect($adServer);
    $domain = 'CORP.DRREDDYS.COM';
    $username = $_POST['username'];
    $password = $_POST['password'];
    $ldapconfig['host'] = '152.63.1.204';
    $ldapconfig['port'] = 389;
    $ldapconfig['basedn'] = 'DC=CORP,DC=DRREDDYS,DC=COM';

    $ldap=ldap_connect($ldapconfig['host'], $ldapconfig['port']);

    ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);
    $dn=$ldapconfig['basedn'];
    $bind=@ldap_bind($ldap, $username .'@' .$domain, $password);
    $attr = array("memberof","givenname");

    if ($bind) {
        $filter="(sAMAccountName=$username)";
        $result = ldap_search($ldap,"DC=CORP,DC=DRREDDYS,DC=COM",$filter);
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
      	// echo str_replace("OU=","",$members[0][3]);
				print_r( $members);

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
