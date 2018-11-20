/**
 * Ce plugins google translate a été réalisé par tor skint
 * email :  da.aristo.y@gmail.com
 * Whatsapp: +229 67072547
 * Nous sommes disponible pour tous vos proets de création de sites internet,
 * Application android ou ios
 * Correction de bugs et refonte de site web
 * etc....
 * SATISFAIT ou REMBOURSE
 */

/**
 * HTML CODES
 *
 *		<div id="tStartup_translator"></div>
*  		<div id="customTranslate" data-locale="fr">
*    			<a class="notranslate" data-lang="de">Allemand</a>
*       		<a class="notranslate" data-lang="en">Anglais</a>
*         		<a class="notranslate" data-lang="es">Espagnol</a>
*           	<a class="notranslate" data-lang="fr">Français</a>
*            	<a class="notranslate" data-lang="it">Italien</a>
*       </div>
 */

const googObj = {};

googObj.translator = {
	langCode: {
		'de': 'Allemand',
		'en': 'Anglais',
		'es': 'Espagnol',
		'fr': 'Français',
		'it': 'Italien'
	},

	configs: {
		"currentL": "fr",
		"cookieName": "googtrans"
	},
	
	initDropdown: function() {
		const as = document.querySelectorAll('#customTranslate a')
		for( let y=0; y < as.length; y++){
			as[y].addEventListener("click", function(){
				const lang = this.getAttribute("data-lang");
				const frame = document.querySelector('iframe.goog-te-menu-frame');
				if (!frame) {
					return false;
				}
				const allmenu = frame.contentWindow.document.querySelectorAll(".goog-te-menu2-item");
				if( ! allmenu){
					return;
				}
				for( let t=0; t < allmenu.length; t++){
					const current = allmenu[t];
					const cValue = allmenu[t].value.toLowerCase()
					if (cValue == lang) {
						if (lang == googObj.translator.configs.currentL) {
							googObj.translator.showOriginalText();
							return false;
						}
						current.click();
						return false;
					}
				}
			})
		}
		return false;
	},
	
	showOriginalText: function() {
		const googBars = document.querySelector('iframe.goog-te-banner-frame');
		const googBar = googBars.contentWindow.document.querySelectorAll('.goog-te-button button');
		const ct = document.getElementById('customTranslate');
		const getCT = ct.getAttribute("data-locale");
		for( let o=0; o < googBar.length; o++){
			if ( googBar[o].textContent == "Afficher l'original" ) {
				googBar[o].click();
				if ( getCT != googObj.translator.configs.currentL) {
					ct.setAttribute("data-locale", googObj.translator.configs.currentL);
				}
				return false;
			}
		}
	},
	
	/**
	 * FACULTATIVE
	 */
	setLangDropdown: function() {
		const cookieVal = this.getCookieValue();
		const ct = document.getElementById("customTranslate")
		if (cookieVal) {
			ct.setAttribute("data-locale", cookieVal );
		}
	},
	
	/**
	 * FACULTATIVE
	 */
	getCookieValue: function() {
		let transCookie = this.getCookie();
		if ( transCookie ) {
			transCookie = transCookie.split('/');
			transCookie = transCookie[2];
			return transCookie;
		}
		return false;
	},
	
	init: function() {
		const ct = document.getElementById('customTranslate');
		if (ct) {
			// ct.style.display = ''block";
			this.initDropdown();
			/**
			 * FACULTATIVE
			 */
			this.setLangDropdown();
		}
	},

	/**
	 * FACULTATIVE
	 */
	getCookie: function () {
	    let name = this.configs.cookieName + "=";
	    let decodedCookie = decodeURIComponent(document.cookie);
	    let ca = decodedCookie.split(';');
	    for(let i = 0; i <ca.length; i++) {
	        let c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return null;
	}
}

function googleTranslateElementInit () {
   	new google.translate.TranslateElement(
   		{
   			pageLanguage: 'fr',
   			includedLanguages: 'de,en,es,fr,it',
   			layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
   			autoDisplay: false
   		},
   		'tStartup_translator'
   	);
   	googObj.translator.init();
}
