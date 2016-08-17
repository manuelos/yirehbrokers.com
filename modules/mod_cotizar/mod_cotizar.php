<?php 
// No permitir el acceso directo al archivo
defined('_JEXEC') or die;

// Incluye las funciones sólo una vez
require_once dirname(__FILE__).'/helper.php';


//$list = modAboutusYoubuyHelper::aboutus ($params);

/*if (!count($list)) {
 return;
}*/

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
$showDate = $params->get('showDate', 0);

// Incluir la plantilla que mostrará los datos recogidos
require JModuleHelper::getLayoutPath('mod_cotizar', $params->get('layout', 'default'));
?>