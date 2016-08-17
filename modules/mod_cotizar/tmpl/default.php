<?php
// No permitir el acceso directo al archivo
defined('_JEXEC') or die;

?>

<script>
	jQuery(function() {
		jQuery.ui.slider.prototype.widgetEventPrefix = 'slider';
		jQuery( "#tabs" ).tabs();
		jQuery( "#slider" ).slider({
		  range: "min",
		  value: 700,
		  min:700,
		  max: 10000,
		  slide: function( event, ui ) {
			jQuery( "#amount" ).val( "$" + ui.value );
		  }
		});
		jQuery( "#amount" ).val( "$" + jQuery( "#slider" ).slider( "value" ) );
	});
</script>

<div id="tabs" class="cotizador">
    <ul>
        <li><a href="#vida">Seguro de Vida</a></li>
        <li><a href="#auto">Seguro de Auto</a></li>
        <li><a href="#medicos">Gastos Medicos M.</a></li>
    </ul>
    <div class="contenido2 cotizar">
    	<div class="top_bar">
        	<div class="imgenn">
            </div>
        </div>
    	<div id="vida">
            <form action="index.php?option=com_users&task=saveForm&format=raw" method="post" enctype="multipart/form-data">
            	<div class="lado_izq">
                    <h3>Datos Personales</h3>
                    <div>
                    	<label for="name">Nombre</label>
                        <input class="delete" type="text" name="name" />
                    </div>
                    <div>
                    	<label for="age">Edad</label>
                        <input class="delete" type="text" name="age" />
                    </div>
                    <div>
                    	<label for="job">Profesión/Ocupación</label>
                        <input class="delete" type="text" name="job" />
                    </div>
                    <div>
                        <select name="state">
                            <option value="">Estado</option>
                            <option value="Aguascalientes">Aguascalientes</option>
                            <option value="Baja California Norte">Baja California Norte</option>
                            <option value="Baja California Sur">Baja California Sur</option>
                            <option value="Campeche">Campeche</option>
                            <option value="Chiapas">Chiapas</option>
                            <option value="Chihuahua">Chihuahua</option>
                            <option value="Coahuila">Coahuila</option>
                            <option value="Colima">Colima</option>
                            <option value="Distrito Federal">Distrito Federal</option>
                            <option value="Durango">Durango</option>
                            <option value="Guanajuato">Guanajuato</option>
                            <option value="Guerrero">Guerrero</option>
                            <option value="Hidalgo">Hidalgo</option>
                            <option value="Jalisco">Jalisco</option>
                            <option value="México">México</option>
                            <option value="Michoacán">Michoacán</option>
                            <option value="Morelos">Morelos</option>
                            <option value="Nayarit">Nayarit</option>
                            <option value="Nuevo León">Nuevo León</option>
                            <option value="Oaxaca">Oaxaca</option>
                            <option value="Puebla">Puebla</option>
                            <option value="Querétaro">Querétaro</option>
                            <option value="Quintana Roo">Quintana Roo</option>
                            <option value="San Luis Potosí">San Luis Potosí</option>
                            <option value="Sinaloa">Sinaloa</option>
                            <option value="Sonora">Sonora</option>
                            <option value="Tabasco">Tabasco</option>
                            <option value="Tamaulipas">Tamaulipas</option>
                            <option value="Tlaxcala">Tlaxcala</option>
                            <option value="Veracruz">Veracruz</option>
                            <option value="Yucatán">Yucatán</option>
                            <option value="Zacatecas">Zacatecas</option>
                        </select>
                    </div>
                    <div>
                    	<label for="city">Ciudad</label>
                        <input class="delete" type="text" name="city" />
                    </div>
                    <div>
                    	<label for="phone">Teléfono</label>
                        <input class="delete" type="text" name="phone" />
                    </div>
                    <div>
                    	<label for="mail">Correo</label>
                        <input class="delete" type="text" name="mail" />
                    </div>
                </div>
            	<div class="lado_der">
                    <div class="rango">
                        <label for="amount">¿Cuánto podría ahorrar mensualmente?</label>
                        <input type="text" id="amount">
                    </div>
                    
                    <div id="slider"></div>
                	<input type="hidden" name="type" value="life"/>
                    <div class="loading"></div>
                    <button id="button">Enviar</button>
                </div>
            </form>
        </div>
        <div id="auto">
            <form action="index.php?option=com_users&task=saveForm&format=raw" method="post" enctype="multipart/form-data">
            	<div class="lado_izq">
                    <h3>Datos Personales</h3>
                    <div>
                    	<label for="name">Nombre</label>
                        <input class="delete" type="text" name="name" />
                    </div>
                    <div>
                    	<label for="age">Edad</label>
                        <input class="delete" type="text" name="age" />
                    </div>
                    <div>
                    	<select name="job">
                        	<option value="">Profesión/Ocupación</option>
                            <option value="Sector Salud">Sector Salud</option>
                            <option value="Sector Militar">Sector Militar</option>
                            <option value="Sector Educación">Sector Educación</option>
                            <option value="Ministro Religioso">Ministro Religioso</option>
                            <option value="Piloto">Piloto</option>
                            <option value="Sobrecargo">Sobrecargo</option>
                            <option value="Empleado CFE/PEMEX">Empleado CFE/PEMEX</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </div>
                    <div>
                    	<label for="code">Código Postal</label>
                        <input class="delete" type="text" name="code" />
                    </div>
                    <div>
                        <select name="state">
                            <option value="">Estado</option>
                            <option value="Aguascalientes">Aguascalientes</option>
                            <option value="Baja California Norte">Baja California Norte</option>
                            <option value="Baja California Sur">Baja California Sur</option>
                            <option value="Campeche">Campeche</option>
                            <option value="Chiapas">Chiapas</option>
                            <option value="Chihuahua">Chihuahua</option>
                            <option value="Coahuila">Coahuila</option>
                            <option value="Colima">Colima</option>
                            <option value="Distrito Federal">Distrito Federal</option>
                            <option value="Durango">Durango</option>
                            <option value="Guanajuato">Guanajuato</option>
                            <option value="Guerrero">Guerrero</option>
                            <option value="Hidalgo">Hidalgo</option>
                            <option value="Jalisco">Jalisco</option>
                            <option value="México">México</option>
                            <option value="Michoacán">Michoacán</option>
                            <option value="Morelos">Morelos</option>
                            <option value="Nayarit">Nayarit</option>
                            <option value="Nuevo León">Nuevo León</option>
                            <option value="Oaxaca">Oaxaca</option>
                            <option value="Puebla">Puebla</option>
                            <option value="Querétaro">Querétaro</option>
                            <option value="Quintana Roo">Quintana Roo</option>
                            <option value="San Luis Potosí">San Luis Potosí</option>
                            <option value="Sinaloa">Sinaloa</option>
                            <option value="Sonora">Sonora</option>
                            <option value="Tabasco">Tabasco</option>
                            <option value="Tamaulipas">Tamaulipas</option>
                            <option value="Tlaxcala">Tlaxcala</option>
                            <option value="Veracruz">Veracruz</option>
                            <option value="Yucatán">Yucatán</option>
                            <option value="Zacatecas">Zacatecas</option>
                        </select>
                    </div>
                    <div>
                    	<label for="city">Ciudad</label>
                        <input class="delete" type="text" name="city" />
                    </div>
                    <div>
                    	<label for="phone">Teléfono</label>
                        <input class="delete" type="text" name="phone" />
                    </div>
                    <div>
                    	<label for="mail">Correo</label>
                        <input class="delete" type="text" name="mail" />
                    </div>
                </div>
            	<div class="lado_der">
                	<h3>Datos del Auto</h3>
                    <div>
                    	<label for="brand">Marca</label>
                        <input class="delete" type="text" name="brand" />
                    </div>
                    <div>
                    	<label for="model">Modelo</label>
                        <input class="delete" type="text" name="model" />
                    </div>
                    <div>
                    	<label for="year">Año</label>
                        <input class="delete" type="text" name="year" />
                    </div>
                	<input type="hidden" name="type" value="car"/>
                    <div class="loading"></div>
                    <button id="button">Enviar</button>
                </div>
            </form>
        </div>
        <div id="medicos">
            <form action="index.php?option=com_users&task=saveForm&format=raw" method="post" enctype="multipart/form-data">
            	<div class="lado_izq">
                    <h3>Datos Personales</h3>
                    <div>
                    	<label for="name">Nombre</label>
                        <input class="delete" type="text" name="name" />
                    </div>
                    <div>
                    	<label for="age">Edad</label>
                        <input class="delete" type="text" name="age" />
                    </div>
                    <div>
                    	<label for="code">Código Postal</label>
                        <input class="delete" type="text" name="code" />
                    </div>
                    <div>
                    	<select name="insured">
                        	<option value="">Suma Asegurada</option>
                            <option value="">$100,000-$500,000</option>
                            <option value="">$500,000-$1,000,000</option>
                            <option value="">$1,000,000-$2,000,000</option>
                            <option value="">$2,000,000-$3,000,000</option>
                            <option value="">$4,000,000-$5,000,000</option>
                            <option value="">$10,000,000-$15,000,000</option>
                            <option value="">$15,000,000-$20,000,000</option>
                            <option value="">$20,000,000-$25,000,000</option>
                            <option value="">$25,000,000-$30,000,000</option>
						</select>
                    </div>
                    <div>
                        <select name="state">
                            <option value="">Estado</option>
                            <option value="Aguascalientes">Aguascalientes</option>
                            <option value="Baja California Norte">Baja California Norte</option>
                            <option value="Baja California Sur">Baja California Sur</option>
                            <option value="Campeche">Campeche</option>
                            <option value="Chiapas">Chiapas</option>
                            <option value="Chihuahua">Chihuahua</option>
                            <option value="Coahuila">Coahuila</option>
                            <option value="Colima">Colima</option>
                            <option value="Distrito Federal">Distrito Federal</option>
                            <option value="Durango">Durango</option>
                            <option value="Guanajuato">Guanajuato</option>
                            <option value="Guerrero">Guerrero</option>
                            <option value="Hidalgo">Hidalgo</option>
                            <option value="Jalisco">Jalisco</option>
                            <option value="México">México</option>
                            <option value="Michoacán">Michoacán</option>
                            <option value="Morelos">Morelos</option>
                            <option value="Nayarit">Nayarit</option>
                            <option value="Nuevo León">Nuevo León</option>
                            <option value="Oaxaca">Oaxaca</option>
                            <option value="Puebla">Puebla</option>
                            <option value="Querétaro">Querétaro</option>
                            <option value="Quintana Roo">Quintana Roo</option>
                            <option value="San Luis Potosí">San Luis Potosí</option>
                            <option value="Sinaloa">Sinaloa</option>
                            <option value="Sonora">Sonora</option>
                            <option value="Tabasco">Tabasco</option>
                            <option value="Tamaulipas">Tamaulipas</option>
                            <option value="Tlaxcala">Tlaxcala</option>
                            <option value="Veracruz">Veracruz</option>
                            <option value="Yucatán">Yucatán</option>
                            <option value="Zacatecas">Zacatecas</option>
                        </select>
                    </div>
                    <div>
                    	<label for="city">Ciudad</label>
                        <input class="delete" type="text" name="city" />
                    </div>
                    <div>
                    	<label for="phone">Teléfono</label>
                        <input class="delete" type="text" name="phone" />
                    </div>
                    <div>
                    	<label for="mail">Correo</label>
                        <input class="delete" type="text" name="mail" />
                    </div>
                </div>
            	<div class="lado_der">
                	<div>
                    	<select name="plan">
                        	<option value="">Tipo de Plan</option>
                            <option value="Sin restricción de Hospitales">Sin restricción de Hospitales</option>
                            <option value="Con restricción de Hospitales">Con restricción de Hospitales</option>                            
                        </select>
                    </div>
                    <div>
                        <select name="cover">
                        	<option value="">Tipo de Cobertura</option>
                        	<option value="Internacional">Internacional</option>
                            <option value="Nacional">Nacional</option>
                        </select>
                    </div>
                	<input type="hidden" name="type" value="medical"/>
                    <div class="loading"></div>
                    <button id="button">Enviar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
	jQuery(document).ready(function(e) {
		function sendmail(form){
			//var form = jQuery("form")
			jQuery(".loading").show();
			jQuery.ajax({
				type: form.attr('method'),
				url: form.attr('action'),
				data: form.serialize()
			}).done(function(html) {
				console.log(html);
				data=JSON.parse(html);
				//console.log();
				jQuery.facebox({html: data.msg});
				jQuery(".loading").hide();
				jQuery(".delete").val('')				
			});
		};
		jQuery(document).ready(function(e) {
			jQuery('form').on('submit',function(e){
				e.preventDefault();
				sendmail(jQuery(this));
			});
		});
	});
</script>