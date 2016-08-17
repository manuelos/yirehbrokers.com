<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_users
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Rest model class for Users.
 *
 * @package     Joomla.Site
 * @subpackage  com_users
 * @since       1.5
 */
class UsersModelMail extends JModelForm
{
	/**
	 * Method to get the password reset request form.
	 *
	 * @param   array      $data        Data for the form.
	 * @param   boolean    $loadData    True if the form is to load its own data (default case), false if not.
	 * @return  JForm    A JForm object on success, false on failure
	 * @since   1.6
	 */
	public function getForm($data = array(), $loadData = true)
	{
		// Get the form.
		$form = $this->loadForm('com_users.reset_request', 'reset_request', array('control' => 'jform', 'load_data' => $loadData));

		if (empty($form))
		{
			return false;
		}

		return $form;
	}
	
	public function sendmail(){
		$input                                = JFactory::getApplication()->input;
        $type	                              = $input->post->get('type','','STRING');
		$name	                              = $input->post->get('name','','STRING');
		$age	                              = $input->post->get('age','','STRING');
		$job	                              = $input->post->get('job','','STRING');
		$code	                              = $input->post->get('code','','STRING');
		$phone   	                          = $input->post->get('phone','','STRING');
		$mail                                 = $input->post->get('mail','','STRING');
		$state                                = $input->post->get('state','','STRING');
		$city	                              = $input->post->get('city','','STRING');
		$return                               =array();
		$data2								 = array();
		//Secho "type".$type;
		$return['success'] = 0;
		$return['msg'] = '';
		$emailBody 							  = "";
		
		if($type == 'life'){
			$amount                                = $input->post->get('amount','','STRING');
			$emailBody 							   = "";
			$data2 = array(
				'name' =>$name,
				'age' =>$age,
				'job' =>$job,
				'phone' =>$phone,
				'mail' =>$mail,
				'state' =>$state,
				'city' =>$city,
				'amount' =>$amount,
			);
		}
		elseif($type == 'car'){
			$brand                                = $input->post->get('brand','','STRING');
			$model                                = $input->post->get('model','','STRING');
			$year                                 = $input->post->get('year','','STRING');
			$emailBody 							  = "";
			$data2 = array(
				'name' =>$name,
				'age' =>$age,
				'job' =>$job,
				'code' =>$code,
				'phone' =>$phone,
				'mail' =>$mail,
				'state' =>$state,
				'city' =>$city,
				'brand' =>$brand,
				'model' =>$model,
				'year' =>$year,
			);
		}
		elseif($type == 'medical'){
			$insured                              = $input->post->get('insured','','STRING');
			$plan                                 = $input->post->get('plan','','STRING');
			$cover                                = $input->post->get('cover','','STRING');
			$emailBody 							  = "";
			$data2 = array(
				'name' =>$name,
				'age' =>$age,
				'code' =>$code,
				'phone' =>$phone,
				'mail' =>$mail,
				'insured' =>$insured,
				'state' =>$state,
				'city' =>$city,
				'plan' =>$plan,
				'cover' =>$cover,
			);
		}
		
		$config = JFactory::getConfig();
		$data['fromname'] = $config->get('fromname');
		$data['mailfrom'] = $config->get('mailfrom');
		$data['sitename'] = $config->get('sitename');
		$data['siteurl'] = JUri::base();
		$emailSubject = "Solicitud de Cotización para ".JText::_('COM_USERS_EMAIL_TYPE_'.strtoupper($type));
		
		if(!class_exists('UsersViewEmails')) require(JPATH_SITE . '/components'. '/com_users' . '/views' . '/emails'. '/view.html.php');
		$view = new UsersViewEmails();
		//$layout = 'mail_html';
		//$view -> setLayout($layout);
		
		$view->data =$data2;
		//7$view->assignRef('remind_username',$data['username']);
		//$view->assignRef('remind_url',$data['link_html']);
		
		ob_start();
		$view->display();
		$emailBody = ob_get_contents();
		ob_end_clean();

		//$emailBody = "<span>asas</span>";
		$return_email = JFactory::getMailer()->sendMail($data['mailfrom'], $data['fromname'], 'yireh.brokers@yahoo.com.mx'/*$data['email']*/, $emailSubject, $emailBody,true);
		if($return_email){
			$return['success'] = 1;
			$return['msg'] = 'El mensaje fue enviado';
			
			$return_email = JFactory::getMailer()->sendMail($data['mailfrom'], $data['fromname'], 'mosuna@grupocaceres.mx'/*$data['email']*/, $emailSubject, $emailBody,true);
		}
		else{
			$return['success'] = 0;
			$return['msg'] = 'El mensaje no fue enviado.';
		}
		
		return $return;
		
	}
}
