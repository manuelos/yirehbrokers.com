<?php
// No permitir el acceso directo al archivo
defined('_JEXEC') or die;

// Utilizado para la ruta a los art�culos
require_once JPATH_SITE.'/components/com_content/helpers/route.php';

// Clase helper que se utiliza para hacer el trabajo real en la recuperaci�n de la informaci�n
abstract class modAboutusYoubuyHelper
{

	// M�todo que implementa la captura de la informaci�n necesaria a ser mostrada
	public static function aboutus($params)
	{
		$db  = JFactory::getDbo();
	  	$catids = $params->get('catid', array());
		/*
		ARRAY(
		 [0] = 1,
		 [1] = 2,
		 [2] = 3
		)
		*/
		foreach($catids as $key=>$catid){
			// Filtrar el contenido del autor 
		 	$query = 'SELECT * FROM #__categories c WHERE c.id='.$catid;
		  	$db->setQuery($query);
		  	$temp = $db->loadObjectList();
			print_r($temp);
		}
	   	
	  
	  
	  
			
	  	return $related;
	}
}
?>