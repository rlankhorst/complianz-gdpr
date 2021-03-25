<?php
defined( 'ABSPATH' ) or die( "you do not have acces to this page!" );

add_filter( 'cmplz_known_script_tags', 'cmplz_disqus_cl_script' );
function cmplz_disqus_cl_script( $tags ) {

	$tags[] = 'embed-count-scroll.min.js';
	$tags[] = 'disqus-additional-load';
	$tags[] = 'disquscdn.com';
	$tags[] = 'disqus.com';


	return $tags;
}
