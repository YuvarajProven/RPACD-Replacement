<?php
//============================================================+
// File name   : example_006.php
// Begin       : 2008-03-04
// Last Update : 2013-05-14
//
// Description : Example 006 for TCPDF class
//               WriteHTML and RTL support
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: WriteHTML and RTL support
 * @author Nicola Asuni
 * @since 2008-03-04
 */

// Include the main TCPDF library (search for installation path).
require_once('tcpdf_include.php');

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// // set document information
// $pdf->SetCreator(PDF_CREATOR);
// $pdf->SetAuthor('Nicola Asuni');
// $pdf->SetTitle('TCPDF Example 006');
// $pdf->SetSubject('TCPDF Tutorial');
// $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
//
// // set default header data
// $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 006', PDF_HEADER_STRING);
//
// // set header and footer fonts
// $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
// $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
// $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
// $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
// $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
	require_once(dirname(__FILE__).'/lang/eng.php');
	$pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->SetFont('dejavusans', '', 10);

// add a page
$pdf->AddPage();

// writeHTML($html, $ln=true, $fill=false, $reseth=false, $cell=false, $align='')
// writeHTMLCell($w, $h, $x, $y, $html='', $border=0, $ln=0, $fill=0, $reseth=true, $align='', $autopadding=true)

// create some HTML content
$html = "<table style='border:1px solid black'><tbody><tr><td>Sample Set Name: 890001020779_AS</td><td>LIMS Batch Number: null</td></tr></tbody></table><br><br><tbody'></tbody'><table border='1' class='table1 table' style='width: 446.46px'><tbody><tr><td width='40'>#</td><td width='200'>Check Point Desc</td><td>Result</td><td>QA Comments</td><td width='100'>Reviewed By</td><td>Reviewed Date</td></tr><tr><td width='40'>1</td><td width='200' style='white-space:normal;'>All sequence versions are signe<br>d off</td><td>Fail</td><td>-</td><td width='100'>P70002288</td><td>2019-03-29 10:39:11.000</td></tr><tr><td width='40'>2</td><td width='200' style='white-space:normal;'>There are no unprocessed and re<br>processed results</td><td>Fail</td><td>-</td><td width='100'>P70002288</td><td>2019-03-28 19:43:22.000</td></tr><tr><td width='40'>3</td><td width='200' style='white-space:normal;'>All injections are acquired wit<br>hin the validity period</td><td>Pass</td><td>-</td><td width='100'>P70002288</td><td>2019-01-11 13:08:49.723</td></tr><tr><td width='40'>4</td><td width='200' style='white-space:normal;'>There are no major breaks in th<br>e acquisition times</td><td>Pass</td><td>-</td><td width='100'>P70002288</td><td>2019-03-28 19:46:56.000</td></tr><tr><td width='40'>5</td><td width='200' style='white-space:normal;'>All acquired chromatograms patt<br>ern must match with specimen chromatograms</td><td>Pass</td><td>-</td><td width='100'>P70002288</td><td>2019-03-30 19:06:46.000</td></tr><tr><td width='40'>6</td><td width='200' style='white-space:normal;'>Are there any incidents availab<br>le</td><td>Fail</td><td>-</td><td width='100'>P70002288</td><td>2019-03-28 19:45:05.000</td></tr><tr><td width='40'>7</td><td width='200' style='white-space:normal;'>All samples and standards in th<br>e sample set are processed with the same processing method</td><td>Fail</td><td>-</td><td width='100'>P70002288</td><td>2019-02-18 07:51:33.000</td></tr></tbody></table>";




//output the HTML content
$pdf->writeHTML($html, true, false, true, false, '');



//Close and output PDF document
$pdf->Output(__DIR__.'../../../sample_.pdf', 'F');

//============================================================+
// END OF FILE
//============================================================+
