<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_users
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JHtml::_('behavior.keepalive');
JHtml::_('behavior.formvalidation');
?>
<div style="background:#CCC; overflow:hidden;">
    <table border="0" style="border-collapse:collapse; background:#fff; margin: 1em auto;">
        <tr style="width:100%;background:#232f3c;">
            <td style="width:25%"><img src="http://www.yirehbrokers.com/images/logo_web.png" height="70" style="margin:auto" /></td>
            <td style="text-align:center"><h1 style="color:#fff;">Solicitud de cotización</h1></td>
        </tr>
        <tr>
            <td colspan="2" style="text-align:center"><h3>Se ha solicitado una cotización con los siguientes datos:</h3></td>
        </tr>
        <tr>
            <td colspan="2">
                <table style="margin:auto">
                     <?php foreach($this->data as $key=>$value): ?>
                    <tr>
                        <td style="font-weight:bold;text-align:left; padding:0 1em;"><?php echo JText::_('COM_USERS_EMAIL_KEY_'.strtoupper($key)).": "?></td>
                        <td style="text-align:left;"><?php echo $value; ?> </td>
                    </tr>
                    <?php endforeach; ?>
                </table>
            </td>
        </tr>
       
        <tr>
            <td colspan="2" style="text-align:center;"><h5>Copyright 2015</h4></td>
        </tr>
    </table>
</div>